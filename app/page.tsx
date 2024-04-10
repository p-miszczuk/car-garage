import { getDescription } from "@/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Garage - home page",
};

export default function Home() {
  const { header, description } = getDescription("home");

  return (
    <main className="w-100 h-[calc(100%-7rem)]">
      <article className="h-full">
        <h1 className="text-2xl font-bold py-5">{header} Car Garage </h1>
        <p className="text-xl">{description}</p>
      </article>
    </main>
  );
}
