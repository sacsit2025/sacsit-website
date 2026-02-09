import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "SACS-IT | Results-Secured Technology Studio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #000000 0%, #0A0A0A 50%, #111111 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Top glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background: "radial-gradient(ellipse at center, rgba(144,120,172,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {/* Purple diamond icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #7A6296 0%, #9078AC 50%, #B49ED0 100%)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "40px",
                color: "white",
                fontWeight: 700,
                fontFamily: "sans-serif",
              }}
            >
              S
            </div>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-2px",
            fontFamily: "sans-serif",
          }}
        >
          SACS-IT
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#9078AC",
            marginTop: "12px",
            fontFamily: "sans-serif",
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Results-Secured Technology Studio
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "4px",
            background: "linear-gradient(90deg, transparent 0%, #9078AC 50%, transparent 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
