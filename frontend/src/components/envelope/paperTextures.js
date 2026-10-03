import * as THREE from "three";

// Real bitmap fibres, shared by the lit 3D stock and the non-WebGL fallback.
let seed = 27;
const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const gold = (ctx, width) => {
  const gradient = ctx.createLinearGradient(0, 0, width, width * 0.6);
  [[0, "#a66f2e"], [0.3, "#e6c98b"], [0.55, "#c59951"], [0.8, "#ebce8a"], [1, "#a67230"]].forEach(([at, color]) => gradient.addColorStop(at, color));
  return gradient;
};

function fibrePaper(width, height, ivory = false, tint = null) {
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d");
  const image = ctx.createImageData(width, height);
  const base = tint || (ivory ? [241, 224, 188] : [83, 24, 35]);
  const mottling = Array.from({ length: 65 * 65 }, () => (random() - 0.5) * 11);
  for (let i = 0; i < image.data.length; i += 4) {
    const variation = (random() - 0.5) * (ivory ? 17 : 32);
    const x = (i / 4) % width, y = Math.floor(i / 4 / width);
    const gx = x / width * 64, gy = y / height * 64;
    const ix = Math.floor(gx), iy = Math.floor(gy), tx = gx - ix, ty = gy - iy;
    const top = mottling[iy * 65 + ix] * (1 - tx) + mottling[iy * 65 + ix + 1] * tx;
    const bottom = mottling[(iy + 1) * 65 + ix] * (1 - tx) + mottling[(iy + 1) * 65 + ix + 1] * tx;
    const grain = top * (1 - ty) + bottom * ty;
    for (let c = 0; c < 3; c++) image.data[i + c] = base[c] + variation + grain;
    image.data[i + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
  for (let i = 0; i < 7500; i++) {
    const x = random() * width, y = random() * height;
    ctx.strokeStyle = i % 2 ? "rgba(246,212,169,.09)" : "rgba(24,4,7,.10)";
    ctx.lineWidth = 0.3 + random() * 0.8;
    ctx.beginPath(); ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + random() * 9, y - 2, x + random() * 16, y + random() * 5);
    ctx.stroke();
  }
  return canvas;
}

function sprig(ctx, x, y, rotation, scale = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rotation); ctx.scale(scale, scale);
  ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(0, 0);
  ctx.bezierCurveTo(18, -32, -6, -60, 12, -97); ctx.stroke();
  for (let i = 0; i < 5; i++) {
    const yy = -12 - i * 15;
    for (const side of [-1, 1]) {
      ctx.beginPath(); ctx.moveTo(7, yy);
      ctx.bezierCurveTo(7 + side * 27, yy - 2, 7 + side * 21, yy - 22, 7, yy - 8); ctx.stroke();
    }
  }
  ctx.beginPath(); ctx.arc(12, -100, 3, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}

function corners(ctx, w, h) {
  ctx.strokeStyle = gold(ctx, w); ctx.fillStyle = ctx.strokeStyle;
  [[35, 35, 0], [w - 35, 35, Math.PI / 2], [w - 35, h - 35, Math.PI], [35, h - 35, -Math.PI / 2]].forEach(([x, y, r]) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(r);
    ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, 112); ctx.lineTo(0, 0); ctx.lineTo(112, 0); ctx.stroke();
    sprig(ctx, 9, 100, 0.2, 0.85); sprig(ctx, 100, 9, -Math.PI / 2 - 0.2, 0.85);
    // Three discreet bonding-pad traces tucked into the floral corner.
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(14 + i * 9, 54); ctx.lineTo(14 + i * 9, 14 + i * 9); ctx.lineTo(56, 14 + i * 9); ctx.stroke();
      ctx.beginPath(); ctx.arc(56, 14 + i * 9, 2, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  });
}

function diamond(ctx, x, y, size = 12) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4);
  ctx.lineWidth = 1.5; ctx.strokeRect(-size / 2, -size / 2, size, size);
  ctx.fillRect(-2, -2, 4, 4); ctx.restore();
}

