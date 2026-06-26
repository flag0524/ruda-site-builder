import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Layers, MessageSquare } from "lucide-react";

export const BusinessAreas = () => {
  const areas = [
    {
      number: "01",
      icon: Briefcase,
      title: "Business",
      subtitle: "비즈니스 솔루션",
      keywords: ["Custom", "Individual", "Connectivity", "Cooperation"],
      description: "고객 맞춤형 비즈니스 솔루션을 통해 기업의 디지털 전환을 지원합니다"
    },
    {
      number: "02",
      icon: Layers,
      title: "Platform",
      subtitle: "플랫폼 구축",
      keywords: ["Simple", "Cross-Platform", "Global", "Safe"],
      description: "안전하고 확장 가능한 플랫폼으로 글로벌 비즈니스를 실현합니다"
    },
    {
      number: "03",
      icon: MessageSquare,
      title: "Consulting",
      subtitle: "전문 컨설팅",
      keywords: ["Specialty", "Availability", "Trustability"],
      description: "전문성과 신뢰를 바탕으로 최적의 IT 솔루션을 제안합니다"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            사업 영역
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            3가지 핵심 영역을 통해 고객의 성공을 지원합니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {areas.map((area, index) => (
            <Card 
              key={index}
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-primary to-accent" />
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-5xl font-bold text-primary/20">
                    {area.number}
                  </span>
                  <area.icon className="h-12 w-12 text-primary mt-2 group-hover:scale-110 transition-transform" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {area.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  {area.subtitle}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {area.keywords.map((keyword, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {area.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
