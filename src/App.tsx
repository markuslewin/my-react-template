import { useEffect, useId, useRef, useState } from "react";
import { flushSync } from "react-dom";

function App() {
  const outputRef = useRef<HTMLParagraphElement>(null);
  const colorInputId = useId();
  const [favoriteColor, setFavoriteColor] = useState("");
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
          <form
            onSubmit={(event) => {
              event.preventDefault();

              const formData = new FormData(event.currentTarget);
              const color = formData.get("color");
              if (typeof color !== "string" || !color.trim()) return;

              flushSync(() => {
                setFavoriteColor(color);
              });
              outputRef.current?.focus();
            }}
          >
            <div>
              <label className="block" htmlFor={colorInputId}>
                Favorite color:
              </label>
              <input
                className="mt-2 w-full shape-py-3 shape-px-5 shape-border-2 border-transparent rounded-xl bg-slate-800 hocus:border-white transition-colors"
                id={colorInputId}
                type="text"
                name="color"
              />
            </div>
            <button
              className="mt-4 shape-py-3 shape-px-5 shape-border-2 border-transparent rounded-xl bg-blue-700 hocus:bg-blue-500 transition-colors"
              type="submit"
            >
              Submit
            </button>
          </form>
          <p className="mt-6" ref={outputRef} tabIndex={-1}>
            {favoriteColor
              ? `Your favorite color is ${favoriteColor.toLowerCase()}!`
              : null}
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
