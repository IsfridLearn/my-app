// The only pixel art on the site: the AS monogram and the link arrow.
// "f" cells take the current text color, so sprites work on black and on white.

const A = [".fff.", "f...f", "f...f", "fffff", "f...f", "f...f", "f...f"];
const S = [".ffff", "f....", "f....", ".fff.", "....f", "....f", "ffff."];

export const MONOGRAM: string[] = A.map((row, i) => `${row}.${S[i]}`);

export const ARROW: string[] = ["fffff", "...ff", "..f.f", ".f..f", "f...."];
