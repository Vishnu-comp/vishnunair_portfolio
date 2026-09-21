/**
 * Guards for the "Ask AI about me" prompt builder and its UI.
 *
 * The prompt is the part of this feature that rots silently: it is generated
 * from src/data/site.js, it has to stay short enough to survive a URL, and it
 * has to stay plain text. Those are all properties nobody notices when they
 * break, so they are asserted here instead.
 */

import React from "react";

// CRA's Jest resolver can't read the `exports` map of @vercel/analytics/react,
// and a test run shouldn't depend on a traffic SDK anyway.
jest.mock("../utils/analytics", () => ({
  safeTrack: jest.fn(),
  ASK_AI_EVENTS: { open: "ask_ai_open", copy: "ask_ai_copy", preview: "ask_ai_preview" },
}));
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AskAI from "./AskAI";
import {
  AI_PROVIDERS,
  DEFAULT_QUESTION,
  DEFAULT_TONE,
  PROMPT_CHAR_LIMIT,
  PROMPT_CHAR_TIGHT,
  PROMPT_LEVELS,
  PROMPT_TONES,
  buildPrompt,
  factSheet,
  parseShareParams,
  shareLink,
} from "../data/aiContext";
import { resumeRoles } from "../data/site";

describe("Ask AI prompt builder", () => {
  it("keeps every tone and lens inside a URL-safe budget", () => {
    PROMPT_TONES.forEach(({ id: tone }) => {
      resumeRoles.forEach(({ id: role }) => {
        const prompt = buildPrompt({ level: "brief", role, tone });
        expect(prompt).toContain("FACT SHEET");
        expect(prompt.length).toBeLessThanOrEqual(PROMPT_CHAR_LIMIT);
      });
    });
    // Every default the section can boot into sits in the green tier, so nobody
    // is greeted by a warning about their own starting settings.
    PROMPT_TONES.forEach(({ id: tone }) => {
      resumeRoles.forEach(({ id: role }) => {
        expect(
          buildPrompt({ level: "brief", role, tone }).length
        ).toBeLessThanOrEqual(PROMPT_CHAR_TIGHT);
      });
    });
  });

  it("sends only facts, and never the phone number", () => {
    const prompt = buildPrompt({ level: "brief", role: "fullstack" });
    expect(prompt).toContain("Shoffr");
    expect(prompt).toContain("MY QUESTION: " + DEFAULT_QUESTION);
    // Deliberate: a prompt pasted into a third-party chat is not where a
    // personal mobile belongs. Email and public links are enough.
    expect(prompt).not.toMatch(/\+?91[\d\s-]{8,}/);
    expect(prompt).not.toContain("99674");
  });

  it("is plain ASCII so no client mangles the query string", () => {
    PROMPT_LEVELS.forEach(({ id }) => {
      const prompt = buildPrompt({ level: id, role: "backend", tone: "critical" });
      // eslint-disable-next-line no-control-regex
      expect(prompt).toMatch(/^[\x20-\x7E\n]+$/);
    });
  });

  it("drops the duplicated project list when the full lens is on", () => {
    const full = factSheet({ level: "full", role: "frontend" });
    expect(full).toContain("LIVE:");
    expect(full).not.toContain("PROJECTS:");
    expect(full).toContain("llms.txt");
  });

  it("warns as the link grows, in the order a visitor would hit it", () => {
    // short facts -> green; full facts -> amber; a pasted job spec -> red.
    expect(buildPrompt({ level: "brief", role: "fullstack" }).length)
      .toBeLessThanOrEqual(PROMPT_CHAR_TIGHT);
    expect(buildPrompt({ level: "full", role: "fullstack" }).length)
      .toBeGreaterThan(PROMPT_CHAR_TIGHT);
    expect(buildPrompt({ level: "link", role: "fullstack" }).length).toBeLessThan(1200);
    expect(
      buildPrompt({ level: "brief", role: "fullstack", question: "x".repeat(2600) }).length
    ).toBeGreaterThan(PROMPT_CHAR_LIMIT);
  });

  it("builds a link for each assistant, and only Gemini needs the clipboard", () => {
    const prompt = buildPrompt({ level: "brief", role: "fullstack" });
    const byId = Object.fromEntries(AI_PROVIDERS.map((p) => [p.id, p]));

    expect(byId.chatgpt.href(prompt)).toBe(`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`);
    expect(byId.claude.href(prompt)).toContain("https://claude.ai/new?q=");
    expect(byId.perplexity.href(prompt)).toContain("https://www.perplexity.ai/search?q=");
    expect(byId.gemini.pastes).toBe(true);
    expect(byId.gemini.href(prompt)).toBe("https://gemini.google.com/app");
    expect(byId.chatgpt.pastes).toBeUndefined();
  });

  it("round-trips its own shareable link", () => {
    const link = shareLink({
      provider: "claude",
      question: "Is he ready for our team?",
      level: "link",
      role: "backend",
      tone: "critical",
    });
    expect(link).toContain("tone=critical");
    const parsed = parseShareParams(link.slice(link.indexOf("?") + 1).replace(/#.*$/, ""));
    expect(parsed).toEqual({
      question: "Is he ready for our team?",
      provider: "claude",
      level: "link",
      role: "backend",
      tone: "critical",
    });
  });

  it("omits the default tone so ordinary links stay short", () => {
    const link = shareLink({ provider: "chatgpt", question: "x", level: "brief", role: "fullstack", tone: DEFAULT_TONE });
    expect(link).not.toContain("tone=");
    expect(link).not.toContain("detail=");
    expect(link).not.toContain("role=");
  });

  it("ignores junk in the URL instead of rendering an unknown state", () => {
    expect(
      parseShareParams("?ask=hallucination-machine&role=vp&detail=nope&tone=spam&q=")
    ).toEqual({
      question: null,
      provider: null,
      level: null,
      role: null,
      tone: null,
    });
  });
});

describe("Ask AI section", () => {
  beforeAll(() => {
    // framer-motion's whileInView needs this in jsdom.
    if (!window.IntersectionObserver) {
      window.IntersectionObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
      };
    }
  });

  const renderSection = () =>
    render(
      <MemoryRouter initialEntries={["/?ask=chatgpt&q=What%20should%20I%20ask%20him%3F"]}>
        <AskAI />
      </MemoryRouter>
    );

  it("carries the typed question into the assistant link", () => {
    renderSection();
    const link = screen.getByRole("link", { name: /ChatGPT/i });
    const sent = decodeURIComponent(link.getAttribute("href").split("?q=")[1]);
    expect(sent).toContain("What should I ask him?");
    expect(sent).toContain("never invent employers");
    // Sanity: the link is a plain https URL with the prompt encoded, nothing else.
    expect(link.getAttribute("href").startsWith("https://chatgpt.com/?q=")).toBe(true);
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    expect(link.getAttribute("target")).toBe("_blank");
  });

  it("lets a visitor edit the question and see the exact prompt", () => {
    renderSection();
    fireEvent.change(screen.getByLabelText(/1 · What do you want to know\?/i), {
      target: { value: "Does his Spring Boot work cover async messaging?" },
    });
    fireEvent.click(screen.getByRole("button", { name: /read exactly what gets sent/i }));
    // The preview renders verbatim, and it contains the edited question.
    expect(screen.getByText(/FACT SHEET/m).textContent).toContain(
      "Does his Spring Boot work cover async messaging?"
    );

    // ...and Reset gives the stock question back (it is a sibling of the
    // <label>, so clicking it must not also focus the textarea).
    fireEvent.click(screen.getByRole("button", { name: /^reset$/i }));
    expect(screen.getByLabelText(/What do you want to know/i).value).toBe(DEFAULT_QUESTION);
  });

  it("seeds the tone from the URL and re-builds the link when it changes", () => {
    render(
      <MemoryRouter initialEntries={["/?tone=critical#ask-ai"]}>
        <AskAI />
      </MemoryRouter>
    );
    const group = screen.getByRole("radiogroup", { name: /tone of the answer/i });
    const checked = Array.from(group.querySelectorAll('[aria-checked="true"]'));
    expect(checked).toHaveLength(1);
    expect(checked[0].textContent).toBe("Critical");
    // The choice that changes the *answer* is explained next to the control,
    // not hidden in a title attribute.
    expect(group.parentElement.textContent).toMatch(/hold nothing back/);

    const sentIn = () =>
      decodeURIComponent(
        screen.getByRole("link", { name: /ChatGPT/i }).getAttribute("href").split("?q=")[1]
      );
    expect(sentIn()).toMatch(/way a tough interviewer/i);

    fireEvent.click(screen.getByRole("radio", { name: /^Balanced$/i }));
    expect(sentIn()).toMatch(/Honest assessment beats flattery/i);
    expect(sentIn()).not.toMatch(/way a tough interviewer/i);
    // The guardrails are not tone-dependent, so they survive the switch.
    expect(sentIn()).toMatch(/never invent employers/i);
  });

  it("tells Gemini users the prompt is copied rather than sent", () => {
    renderSection();
    expect(screen.getByText(/no URL prefill/i).textContent).toMatch(/copied for you to paste/);
  });
});
