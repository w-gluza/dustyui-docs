import type { Metadata } from "next";
import "./globals.css";

const title = "DustyUI";
const description =
  "A minimalist, neutral-toned React UI component library styled with CSS Modules.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
