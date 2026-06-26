import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Globe, MapPin } from "lucide-react";

export const Contact = () => {
  const contactInfo = [
    { icon: Phone, label: "전화번호", value: "07-1204-8027" },
    { icon: Mail, label: "이메일", value: "contact@rudasystems.com" },
    { icon: Globe, label: "웹사이트", value: "www.rudasystems.com" },
    { icon: MapPin, label: "사업자등록번호", value: "354-86-01884" }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            프로젝트 문의 및 상담이 필요하시면 언제든지 연락주세요
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-elegant border-border">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {item.label}
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-8">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-foreground">
                    주식회사 루다시스템즈
                  </h3>
                  <p className="text-muted-foreground">
                    System Integration 전문 기업
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white px-8"
                  >
                    프로젝트 문의하기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
