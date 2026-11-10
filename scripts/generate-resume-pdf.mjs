import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "docs", "resume.md");
const outDir = path.join(root, "public", "resume");
const outFile = path.join(outDir, "Sulley-Sadick-Resume.pdf");

const md = fs.readFileSync(source, "utf8");
const plain = md
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/^#+\s/gm, "")
  .replace(/\*\*/g, "")
  .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
  .replace(/\r\n/g, "\n")
  .trim();

function escapePdfText(line) {
  return line
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrapLines(text, maxLen = 92) {
  const lines = [];
  for (const paragraph of text.split("\n")) {
    if (!paragraph.trim()) {
      lines.push("");
      continue;
    }
    let rest = paragraph;
    while (rest.length > maxLen) {
      let breakAt = rest.lastIndexOf(" ", maxLen);
      if (breakAt < 40) breakAt = maxLen;
      lines.push(rest.slice(0, breakAt).trim());
      rest = rest.slice(breakAt).trim();
    }
    if (rest) lines.push(rest);
  }
  return lines;
}

const lines = wrapLines(plain);
const fontSize = 9;
const lineHeight = 11;
const startY = 760;
const startX = 48;

const contentLines = [
  "BT",
  `/F1 ${fontSize} Tf`,
  ...lines.flatMap((line, index) => {
    const y = startY - index * lineHeight;
    if (y < 48) return [];
    const ops = [];
    if (index === 0) ops.push(`${startX} ${y} Td`);
    else ops.push(`0 -${lineHeight} Td`);
    ops.push(`(${escapePdfText(line)}) Tj`);
    return ops;
  }),
  "ET",
];

const stream = contentLines.join("\n");
const streamLength = Buffer.byteLength(stream, "utf8");

const objects = [
  "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
  "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
  `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n`,
  `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${stream}\nendstream\nendobj\n`,
  "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
];

let pdf = "%PDF-1.4\n";
const offsets = [0];

for (const obj of objects) {
  offsets.push(Buffer.byteLength(pdf, "utf8"));
  pdf += obj;
}

const xrefStart = Buffer.byteLength(pdf, "utf8");
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
for (let i = 1; i <= objects.length; i++) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
pdf += `startxref\n${xrefStart}\n%%EOF\n`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, pdf);
console.log(`Wrote ${outFile}`);
