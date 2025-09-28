import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Nguyễn Minh Anh",
    role: "Sinh viên ĐH Ngoại Thương",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4fd?w=100&h=100&fit=crop&crop=face",
    score: "860",
    previousScore: "540",
    content: "Từ 540 lên 860 điểm chỉ trong 3 tháng! Hệ thống AI của TOEIC ACE PATH đã giúp tôi xác định chính xác điểm yếu và tập trung luyện tập hiệu quả. Cảm ơn đội ngũ rất nhiều!",
    rating: 5
  },
  {
    name: "Trần Văn Hùng",
    role: "Nhân viên IT tại Vietcombank",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    score: "795",
    previousScore: "450",
    content: "Là người đi làm nên thời gian học rất hạn chế. TOEIC ACE PATH với lộ trình cá nhân hóa và luyện tập linh hoạt đã giúp tôi tối ưu thời gian và đạt mục tiêu 800+ điểm.",
    rating: 5
  },
  {
    name: "Lê Thị Mai",
    role: "Giảng viên ĐH Bách Khoa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    score: "920",
    previousScore: "720",
    content: "Tôi đã thử nhiều phương pháp học TOEIC khác nhau nhưng chưa platform nào có hệ thống câu hỏi phong phú và chất lượng như TOEIC ACE PATH. Đặc biệt là phần Listening rất xuất sắc!",
    rating: 5
  },
  {
    name: "Phạm Đức Thắng",
    role: "Du học sinh tại Hàn Quốc",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    score: "885",
    previousScore: "620",
    content: "Học TOEIC để chuẩn bị du học, tôi cần điểm số cao trong thời gian ngắn. Mock test và feedback chi tiết của platform đã giúp tôi cải thiện nhanh chóng và đạt được mục tiêu.",
    rating: 5
  },
  {
    name: "Võ Thị Lan",
    role: "Marketing Manager",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    score: "745",
    previousScore: "380",
    content: "Từ một người hoàn toàn yếu tiếng Anh, tôi không tin mình có thể đạt 745 điểm TOEIC. Cảm ơn TOEIC ACE PATH đã giúp tôi xây dựng nền tảng vững chắc và tự tin hơn với tiếng Anh.",
    rating: 5
  },
  {
    name: "Ngô Minh Tuấn",
    role: "Kỹ sư phần mềm",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face",
    score: "850",
    previousScore: "590",
    content: "Giao diện thân thiện, nội dung chất lượng và đặc biệt là có thể học mọi lúc mọi nơi. Platform này thực sự phù hợp với lối sống hiện đại và nhu cầu học tập linh hoạt.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-toeic-success/10 text-toeic-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            <span>Câu chuyện thành công</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-toeic-navy mb-4">
            Học viên nói gì về chúng tôi?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hàng nghìn học viên đã thành công với TOEIC ACE PATH. 
            Đây là những câu chuyện truyền cảm hứng từ cộng đồng của chúng tôi.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm relative overflow-hidden">
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-8 h-8 text-toeic-blue" />
              </div>

              <CardContent className="p-6 space-y-4">
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-toeic-warning text-toeic-warning" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Score Improvement */}
                <div className="bg-gradient-success/10 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Trước</div>
                      <div className="text-xl font-bold text-foreground">{testimonial.previousScore}</div>
                    </div>
                    <div className="text-toeic-success">→</div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Sau</div>
                      <div className="text-xl font-bold text-toeic-success">{testimonial.score}</div>
                    </div>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-3 pt-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-toeic-blue text-white">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-toeic-navy">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-bold text-toeic-navy mb-2">50,000+</div>
            <div className="text-sm text-muted-foreground">Học viên tin tưởng</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-toeic-success mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Đạt mục tiêu điểm số</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-toeic-warning mb-2">850+</div>
            <div className="text-sm text-muted-foreground">Điểm trung bình</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-toeic-blue mb-2">4.9/5</div>
            <div className="text-sm text-muted-foreground">Đánh giá từ học viên</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;