import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Page Title",
};

export default function Home() {
  return (
    <main className="container mx-auto">
      <h1>Home Page</h1>
    </main>
  );
}
