import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { z } from "zod";

const FavoriteColorSchema = z.object({
  color: z
    .string({ required_error: "Color is required" })
    .refine((val) => val.toLowerCase() === "blue", {
      message: 'Color must be "blue"',
    }),
});

export function FavoriteColorForm() {
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
      <form {...getFormProps(form)}>
        <div>
          <label className="block" htmlFor={fields.color.id}>
            Favorite color:
          </label>
          <input
            {...getInputProps(fields.color, { type: "text" })}
            className="mt-2 w-full shape-py-3 shape-px-5 shape-border-2 border-transparent rounded-xl bg-slate-800 hocus:border-white transition-colors"
          />
          <p className="mt-1 text-red-500" id={fields.color.errorId}>
            {fields.color.errors}
          </p>
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
    </>
  );
}
