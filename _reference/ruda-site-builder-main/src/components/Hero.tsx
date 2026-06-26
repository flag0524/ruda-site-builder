import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import rudaLogo from "@/assets/ruda-logo.png";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary to-primary/90">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <img 
            src={rudaLogo} 
            alt="RUDA SYSTEMS" 
            className="h-24 md:h-32 object-contain mb-4"
          />
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight">
            Think And Act,<br />In an Independent Way
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
            시스템 통합 전문 기업, 루다시스템즈
          </p>
          
          <p className="text-base md:text-lg text-white/70 max-w-xl">
            비즈니스 플랫폼, 컨설팅 서비스를 통해 새로운 시작을 함께합니다
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 shadow-elegant hover:scale-105 transition-all"
            >
              프로젝트 문의하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm transition-all"
            >
              회사소개서 다운로드
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
