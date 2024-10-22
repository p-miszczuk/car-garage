import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Strona nie znaleziona</h1>
      <p>Przepraszamy, ale strona, której szukasz, nie istnieje.</p>
      <Link href="/">
        <a>Wróć do strony głównej</a>
      </Link>
    </div>
  );
};

export default NotFoundPage;
