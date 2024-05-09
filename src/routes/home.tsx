import { screens } from "../utils/screens";
import { useMedia } from "../utils/use-media";

export function Home() {
  const tabletMatches = useMedia(`(min-width: ${screens.tablet})`);
  const desktopMatches = useMedia(`(min-width: ${screens.desktop})`);

  return (
    <>
      <h1 className="text-heading-l">My React template</h1>
      <p className="mt-8">This is my React template.</p>
      <p className="mt-8">
        Current breakpoint:{" "}
        {desktopMatches ? "Desktop" : tabletMatches ? "Tablet" : "Mobile"}
      </p>
    </>
  );
}
