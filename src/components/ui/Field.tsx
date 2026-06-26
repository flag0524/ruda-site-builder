// 폼 입력 프리미티브 (Input, Textarea) — RHF register 호환
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-md border border-hairline-strong bg-canvas px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 placeholder:text-steel";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(fieldBase, className)} {...props} />;
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(fieldBase, "min-h-32 resize-y", className)}
      {...props}
    />
  );
});
