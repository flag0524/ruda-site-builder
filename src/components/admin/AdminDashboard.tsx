"use client";
// 관리자 대시보드 — 프로젝트/뉴스/문의 관리 (탭 구성)
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import type { Project, News, Inquiry, InquiryStatus } from "@/types";

type Tab = "projects" | "news" | "inquiries";

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("projects");
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink-900">㈜루다시스템즈 CMS</h1>
        <Button variant="ghost" onClick={logout}>
          로그아웃
        </Button>
      </header>

      <nav className="mt-6 flex gap-2 border-b border-ink-100">
        {(
          [
            ["projects", "프로젝트"],
            ["news", "뉴스"],
            ["inquiries", "문의"],
          ] as [Tab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 text-sm font-semibold ${
              tab === key
                ? "border-b-2 border-primary text-ink-900"
                : "text-ink-500"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-8">
        {tab === "projects" && <ProjectsPanel />}
        {tab === "news" && <NewsPanel />}
        {tab === "inquiries" && <InquiriesPanel />}
      </div>
    </div>
  );
}

/* ---------------- Projects ---------------- */
function ProjectsPanel() {
  const [items, setItems] = useState<Project[]>([]);
  const [form, setForm] = useState({
    name: "",
    client: "",
    startDate: "",
    durationMonths: 5,
    scope: "",
    tech: "",
    summary: "",
    order: 99,
  });
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const r = await fetch("/api/projects");
    const j = await r.json();
    setItems(j.projects ?? []);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const body = {
      ...form,
      scope: form.scope.split(",").map((s) => s.trim()).filter(Boolean),
      tech: form.tech.split(",").map((s) => s.trim()).filter(Boolean),
      published: true,
    };
    const r = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!r.ok) {
      setError("저장 실패 — 입력값(특히 시작일 YYYY-MM)을 확인하세요.");
      return;
    }
    setForm({
      name: "",
      client: "",
      startDate: "",
      durationMonths: 5,
      scope: "",
      tech: "",
      summary: "",
      order: 99,
    });
    load();
  };

  const remove = async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    load();
  };

  const togglePublish = async (p: Project) => {
    await fetch(`/api/projects/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !p.published }),
    });
    load();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={add} className="space-y-3 rounded-lg border border-ink-100 bg-white p-6">
        <h2 className="font-bold text-ink-900">프로젝트 등록</h2>
        <Input placeholder="프로젝트명" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <Input placeholder="고객사" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} required />
        <div className="flex gap-3">
          <Input placeholder="시작일 (YYYY-MM)" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required />
          <Input type="number" placeholder="개월" value={form.durationMonths} onChange={(e) => setForm({ ...form, durationMonths: Number(e.target.value) })} />
        </div>
        <Input placeholder="수행내용 (쉼표 구분)" value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })} />
        <Input placeholder="기술요소 (쉼표 구분)" value={form.tech} onChange={(e) => setForm({ ...form, tech: e.target.value })} />
        <Textarea placeholder="요약" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
        <Input type="number" placeholder="정렬순서" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" variant="primary">등록</Button>
      </form>

      <div className="space-y-3">
        <h2 className="font-bold text-ink-900">프로젝트 목록 ({items.length})</h2>
        {items.map((p) => (
          <div key={p.id} className="rounded-lg border border-ink-100 bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-ink-900">{p.name}</p>
                <p className="text-sm text-ink-500">{p.client} · {p.startDate}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="ghost" onClick={() => togglePublish(p)}>
                  {p.published ? "게시중" : "비공개"}
                </Button>
                <Button variant="ghost" onClick={() => remove(p.id)}>삭제</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- News ---------------- */
function NewsPanel() {
  const [items, setItems] = useState<News[]>([]);
  const [form, setForm] = useState({ title: "", body: "", publishedAt: "" });

  const load = useCallback(async () => {
    const r = await fetch("/api/news");
    const j = await r.json();
    setItems(j.news ?? []);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (r.ok) {
      setForm({ title: "", body: "", publishedAt: "" });
      load();
    }
  };
  const remove = async (id: string) => {
    await fetch(`/api/news/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={add} className="space-y-3 rounded-lg border border-ink-100 bg-white p-6">
        <h2 className="font-bold text-ink-900">뉴스 등록</h2>
        <Input placeholder="제목" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <Input placeholder="게시일 (YYYY-MM-DD)" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} required />
        <Textarea placeholder="내용" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required />
        <Button type="submit" variant="primary">등록</Button>
      </form>
      <div className="space-y-3">
        <h2 className="font-bold text-ink-900">뉴스 목록 ({items.length})</h2>
        {items.map((n) => (
          <div key={n.id} className="rounded-lg border border-ink-100 bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-ink-900">{n.title}</p>
                <p className="text-sm text-ink-500">{n.publishedAt}</p>
              </div>
              <Button variant="ghost" onClick={() => remove(n.id)}>삭제</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Inquiries ---------------- */
const STATUS_LABEL: Record<InquiryStatus, string> = {
  new: "신규",
  in_progress: "처리중",
  done: "완료",
};

function InquiriesPanel() {
  const [items, setItems] = useState<Inquiry[]>([]);

  const load = useCallback(async () => {
    const r = await fetch("/api/inquiries");
    const j = await r.json();
    setItems(j.inquiries ?? []);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (id: string, status: InquiryStatus) => {
    await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  return (
    <div className="space-y-3">
      <h2 className="font-bold text-ink-900">문의 내역 ({items.length})</h2>
      {items.length === 0 && <p className="text-sm text-ink-500">접수된 문의가 없습니다.</p>}
      {items.map((i) => (
        <div key={i.id} className="rounded-lg border border-ink-100 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-semibold text-ink-900">
              {i.company} · {i.manager}
            </p>
            <select
              value={i.status}
              onChange={(e) => setStatus(i.id, e.target.value as InquiryStatus)}
              className="rounded border border-ink-100 px-2 py-1 text-sm"
            >
              {(Object.keys(STATUS_LABEL) as InquiryStatus[]).map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-1 text-sm text-ink-500">{i.contact}</p>
          <p className="mt-2 text-sm text-ink-900">{i.message}</p>
          <p className="mt-2 text-xs text-ink-500">
            {new Date(i.createdAt).toLocaleString("ko-KR")}
          </p>
        </div>
      ))}
    </div>
  );
}