export function createPaperTextures() {
  seed = 27;
  const outer = fibrePaper(1024, 640);
  const outerCtx = outer.getContext("2d");
  corners(outerCtx, 1024, 640);
  outerCtx.strokeStyle = gold(outerCtx, 1024); outerCtx.lineWidth = 1;
  outerCtx.strokeRect(22, 22, 980, 596);

  const flap = fibrePaper(1024, 448);
  const flapCtx = flap.getContext("2d");
  flapCtx.strokeStyle = gold(flapCtx, 1024); flapCtx.fillStyle = flapCtx.strokeStyle;
  flapCtx.lineWidth = 2;
  flapCtx.beginPath(); flapCtx.moveTo(15, 5); flapCtx.lineTo(15, 140);
  flapCtx.lineTo(490, 422); flapCtx.quadraticCurveTo(512, 437, 534, 422);
  flapCtx.lineTo(1009, 140); flapCtx.lineTo(1009, 5); flapCtx.stroke();
  for (const side of [-1, 1]) {
    for (let i = 0; i < 5; i++) sprig(flapCtx, 512 + side * (115 + i * 72), 388 - i * 44, side * -0.98, 0.6);
  }
  diamond(flapCtx, 512, 75, 21);

  const inner = fibrePaper(1024, 448, false, [62, 15, 25]);
  const innerCtx = inner.getContext("2d");
  innerCtx.fillStyle = gold(innerCtx, 1024); innerCtx.strokeStyle = innerCtx.fillStyle;
  innerCtx.textAlign = "center";
  diamond(innerCtx, 512, 135, 17);
  innerCtx.font = '48px "Cormorant Garamond", Georgia, serif';
  innerCtx.fillText("Two Journey", 512, 243);
  innerCtx.fillText("One Heart", 512, 298);
  innerCtx.lineWidth = 1; innerCtx.beginPath(); innerCtx.moveTo(441, 330); innerCtx.lineTo(486, 330);
  innerCtx.moveTo(538, 330); innerCtx.lineTo(583, 330); innerCtx.stroke(); diamond(innerCtx, 512, 330, 9);

  const card = fibrePaper(880, 660, true);
  const cardCtx = card.getContext("2d");
  corners(cardCtx, 880, 660); cardCtx.strokeStyle = "#b48742";
  cardCtx.lineWidth = 1; cardCtx.strokeRect(23, 23, 834, 614); cardCtx.strokeRect(29, 29, 822, 602);
  cardCtx.fillStyle = "#9c7339"; diamond(cardCtx, 440, 85, 14);
  cardCtx.textAlign = "center"; cardCtx.fillStyle = "#4b101f";
  cardCtx.font = '94px "Great Vibes", cursive'; cardCtx.fillText("Sanidhya", 440, 208);
  cardCtx.font = '43px "Cormorant Garamond", serif'; cardCtx.fillStyle = "#987033"; cardCtx.fillText("&", 440, 268);
  cardCtx.fillStyle = "#4b101f"; cardCtx.font = '94px "Great Vibes", cursive'; cardCtx.fillText("Vasudha", 440, 358);
  cardCtx.strokeStyle = "#ac874e"; cardCtx.fillStyle = "#ac874e";
  diamond(cardCtx, 440, 410, 9);

  const seal = document.createElement("canvas"); seal.width = 256; seal.height = 256;
  const sealCtx = seal.getContext("2d");
  const wax = sealCtx.createRadialGradient(90, 60, 5, 128, 128, 150);
  wax.addColorStop(0, "#edce85"); wax.addColorStop(0.5, "#bc873b"); wax.addColorStop(1, "#81551f");
  sealCtx.fillStyle = wax; sealCtx.fillRect(0, 0, 256, 256);
  sealCtx.strokeStyle = "#825823"; sealCtx.lineWidth = 3; sealCtx.beginPath(); sealCtx.arc(128, 128, 106, 0, Math.PI * 2); sealCtx.stroke();
  sealCtx.shadowColor = "#fae4a9"; sealCtx.shadowOffsetY = 1;
  sealCtx.fillStyle = "#785025"; sealCtx.textAlign = "center";
  sealCtx.font = '68px "Great Vibes", cursive'; sealCtx.fillText("S & V", 128, 151);
  sealCtx.strokeStyle = "#785025"; diamond(sealCtx, 128, 65, 12); diamond(sealCtx, 128, 190, 10);

  const textures = {};
  Object.entries({ outer, flap, inner, card, seal }).forEach(([key, canvas]) => {
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4; textures[key] = texture;
  });
  return textures;
}