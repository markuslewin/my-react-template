import { useEffect, useState } from "react";
import { FavoriteColorForm } from "./components/FavoriteColorForm";

function App() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch("/api/message")
      .then((response) => response.text())
      .then((text) => {
        if (ignore) return;

        setMessage(text);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="min-h-screen px-4 py-6 tablet:px-10 tablet:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-heading-l text-center">My React template</h1>
        <h2 className="mt-12 text-heading-m">A message from the API</h2>
        <p className="mt-8">The API says:</p>
        <pre className="mt-5">{message === null ? "Loading..." : message}</pre>
        <h2 className="mt-12 text-heading-m">Favorite color</h2>
        <div className="mt-8 max-w-96">
          <FavoriteColorForm />
        </div>
      </div>
    </main>
  );
}

export default App;
