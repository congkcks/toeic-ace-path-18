import { Button } from "@/components/ui/button";
import { Play, Star, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-toeic.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background to-muted overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-toeic-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-toeic-success rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-toeic-blue/10 text-toeic-blue px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                <span>Nền tảng học TOEIC #1 Việt Nam</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-toeic-navy leading-tight">
                Chinh phục 
                <span className="bg-gradient-hero bg-clip-text text-transparent"> TOEIC 990 </span>
                cùng chúng tôi
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Hệ thống học TOEIC thông minh với hơn 10,000 câu hỏi thực tế, AI cá nhân hóa, 
                và phương pháp học tập hiệu quả nhất.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => window.location.href = '/assessment'}
              >
                <Play className="w-5 h-5 mr-2" />
                Bắt đầu học miễn phí
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => window.location.href = '/all-interfaces'}
              >
                Xem demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <Users className="w-5 h-5 text-toeic-blue" />
                  <span className="text-2xl font-bold text-toeic-navy">50K+</span>
                </div>
                <p className="text-sm text-muted-foreground">Học viên</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <Award className="w-5 h-5 text-toeic-success" />
                  <span className="text-2xl font-bold text-toeic-navy">95%</span>
                </div>
                <p className="text-sm text-muted-foreground">Đạt mục tiêu</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <Star className="w-5 h-5 text-toeic-warning" />
                  <span className="text-2xl font-bold text-toeic-navy">4.9</span>
                </div>
                <p className="text-sm text-muted-foreground">Đánh giá</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Học TOEIC hiệu quả" 
                className="w-full h-auto rounded-2xl shadow-hero"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-card p-4 rounded-xl shadow-card z-20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-toeic-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">15,000+ học viên online</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-success p-4 rounded-xl shadow-glow z-20">
              <div className="text-white">
                <div className="text-2xl font-bold">850+</div>
                <div className="text-sm opacity-90">Điểm TOEIC trung bình</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;