// 로고 PNG(흰 글자+어두운 배경)를 투명배경 흑/백 변형으로 변환하는 1회성 스크립트
import sharp from "sharp";
import path from "path";

const SRC = path.join(process.cwd(), "public", "ruda-logo.png");

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const px = width * height;

// 글자(밝은 픽셀)의 휘도를 알파로 사용 → 배경(어두움) 투명
const whiteBuf = Buffer.alloc(px * 4);
const blackBuf = Buffer.alloc(px * 4);

for (let i = 0; i < px; i++) {
  const r = data[i * channels];
  const g = data[i * channels + 1];
  const b = data[i * channels + 2];
  const lum = 0.299 * r + 0.587 * g + 0.114 * b; // 0~255
  const alpha = Math.max(0, Math.min(255, Math.round((lum - 40) * 1.4)));

  // 흰색 로고
  whiteBuf[i * 4] = 255;
  whiteBuf[i * 4 + 1] = 255;
  whiteBuf[i * 4 + 2] = 255;
  whiteBuf[i * 4 + 3] = alpha;

  // 검정 로고
  blackBuf[i * 4] = 17;
  blackBuf[i * 4 + 1] = 17;
  blackBuf[i * 4 + 2] = 17;
  blackBuf[i * 4 + 3] = alpha;
}

await sharp(whiteBuf, { raw: { width, height, channels: 4 } })
  .png()
  .toFile(path.join(process.cwd(), "public", "ruda-logo-white.png"));

await sharp(blackBuf, { raw: { width, height, channels: 4 } })
  .png()
  .toFile(path.join(process.cwd(), "public", "ruda-logo-dark.png"));

console.log(`done: ${width}x${height} → ruda-logo-white.png, ruda-logo-dark.png`);
