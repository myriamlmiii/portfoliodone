import { ImageResponse } from "next/og";

export const alt = "Meriem Lmoubariki, builder of systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0c0e0f",
          color: "#f2f3ef",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#d79171", textTransform: "uppercase" }}>
          AI engineer · Researcher · Founder
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>Meriem Lmoubariki</div>
          <div style={{ marginTop: 24, fontSize: 44, color: "#aeb5b4" }}>Builder of systems.</div>
        </div>
        <div style={{ fontSize: 26, color: "#7c8684" }}>meriemlmoubariki.com</div>
      </div>
    ),
    size
  );
}
