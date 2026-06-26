// 문자열 이름으로 Lucide 아이콘을 렌더하는 헬퍼
import {
  Network,
  Boxes,
  Palette,
  FlaskConical,
  Code2,
  Server,
  Database,
  Cloud,
  GitMerge,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Network,
  Boxes,
  Palette,
  FlaskConical,
  Code2,
  Server,
  Database,
  Cloud,
  GitMerge,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = MAP[name] ?? Network;
  return <Cmp className={className} aria-hidden="true" />;
}
