import Header from "@/components/Header";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="md:px-10 px-5 py-3">
        <Header />
        {children}
      </body>
    </html>
  );
}
