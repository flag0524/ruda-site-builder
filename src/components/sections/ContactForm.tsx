"use client";
// 문의 폼 — React Hook Form + Zod 검증, honeypot, 제출/완료 처리
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { inquirySchema, type InquiryInput } from "@/lib/validators";
import { Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { agreedPrivacy: false },
  });

  const onSubmit = async (data: InquiryInput) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setServerError(json.error || "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.");
        return;
      }
      reset();
      setDone(true);
    } catch {
      setServerError("네트워크 오류가 발생했습니다.");
    }
  };

  if (done) {
    return (
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-8 text-center">
        <p className="text-lg font-bold text-ink-900">문의가 접수되었습니다.</p>
        <p className="mt-2 text-sm text-ink-500">
          담당자가 확인 후 빠르게 연락드리겠습니다. 감사합니다.
        </p>
        <Button
          type="button"
          variant="ghost"
          className="mt-6"
          onClick={() => setDone(false)}
        >
          새 문의 작성
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Field label="회사명" error={errors.company?.message}>
        <Input {...register("company")} placeholder="회사명" aria-invalid={!!errors.company} />
      </Field>
      <Field label="담당자" error={errors.manager?.message}>
        <Input {...register("manager")} placeholder="담당자명" aria-invalid={!!errors.manager} />
      </Field>
      <Field label="연락처" error={errors.contact?.message}>
        <Input
          {...register("contact")}
          placeholder="연락처 또는 이메일"
          aria-invalid={!!errors.contact}
        />
      </Field>
      <Field label="문의내용" error={errors.message?.message}>
        <Textarea
          {...register("message")}
          placeholder="문의하실 내용을 입력해 주세요."
          aria-invalid={!!errors.message}
        />
      </Field>

      {/* honeypot (스크린리더/사용자 비노출) */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("website")}
      />

      <label className="flex items-start gap-2 text-sm text-ink-500">
        <input
          type="checkbox"
          {...register("agreedPrivacy")}
          className="mt-1 h-4 w-4 accent-primary"
        />
        <span>
          개인정보 수집·이용에 동의합니다. (수집 항목: 회사명·담당자·연락처·문의내용 /
          목적: 문의 응대 / 보관: 3년)
        </span>
      </label>
      {errors.agreedPrivacy && (
        <p className="text-sm text-red-500">{errors.agreedPrivacy.message}</p>
      )}

      {serverError && <p className="text-sm text-red-500">{serverError}</p>}

      <Button type="submit" variant="accent" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "전송 중…" : "문의 보내기"}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-ink-900">
        {label} <span className="text-primary">*</span>
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
