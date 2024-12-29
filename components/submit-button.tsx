"use client";

import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button className="px-4 py-1 bg-white text-black rounded cursor-pointer w-full mt-5 font-medium flex" type="submit" aria-disabled={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
}
