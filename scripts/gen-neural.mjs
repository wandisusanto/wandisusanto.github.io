// Generates public/neural.svg: a wavy neural-network mesh used as a CSS mask in the hero.
// Black with varying opacity only (mask alpha) — the color comes from CSS. Run: node scripts/gen-neural.mjs
import { writeFileSync } from "node:fs";

const W = 1600, H = 900, COLS = 46, ROWS = 18;
let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

// Terrain on a perspective plane: x across, z into the screen, y = rolling waves
const height = (x, z) => 0.45 * Math.sin(x * 1.6 + z * 0.7) + 0.25 * Math.sin(x * 3.1 - z * 1.2) + 0.15 * Math.cos(z * 2.3);
const project = (x, y, z) => [W / 2 + (x / z) * 900, H * 0.42 + ((1.1 - y) / z) * 560];

const nodes = [];
for (let r = 0; r < ROWS; r++) {
  const z = 2.2 + r * 0.24;
  for (let c = 0; c < COLS; c++) {
    const x = (c / (COLS - 1) - 0.5) * 2.2 * z + (rand() - 0.5) * 0.15;
    const zz = z + (rand() - 0.5) * 0.15;
    const [sx, sy] = project(x, height(x, zz), zz);
    nodes.push({ sx, sy, depth: r / (ROWS - 1) });
  }
}

// Bucket by depth so each bucket is one <path>/<g> with a shared opacity (keeps the file small)
const BUCKETS = [0.9, 0.65, 0.45, 0.3];
const bucket = (d) => Math.min(BUCKETS.length - 1, Math.floor(d * BUCKETS.length));
const lines = BUCKETS.map(() => []), dots = BUCKETS.map(() => []);
const at = (r, c) => nodes[r * COLS + c];
const seg = (a, b) => `M${a.sx | 0} ${a.sy | 0}L${b.sx | 0} ${b.sy | 0}`;

for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const n = at(r, c), b = bucket(n.depth);
    if (c + 1 < COLS) lines[b].push(seg(n, at(r, c + 1)));
    if (r + 1 < ROWS) lines[b].push(seg(n, at(r + 1, c)));
    if (r + 1 < ROWS && c + 1 < COLS && rand() < 0.5) lines[b].push(seg(n, at(r + 1, c + 1)));
    if (r + 1 < ROWS && c > 0 && rand() < 0.3) lines[b].push(seg(n, at(r + 1, c - 1)));
    dots[b].push(`<circle cx="${n.sx | 0}" cy="${n.sy | 0}" r="${(1 + rand() * 2.2 * (1 - n.depth * 0.6)).toFixed(1)}"/>`);
  }

// Soft out-of-focus "bokeh" particles scattered above and around the mesh
const bokeh = Array.from({ length: 45 }, () =>
  `<circle cx="${(rand() * W) | 0}" cy="${(rand() * H) | 0}" r="${(4 + rand() * 14) | 0}" opacity="${(0.15 + rand() * 0.35).toFixed(2)}"/>`,
).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<defs><radialGradient id="b"><stop offset="0" stop-opacity="1"/><stop offset="1" stop-opacity="0"/></radialGradient></defs>
${BUCKETS.map((o, i) => `<path d="${lines[i].join("")}" stroke="#000" stroke-width="0.8" stroke-opacity="${o * 0.55}" fill="none"/><g opacity="${o}">${dots[i].join("")}</g>`).join("\n")}
<g fill="url(#b)">${bokeh}</g>
</svg>
`;
writeFileSync(new URL("../public/neural.svg", import.meta.url), svg);
console.log(`neural.svg: ${(svg.length / 1024).toFixed(1)} KB`);
