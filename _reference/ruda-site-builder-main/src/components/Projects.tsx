import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Projects = () => {
  const recentProjects = [
    {
      year: "2024",
      title: "국회 e-의안시스템 차세대",
      category: "정부",
      description: "국회 입법 프로세스의 디지털 혁신을 위한 차세대 시스템 분석 및 설계"
    },
    {
      year: "2023",
      title: "관세청 상용솔루션 기능 검증",
      category: "정부",
      description: "관세청 시스템의 안정성 및 기능 검증 수행"
    },
    {
      year: "2022",
      title: "두나무 Next Steppers 플랫폼",
      category: "금융",
      description: "금융위기 청년지원 사업을 위한 통합 플랫폼 구축"
    },
    {
      year: "2022",
      title: "국회 입안지원 시스템 고도화",
      category: "정부",
      description: "국회 입법 지원 시스템의 UX 개선 및 기능 고도화"
    },
    {
      year: "2021",
      title: "NH농협은행 FATCA/CRS 시스템",
      category: "금융",
      description: "국제 금융정보 교환 시스템 UI/UX 고도화"
    },
    {
      year: "2021",
      title: "BNK부산은행 내부상시감사 시스템",
      category: "금융",
      description: "은행 내부 감사 프로세스 디지털화"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            주요 프로젝트
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            금융, 정부, 공공기관의 핵심 시스템 구축 경험
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProjects.map((project, index) => (
            <Card 
              key={index}
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="text-sm font-bold">
                    {project.year}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            그 외 다수의 금융, 공공, 기업 프로젝트 수행 경험 보유
          </p>
        </div>
      </div>
    </section>
  );
};
