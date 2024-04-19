import { Link, useLoaderData } from "react-router-dom";

export function loader() {
  return {
    messages: [
      { id: 0, text: "One" },
      { id: 1, text: "Two" },
    ],
  };
}

export function NestedRoutesIndex() {
  const { messages } = useLoaderData() as ReturnType<typeof loader>;

  return (
    <>
      <h2 className="text-heading-m">Messages</h2>
      <ul className="mt-8">
        {messages.map((message) => (
          <li className="mt-4" key={message.id}>
            <Link
              className="underline underline-offset-4 hocus:no-underline"
              to={`nested-routes/update/${message.id}`}
            >
              {message.text}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
