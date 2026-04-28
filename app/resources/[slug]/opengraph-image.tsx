import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug, CATEGORY_LABELS } from "@/lib/blog";

export const alt = "Harine Management — Healthcare Data Analytics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

const CRIMSON = "#8B1A2B";
const CREAM = "#FAF7F2";
const CRIMSON_DARK = "#6B1220";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Harine Management";
  const category = post ? CATEGORY_LABELS[post.category] : "Healthcare Analytics";
  const readingTime = post?.readingTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: CRIMSON,
          padding: "64px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top bar: brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                color: CREAM,
                fontSize: "22px",
                fontFamily: "Georgia, serif",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Harine Management
            </span>
            <span
              style={{
                color: CREAM,
                opacity: 0.6,
                fontSize: "14px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              Healthcare Data Analytics
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                backgroundColor: CREAM,
                color: CRIMSON,
                fontSize: "12px",
                fontFamily: "sans-serif",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: "2px",
              }}
            >
              {category}
            </div>
            {readingTime && (
              <span
                style={{
                  color: CREAM,
                  opacity: 0.5,
                  fontSize: "13px",
                  fontFamily: "sans-serif",
                }}
              >
                {readingTime}
              </span>
            )}
          </div>
        </div>

        {/* Rule */}
        <div
          style={{
            width: "60px",
            height: "2px",
            backgroundColor: CREAM,
            opacity: 0.4,
            marginBottom: "28px",
          }}
        />

        {/* Post title */}
        <div
          style={{
            color: CREAM,
            fontSize: title.length > 60 ? "44px" : "52px",
            fontFamily: "Georgia, serif",
            lineHeight: 1.2,
            maxWidth: "880px",
            marginBottom: "auto",
          }}
        >
          {title}
        </div>

        {/* Bottom: URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: "32px",
            borderTop: `1px solid ${CRIMSON_DARK}`,
          }}
        >
          <span
            style={{
              color: CREAM,
              opacity: 0.45,
              fontSize: "14px",
              fontFamily: "sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            harinemanagement.com/resources
          </span>
        </div>
      </div>
    ),
    size
  );
}
