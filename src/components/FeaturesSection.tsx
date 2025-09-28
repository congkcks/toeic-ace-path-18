import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Brain, 
  BarChart3, 
  Users, 
  Clock, 
  Trophy,
  Headphones,
  FileText,
  Target
} from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Ngân hàng đề thi khổng lồ",
    description: "Hơn 10,000 câu hỏi TOEIC thực tế được cập nhật liên tục từ các đề thi chính thức.",
    color: "text-toeic-blue"
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI học tập thông minh",
    description: "Hệ thống AI phân tích điểm yếu và đề xuất lộ trình học tập cá nhân hóa cho từng học viên.",
    color: "text-toeic-success"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Thống kê chi tiết",
    description: "Theo dõi tiến trình học tập, phân tích kết quả và dự đoán điểm số TOEIC chính xác.",
    color: "text-toeic-warning"
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Luyện Listening chuyên sâu",
    description: "Thư viện audio chất lượng cao với nhiều giọng nói khác nhau và tốc độ linh hoạt.",
    color: "text-toeic-blue"
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Reading comprehension",
    description: "Bài tập đọc hiểu từ cơ bản đến nâng cao với kỹ thuật làm bài hiệu quả.",
    color: "text-toeic-success"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Lộ trình cá nhân",
    description: "Đề xuất lộ trình học tập phù hợp với mục tiêu và thời gian của từng học viên.",
    color: "text-toeic-warning"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-toeic-blue/10 text-toeic-blue px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            <span>Tính năng nổi bật</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-toeic-navy mb-4">
            Tại sao chọn TOEIC ACE PATH?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi cung cấp giải pháp học TOEIC toàn diện với công nghệ AI tiên tiến 
            và phương pháp giảng dạy được chứng minh hiệu quả.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 border-0 bg-gradient-feature">
              <CardHeader className="pb-4">
                <div className={`inline-flex w-fit p-3 rounded-xl bg-background/50 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-toeic-navy">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border">
            <h3 className="text-2xl font-bold text-toeic-navy mb-4">
              Sẵn sàng bắt đầu hành trình TOEIC của bạn?
            </h3>
            <p className="text-muted-foreground mb-6">
              Tham gia cùng hàng nghìn học viên đã thành công với TOEIC ACE PATH
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => window.location.href = '/assessment'}
              >
                <Clock className="w-5 h-5 mr-2" />
                Học thử miễn phí
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = '/all-interfaces'}
              >
                <Users className="w-5 h-5 mr-2" />
                Xem tất cả trang
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;