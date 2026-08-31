import "./globals.css";

export const metadata = {
  title: "Metacognición en familia",
  description: "Curso de metacognición para mamá y los niños",
  manifest: "/manifest.json",
};

export const viewport = { themeColor: "#2F5BEA", width: "device-width", initialScale: 1, maximumScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
