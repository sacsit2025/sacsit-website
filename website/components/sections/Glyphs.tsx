/**
 * The five ring glyphs of the drawing legend - copied from GLYPHS in the page kit's build-page.py:
 * the same viewBox, the same paths, the same classes (.hi .lo .dot), in the same order. They cycle
 * when a legend is longer than five, exactly as the kit does.
 */
const GLYPHS = [
  <>
    <ellipse cx="20" cy="22" rx="18" ry="9" className="hi" />
    <ellipse cx="20" cy="22" rx="10" ry="5" className="lo" />
  </>,
  <>
    <ellipse cx="20" cy="22" rx="18" ry="9" className="lo" />
    <ellipse cx="20" cy="22" rx="10" ry="5" className="hi" />
  </>,
  <>
    <path d="M6 30 L20 12 M12 32 L22 18" className="hi" />
    <circle cx="20" cy="12" r="3" className="dot" />
  </>,
  <>
    <rect x="7" y="10" width="10" height="20" className="hi" />
    <rect x="23" y="10" width="10" height="20" className="lo" />
  </>,
  <>
    <path d="M14 8h12M14 12h12M14 16h12M14 20h12M14 24h12M14 28h12M14 32h12" className="hi" />
  </>,
];

export const GLYPH_COUNT = GLYPHS.length;

export function Glyph({ index }: { index: number }) {
  return (
    <svg className="g" viewBox="0 0 40 40" aria-hidden="true">
      {GLYPHS[index % GLYPHS.length]}
    </svg>
  );
}

export default Glyph;
