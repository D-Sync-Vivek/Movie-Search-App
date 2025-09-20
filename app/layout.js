import "./globals.css";
export const metadata = {
  title: "Movie Search App",
  description:
    "Search movies & web series using OMDb API with infinite scroll, skeleton loaders, and detail pages.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#18181b]">{children}</body>
    </html>
  );
}
