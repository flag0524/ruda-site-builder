import { Card, CardContent } from "@/components/ui/card";
import { Users, Lightbulb, Code, Palette, Briefcase } from "lucide-react";

export const Organization = () => {
  const departments = [
    { icon: Lightbulb, name: "R&D 연구소", color: "text-primary" },
    { icon: Code, name: "솔루션 개발팀", color: "text-accent" },
    { icon: Code, name: "SI 개발팀", color: "text-secondary" },
    { icon: Palette, name: "UI/UX 개발팀", color: "text-primary" },
    { icon: Briefcase, name: "경영지원부", color: "text-accent" }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            조직 구성
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            전문성을 갖춘 팀이 함께 최고의 결과를 만들어냅니다
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 border-2 border-primary/20 shadow-elegant">
            <CardContent className="p-8 text-center">
              <Users className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">CEO</h3>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {departments.map((dept, index) => (
              <Card 
                key={index}
                className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border"
              >
                <CardContent className="p-6 text-center">
                  <dept.icon className={`h-10 w-10 mx-auto mb-3 ${dept.color}`} />
                  <h4 className="font-semibold text-sm text-foreground leading-tight">
                    {dept.name}
                  </h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-0">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-4 text-center">
                핵심 전략
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <p className="font-semibold text-foreground">기술 확보 전략</p>
                  <p className="text-sm text-muted-foreground mt-1">Technology Acquirement</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <p className="font-semibold text-foreground">경험 확보 전략</p>
                  <p className="text-sm text-muted-foreground mt-1">Experience Acquirement</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <p className="font-semibold text-foreground">기술 개발 전략</p>
                  <p className="text-sm text-muted-foreground mt-1">Technology Development</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
