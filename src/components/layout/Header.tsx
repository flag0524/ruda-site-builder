"use client";
// 글로벌 헤더 — 화이트 스티키 바, 다크 로고, 오렌지 CTA, 모바일 햄버거
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline-soft bg-canvas/95 backdrop-blur">
      <nav className="container-fixed flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label={SITE.name}>
          <Image
            src="/ruda-logo-dark.png"
            alt="RUDA SYSTEMS"
            width={132}
            height={30}
            className="h-7 w-auto"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium text-ink-700 transition-colors duration-200 hover:text-primary",
                  pathname.startsWith(item.href) && "text-primary",
                )}
              >
                {item.ko}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={SITE.profilePdf}
            className="text-sm font-medium text-ink-700 transition-colors hover:text-primary"
          >
            회사소개서
          </Link>
          <Link
            href="/contact"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-primary-deep"
          >
            사업문의
          </Link>
        </div>

        <button
          type="button"
          className="text-ink-900 md:hidden"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-hairline-soft bg-canvas px-6 py-4 md:hidden">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-3 text-base font-medium text-ink-900 hover:text-primary"
              >
                {item.ko}
              </Link>
            </li>
          ))}
          <li className="mt-3">
            <Link
              href="/contact"
              className="block rounded-md bg-primary px-4 py-3 text-center text-sm font-medium text-white"
            >
              사업문의
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
