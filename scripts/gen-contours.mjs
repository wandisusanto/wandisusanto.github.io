// Generates public/contours.svg: fine topographic flow lines used as a CSS mask in the hero.
// Black stroke with per-line opacity only (mask alpha) — the color comes from CSS. Run: node scripts/gen-contours.mjs
import { writeFileSync } from "node:fs";

const W = 1600, H = 900, LINES = 46, STEPS = 48;

// Two soft "hills" the lines bend around, plus long gentle swells
const hill = (x, y, cx, cy, r, h) => h * Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (2 * r * r));
const offset = (x, y, i) =>
  28 * Math.sin(x / 260 + i * 0.09) +
  12 * Math.sin(x / 120 - i * 0.05) -
  hill(x, y, 1200, 300, 230, 170) +
  hill(x, y, 340, 640, 280, 140);

const paths = [];
for (let i = 0; i < LINES; i++) {
  const base = -40 + (i / (LINES - 1)) * (H + 80);
  const pts = Array.from({ length: STEPS + 1 }, (_, s) => {
    const x = (s / STEPS) * W;
    return `${x | 0} ${(base + offset(x, base, i)) | 0}`;
  });
  // Every 5th line is a slightly stronger "index contour", like a survey map
  const o = (i % 5 === 0 ? 0.9 : 0.5).toFixed(2);
  paths.push(`<path d="M${pts.join("L")}" stroke-opacity="${o}"/>`);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<g fill="none" stroke="#000" stroke-width="0.9" stroke-linejoin="round">${paths.join("")}</g>
</svg>
`;
writeFileSync(new URL("../public/contours.svg", import.meta.url), svg);
console.log(`contours.svg: ${(svg.length / 1024).toFixed(1)} KB`);
