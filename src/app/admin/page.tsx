// 관리자 진입점 — 인증 여부에 따라 로그인/대시보드 분기
import { isAuthed } from "@/lib/auth";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  if (!isAuthed()) return <AdminLogin />;
  return <AdminDashboard />;
}
