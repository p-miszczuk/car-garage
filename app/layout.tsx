import AuthProviders from "@/components/auth-providers";
import Footer from "@/components/footer";
import Header from "@/components/header";
import UserAuthChecker from "@/components/user-auth-check";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full max-w-screen-xl mx-auto md:px-10 px-5 py-3">
        <AuthProviders>
          <Header />
          {children}
          <UserAuthChecker />
        </AuthProviders>
        <Footer />
      </body>
    </html>
  );
}
