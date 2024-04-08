import Footer from "@/components/footer";
import Header from "@/components/header";
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
        <Footer />
      </body>
    </html>
  );
}
