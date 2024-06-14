import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
  return (
    <button
      className="mt-4 rounded-xl border-[transparent] bg-button text-button-foreground transition-colors shape-px-5 shape-py-3 shape-border-2 hocus:bg-button-hocus"
      {...props}
    />
  );
}
