"use client";
// 관리자 로그인 폼
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      const j = await res.json().catch(() => ({}));
      setError(j.error || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-lg border border-ink-100 bg-white p-8 shadow-card"
      >
        <h1 className="text-xl font-bold text-ink-900">관리자 로그인</h1>
        <p className="mt-1 text-sm text-ink-500">㈜루다시스템즈 CMS</p>
        <Input
          type="password"
          className="mt-6"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="mt-5 w-full"
          disabled={loading}
        >
          {loading ? "확인 중…" : "로그인"}
        </Button>
      </form>
    </div>
  );
}
