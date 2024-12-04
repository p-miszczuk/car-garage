import AuthProviders from "@/components/auth-providers";
import Footer from "@/components/footer";
import Header from "@/components/header";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full md:px-10 px-5 py-3">
        <AuthProviders>
          <Header />
          {children}
        </AuthProviders>
        <Footer />
      </body>
    </html>
  );
}
