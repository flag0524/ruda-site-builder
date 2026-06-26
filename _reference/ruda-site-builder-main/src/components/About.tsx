import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Calendar, Globe } from "lucide-react";

export const About = () => {
  const companyInfo = [
    { icon: Calendar, label: "설립일", value: "2021년 5월 20일" },
    { icon: Building2, label: "사업분야", value: "시스템 통합 (SI)" },
    { icon: Users, label: "임직원", value: "약 10명" },
    { icon: Globe, label: "웹사이트", value: "www.rudasystems.com" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            회사 소개
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            루다시스템즈는 독립적이고 창의적인 사고로 새로운 시작을 꿈꾸는<br />
            시스템 통합 전문 기업입니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {companyInfo.map((item, index) => (
            <Card 
              key={index}
              className="border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                <item.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                  {item.label}
                </h3>
                <p className="text-lg font-bold text-foreground">
                  {item.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-0 shadow-elegant">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Vision
              </h3>
              <p className="text-3xl md:text-4xl font-bold text-foreground leading-relaxed">
                I dream of the beginning of newness.
              </p>
              <p className="text-xl text-muted-foreground">
                새로움의 시작을 꿈꿉니다
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
