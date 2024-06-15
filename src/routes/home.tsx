import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { z } from "zod";
import { Input } from "../components/input";
import { Button } from "../components/button";
// @ts-expect-error TS doesn't understand search params?
import tabletImg from "../assets/nattu-adnan-vvHRdOwqHcg-unsplash.jpg?format=webp&w=768&as=metadata";
// @ts-expect-error TS doesn't understand search params?
import mobileImg from "../assets/nattu-adnan-vvHRdOwqHcg-unsplash.jpg?format=webp&w=300&as=metadata";
import { screens } from "../utils/screens";
import { AnnouncementHandle } from "../components/route-announcer";
import * as Landmark from "../components/landmark";

export const handle = {
  announcement() {
    return "Home";
  },
} satisfies AnnouncementHandle;

const FavoriteColorSchema = z.object({
  color: z
    .string({ required_error: "Color is required" })
    .refine((val) => val.toLowerCase() === "blue", {
      message: 'Color must be "blue"',
    }),
});

export function Home() {
  return (
    <>
      <h1 className="text-heading-l">My React template</h1>
      <p className="mt-8">This is my React template.</p>
      <h2 className="mt-24 text-heading-m">Form validation</h2>
      <FormValidation />
      <h2 className="mt-24 text-heading-m">Optimized image</h2>
      <OptimizedImage />
      <Landmark.Root>
        <Landmark.Label>
          <h2 className="mt-24 text-heading-m">API endpoint</h2>
        </Landmark.Label>
        <ApiEndpoint />
      </Landmark.Root>
    </>
  );
}

function FormValidation() {
  const outputRef = useRef<HTMLParagraphElement>(null);
  const [favoriteColor, setFavoriteColor] = useState("");
  const [form, fields] = useForm({
    constraint: getZodConstraint(FavoriteColorSchema),
    shouldValidate: "onBlur",
    // shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: FavoriteColorSchema });
    },
    onSubmit(event, { submission }) {
      event.preventDefault();

      if (submission?.status !== "success") return;

      flushSync(() => {
        setFavoriteColor(submission.value.color);
      });
      outputRef.current?.focus();
    },
  });

  return (
    <>
      <p className="mt-8">This form is validated with Conform and Zod.</p>
      <form className="mt-8 max-w-sm" {...getFormProps(form)}>
        <div>
          <label className="block" htmlFor={fields.color.id}>
            Favorite color:
          </label>
          <Input {...getInputProps(fields.color, { type: "text" })} />
          <p className="mt-1 text-error-foreground" id={fields.color.errorId}>
            {fields.color.errors}
          </p>
        </div>
        <Button type="submit">Submit</Button>
      </form>
      <p className="mt-6" ref={outputRef} tabIndex={-1}>
        {favoriteColor
          ? `Your favorite color is ${favoriteColor.toLowerCase()}!`
          : null}
      </p>
    </>
  );
}

function OptimizedImage() {
  return (
    <>
      <p className="mt-8">
        The original image was <strong>3.5 MB</strong>, but the following image
        is <strong>163 kB</strong>.
      </p>
      <picture>
        <source
          media={`(min-width: ${screens.tablet})`}
          width={tabletImg.width}
          height={tabletImg.height}
          srcSet={tabletImg.src}
        />
        <img
          className="mt-6 w-full"
          alt="The optimized image"
          width={mobileImg.width}
          height={mobileImg.height}
          src={mobileImg.src}
        />
      </picture>
    </>
  );
}

function ApiEndpoint() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch("/.netlify/functions/message")
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
    <>
      <p className="mt-8">The server says:</p>
      <pre className="mt-4" data-testid="server-message">
        {message === null ? "Loading..." : message}
      </pre>
    </>
  );
}
