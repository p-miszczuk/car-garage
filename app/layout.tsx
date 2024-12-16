import AuthProviders from "@/components/auth-providers";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer
          position="top-right"
          rtl={false}
          theme="light"
          closeOnClick
        />
      </body>
    </html>
  );
}
