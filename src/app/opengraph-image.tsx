import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Zakharias Priya — Product Designer / UI/UX Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function Image() {
  const font = await readFile(path.join(process.cwd(), "src/assets/fonts/SpaceGrotesk-Medium.ttf"));
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 64, background: "#F8FAFC", color: "#0F172A", fontFamily: "Space Grotesk", borderBottom: "16px solid #2563EB" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 38 }}>ZP<span style={{ color: "#2563EB" }}>.</span></div>
        <div style={{ fontSize: 22, color: "#475569" }}>PORTFOLIO / SELECTED WORK</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 80, letterSpacing: -4 }}>Zakharias Priya</div>
        <div style={{ fontSize: 38, color: "#2563EB" }}>Product Designer / UI/UX Designer</div>
      </div>
      <div style={{ display: "flex", background: "#172554", color: "#DBEAFE", padding: "22px 26px", fontSize: 24 }}>B2B SaaS · Enterprise software · Design systems · Digital products</div>
    </div>,
    { ...size, fonts: [{ name: "Space Grotesk", data: font, style: "normal", weight: 500 }] },
  );
}
