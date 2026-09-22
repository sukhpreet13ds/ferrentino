import "./globals.css";
import "../styles/components.css";
import "../styles/foldtext.css";
import "../styles/pages.css";
import "../styles/estimator.css";
import "../styles/base.css";
import { getContent } from "../lib/data";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata() {
  const site = await getContent("site", {});
  return {
    title: site.siteName || "Ferrentino & Son",
    description:
      "Ferrentino & Son, LLC — Marion County builder for new home, commercial, and remodeling construction projects.",
    icons: {
      icon: site.favicon || "/favicon.ico",
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
