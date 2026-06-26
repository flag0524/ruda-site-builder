// 파일(JSON) 기반 목 데이터베이스 — 프로젝트/뉴스/문의 영속화
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Project, News, Inquiry } from "@/types";

const DATA_DIR = path.join(process.cwd(), ".data");

type Collection = "projects" | "news" | "inquiries";

const SEED_PROJECTS: Project[] = [
  {
    id: "p1",
    name: "국회 e-의안시스템 차세대 구축 (분석/설계)",
    client: "베스티안소프트",
    startDate: "2025-09",
    durationMonths: 5,
    scope: ["기획", "UI/UX", "개발"],
    tech: ["Java", "Spring", "Oracle"],
    summary: "국회 입법 프로세스 디지털 혁신을 위한 차세대 시스템 분석 및 설계.",
    order: 1,
    published: true,
  },
  {
    id: "p2",
    name: "관세청 상용솔루션 성능/기능 검증 컨설팅",
    client: "㈜클라우디아",
    startDate: "2025-12",
    durationMonths: 5,
    scope: ["솔루션 성능/기능 검증 컨설팅"],
    tech: ["성능검증", "기능검증"],
    summary: "관세청 시스템 안정성 및 기능 검증 컨설팅 수행.",
    order: 2,
    published: true,
  },
  {
    id: "p3",
    name: "CBTI 청렴도 조사 설문 시스템 구축",
    client: "㈜이노그루",
    startDate: "2023-08",
    durationMonths: 5,
    scope: ["분석", "설계", "개발", "이행"],
    tech: ["Java", "Spring", "PostgreSQL"],
    summary: "청렴도 조사 설문 시스템 분석·설계·개발·이행 일괄 수행.",
    order: 3,
    published: true,
  },
  {
    id: "p4",
    name: "국회 정보화 기반 강화 구축",
    client: "베스티안소프트",
    startDate: "2022-03",
    durationMonths: 5,
    scope: ["시스템 이관 및 연계", "개발"],
    tech: ["연계", "이관", "Java"],
    summary: "국회 정보화 기반 강화를 위한 시스템 이관·연계 및 개발.",
    order: 4,
    published: true,
  },
  {
    id: "p5",
    name: "국회 입안지원 시스템 고도화",
    client: "베스티안소프트",
    startDate: "2022-08",
    durationMonths: 5,
    scope: ["기획", "UI/UX", "개발"],
    tech: ["Java", "Spring", "Oracle"],
    summary: "입안·접수·심사·의안지원 프로세스 UX 개선 및 기능 고도화.",
    order: 5,
    published: true,
  },
];

const SEED_NEWS: News[] = [
  {
    id: "n1",
    title: "루다시스템즈, 국회 e-의안시스템 차세대 사업 분석/설계 사업 수행",
    body: "국회 입법 프로세스 디지털 혁신을 위한 차세대 시스템 분석/설계 사업에 착수했습니다.",
    publishedAt: "2025-03-20",
  },
  {
    id: "n2",
    title: "관세청 상용솔루션 검증 컨설팅 수행",
    body: "관세청 상용솔루션의 성능 및 기능 검증 컨설팅 사업을 수행했습니다.",
    publishedAt: "2025-08-07",
  },
];

const SEEDS: Record<Collection, unknown[]> = {
  projects: SEED_PROJECTS,
  news: SEED_NEWS,
  inquiries: [],
};

async function filePath(c: Collection) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  return path.join(DATA_DIR, `${c}.json`);
}

async function readAll<T>(c: Collection): Promise<T[]> {
  const fp = await filePath(c);
  try {
    const raw = await fs.readFile(fp, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    const seed = SEEDS[c] as T[];
    await fs.writeFile(fp, JSON.stringify(seed, null, 2), "utf-8");
    return seed;
  }
}

async function writeAll<T>(c: Collection, items: T[]): Promise<void> {
  const fp = await filePath(c);
  await fs.writeFile(fp, JSON.stringify(items, null, 2), "utf-8");
}

/* ---------- Projects ---------- */
export async function getProjects(onlyPublished = false): Promise<Project[]> {
  const all = await readAll<Project>("projects");
  const list = onlyPublished ? all.filter((p) => p.published) : all;
  return list.sort((a, b) => a.order - b.order);
}

export async function createProject(
  data: Omit<Project, "id">,
): Promise<Project> {
  const all = await readAll<Project>("projects");
  const item: Project = { ...data, id: randomUUID() };
  all.push(item);
  await writeAll("projects", all);
  return item;
}

export async function updateProject(
  id: string,
  patch: Partial<Project>,
): Promise<Project | null> {
  const all = await readAll<Project>("projects");
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...patch, id };
  await writeAll("projects", all);
  return all[idx];
}

export async function deleteProject(id: string): Promise<boolean> {
  const all = await readAll<Project>("projects");
  const next = all.filter((p) => p.id !== id);
  if (next.length === all.length) return false;
  await writeAll("projects", next);
  return true;
}

/* ---------- News ---------- */
export async function getNews(): Promise<News[]> {
  const all = await readAll<News>("news");
  return all.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function createNews(data: Omit<News, "id">): Promise<News> {
  const all = await readAll<News>("news");
  const item: News = { ...data, id: randomUUID() };
  all.push(item);
  await writeAll("news", all);
  return item;
}

export async function updateNews(
  id: string,
  patch: Partial<News>,
): Promise<News | null> {
  const all = await readAll<News>("news");
  const idx = all.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...patch, id };
  await writeAll("news", all);
  return all[idx];
}

export async function deleteNews(id: string): Promise<boolean> {
  const all = await readAll<News>("news");
  const next = all.filter((n) => n.id !== id);
  if (next.length === all.length) return false;
  await writeAll("news", next);
  return true;
}

/* ---------- Inquiries ---------- */
export async function getInquiries(): Promise<Inquiry[]> {
  const all = await readAll<Inquiry>("inquiries");
  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createInquiry(
  data: Omit<Inquiry, "id" | "status" | "createdAt">,
): Promise<Inquiry> {
  const all = await readAll<Inquiry>("inquiries");
  const item: Inquiry = {
    ...data,
    id: randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  all.push(item);
  await writeAll("inquiries", all);
  return item;
}

export async function updateInquiryStatus(
  id: string,
  status: Inquiry["status"],
): Promise<Inquiry | null> {
  const all = await readAll<Inquiry>("inquiries");
  const idx = all.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  all[idx].status = status;
  await writeAll("inquiries", all);
  return all[idx];
}
