import { ImageResponse } from "next/og";

export const alt =
  "Harine Management — medical practice analytics and Power BI dashboards in Atlanta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CRIMSON = "#B83030";
const CREAM = "#FAF7F2";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: CRIMSON,
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: CREAM,
              fontSize: "22px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Harine Management
          </span>
          <span
            style={{
              color: CREAM,
              opacity: 0.7,
              fontSize: "16px",
              marginTop: "8px",
              fontFamily: "sans-serif",
            }}
          >
            Atlanta healthcare consulting
          </span>
        </div>
        <div
          style={{
            color: CREAM,
            fontSize: "58px",
            lineHeight: 1.15,
            maxWidth: "920px",
          }}
        >
          Power BI dashboards for medical practices
        </div>
        <div
          style={{
            color: CREAM,
            opacity: 0.75,
            fontSize: "22px",
            fontFamily: "sans-serif",
          }}
        >
          athenahealth and eClinicalWorks reporting · harinemanagement.com
        </div>
      </div>
    ),
    { ...size }
  );
}
