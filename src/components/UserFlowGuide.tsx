import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  PlayCircle,
  Target,
  BookOpen,
  Brain,
  BarChart3,
  Trophy,
  CheckCircle,
  Zap,
  Users,
  Settings
} from "lucide-react";

const UserFlowGuide = () => {
  const navigate = useNavigate();

  const userJourney = [
    {
      step: 1,
      title: "Khám phá trang chủ",
      description: "Tìm hiểu về TOEIC ACE PATH và các tính năng nổi bật",
      icon: PlayCircle,
      path: "/",
      color: "bg-blue-500",
      actions: ["Xem demo", "Tìm hiểu tính năng"]
    },
    {
      step: 2,
      title: "Đánh giá trình độ",
      description: "Làm quiz để xác định level hiện tại và nhận lộ trình phù hợp",
      icon: Target,
      path: "/assessment",
      color: "bg-yellow-500",
      actions: ["Làm quiz", "Nhận kết quả phân tích"]
    },
    {
      step: 3,
      title: "Xem lộ trình học tập",
      description: "Khám phá lộ trình được cá nhân hóa theo cấp độ và thời gian",
      icon: BookOpen,
      path: "/study-plan",
      color: "bg-purple-500",
      actions: ["Xem lộ trình cấp độ", "Lịch 25 ngày", "Calendar học tập"]
    },
    {
      step: 4,
      title: "Truy cập Dashboard",
      description: "Theo dõi tiến trình, thống kê và thành tích học tập",
      icon: BarChart3,
      path: "/dashboard",
      color: "bg-green-500",
      actions: ["Xem tiến trình", "Thống kê chi tiết", "Mục tiêu cá nhân"]
    },
    {
      step: 5,
      title: "Học các bài lesson",
      description: "Thực hành Reading, Listening, Writing với bài tập thực tế",
      icon: BookOpen,
      path: "/lesson/reading",
      color: "bg-emerald-500",
      actions: ["Reading comprehension", "Listening practice", "Writing exercises"]
    },
    {
      step: 6,
      title: "Nhận phân tích AI",
      description: "AI đánh giá chi tiết kết quả và đưa ra khuyến nghị cải thiện",
      icon: Brain,
      path: "/ai-assessment",
      color: "bg-cyan-500",
      actions: ["Phân tích chi tiết", "Khuyến nghị cải thiện", "Roadmap tiếp theo"]
    }
  ];

  const adminFeatures = [
    {
      title: "Quản lý người dùng",
      description: "Tạo, sửa, xóa và theo dõi tiến trình của học viên",
      icon: Users,
      color: "bg-blue-600"
    },
    {
      title: "Quản lý nội dung",
      description: "Tạo và chỉnh sửa bài học, quiz và tài liệu học tập",
      icon: BookOpen,
      color: "bg-green-600"
    },
    {
      title: "Analytics & Reports",
      description: "Thống kê chi tiết về hiệu suất học tập và hệ thống",
      icon: BarChart3,
      color: "bg-purple-600"
    },
    {
      title: "Cài đặt hệ thống",
      description: "Quản lý cấu hình, notifications và tùy chỉnh hệ thống",
      icon: Settings,
      color: "bg-red-600"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Main User Journey */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Hành trình học TOEIC hoàn chỉnh
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Từ người mới bắt đầu đến chinh phục 990 điểm TOEIC, đây là lộ trình đầy đủ được thiết kế khoa học
          </p>
        </div>

        <div className="space-y-6">
          {userJourney.map((step, index) => (
            <Card key={step.step} className="group hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {/* Step Number & Icon */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-12 h-12 rounded-lg ${step.color} flex items-center justify-center text-white font-bold`}>
                      {step.step}
                    </div>
                    <div className={`w-10 h-10 rounded-lg ${step.color}/20 flex items-center justify-center`}>
                      <step.icon className={`h-5 w-5 ${step.color.replace('bg-', 'text-')}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {step.description}
                        </p>
                      </div>
                      <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                        {step.path}
                      </code>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {step.actions.map((action, actionIndex) => (
                        <Badge key={actionIndex} variant="secondary" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      onClick={() => navigate(step.path)}
                      variant="outline"
                      size="sm"
                      className="group-hover:border-primary group-hover:text-primary transition-colors"
                    >
                      Trải nghiệm ngay
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  {/* Arrow to next step */}
                  {index < userJourney.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center w-8">
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Success Flow */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Quy trình học tập hiệu quả
          </h3>
          <p className="text-muted-foreground">
            Chu trình học tập được tối ưu để đạt kết quả cao nhất
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-medium text-foreground">Học bài</h4>
            <p className="text-xs text-muted-foreground">Thực hành với nội dung chất lượng</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-medium text-foreground">AI phân tích</h4>
            <p className="text-xs text-muted-foreground">Nhận feedback chi tiết</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-medium text-foreground">Cải thiện</h4>
            <p className="text-xs text-muted-foreground">Luyện tập điểm yếu</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-medium text-foreground">Tiến bộ</h4>
            <p className="text-xs text-muted-foreground">Đạt mục tiêu cao hơn</p>
          </div>
        </div>
      </div>

      {/* Admin Features */}
      <div>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Hệ thống quản trị
          </h3>
          <p className="text-muted-foreground">
            Dashboard quản trị toàn diện cho giảng viên và quản lý
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminFeatures.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mx-auto mb-2`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('/admin')}
            variant="outline"
            size="lg"
          >
            <Settings className="w-5 h-5 mr-2" />
            Truy cập Admin Dashboard
          </Button>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-4 text-center">
          Điều hướng nhanh
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            Trang chủ
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/assessment')}>
            Đánh giá
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/study-plan')}>
            Lộ trình
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserFlowGuide;