/**
 * Clipboard writing with a fallback.
 *
 * `navigator.clipboard` is the modern path but it needs a secure context and a
 * focused document, and it hard-fails inside some embedded webviews. The
 * textarea + `execCommand` path is deprecated yet still the only thing that
 * works there, so it stays as the second attempt rather than the primary one.
 *
 * Returns true when the text actually made it onto the clipboard — callers use
 * that to decide between "Copied" and "Select it manually" so nobody is told a
 * lie about their own clipboard.
 */
export async function copyText(text) {
  const value = String(text ?? "");
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = value;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, value.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export default copyText;
