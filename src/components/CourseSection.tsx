import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Users, 
  Star, 
  Play,
  Headphones,
  FileText,
  BarChart3,
  CheckCircle
} from "lucide-react";

const courses = [
  {
    title: "TOEIC Listening Mastery",
    description: "Chinh phục phần Listening với 495 điểm tuyệt đối",
    level: "Tất cả cấp độ",
    duration: "8 tuần",
    students: "12,543",
    rating: "4.9",
    price: "599,000₫",
    originalPrice: "999,000₫",
    icon: <Headphones className="w-6 h-6" />,
    color: "bg-toeic-blue",
    features: [
      "500+ câu hỏi Listening thực tế",
      "Kỹ thuật nghe hiệu quả",
      "Luyện tập với nhiều giọng nói",
      "Feedback chi tiết từ AI"
    ]
  },
  {
    title: "TOEIC Reading Excellence",
    description: "Đạt điểm tối đa phần Reading với phương pháp khoa học",
    level: "Trung cấp - Nâng cao",
    duration: "10 tuần", 
    students: "9,847",
    rating: "4.8",
    price: "699,000₫",
    originalPrice: "1,199,000₫",
    icon: <FileText className="w-6 h-6" />,
    color: "bg-toeic-success",
    features: [
      "1000+ câu hỏi Reading đa dạng",
      "Chiến lược làm bài nhanh",
      "Grammar & Vocabulary chuyên sâu",
      "Mock test hàng tuần"
    ]
  },
  {
    title: "TOEIC Complete 990",
    description: "Khóa học toàn diện từ 0 đến 990 điểm TOEIC",
    level: "Mọi cấp độ",
    duration: "16 tuần",
    students: "25,691",
    rating: "4.9",
    price: "1,299,000₫",
    originalPrice: "2,199,000₫",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "bg-gradient-hero",
    features: [
      "Chương trình học cá nhân hóa",
      "Listening + Reading + Vocabulary",
      "20+ đề thi thử chính thức",
      "Hỗ trợ 1-1 với giảng viên"
    ],
    popular: true
  }
];

const CourseSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-toeic-success/10 text-toeic-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Play className="w-4 h-4" />
            <span>Khóa học nổi bật</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-toeic-navy mb-4">
            Chọn khóa học phù hợp với bạn
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Các khóa học được thiết kế bởi chuyên gia, phù hợp với mọi trình độ 
            từ người mới bắt đầu đến muốn đạt điểm cao.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className={`group hover:shadow-hero transition-all duration-300 border-0 relative overflow-hidden ${course.popular ? 'ring-2 ring-toeic-blue' : ''}`}>
              {course.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-toeic-warning text-white">Phổ biến nhất</Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`inline-flex p-3 rounded-xl text-white ${course.color}`}>
                    {course.icon}
                  </div>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <CardTitle className="text-xl text-toeic-navy group-hover:text-toeic-blue transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-toeic-warning text-toeic-warning" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {course.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-toeic-success" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-toeic-navy">{course.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{course.originalPrice}</span>
                </div>
              </CardContent>

              <CardFooter className="pt-4">
                <Button 
                  variant={course.popular ? "hero" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Đăng ký ngay
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Không chắc chắn khóa học nào phù hợp? Hãy thử nghiệm miễn phí!
          </p>
          <Button variant="outline" size="lg">
            Làm bài test trình độ miễn phí
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;