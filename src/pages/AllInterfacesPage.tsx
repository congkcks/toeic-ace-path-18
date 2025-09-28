import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserFlowGuide from "@/components/UserFlowGuide";
import { 
  Home,
  BookOpen,
  Headphones,
  PenTool,
  FileText,
  Target,
  Calendar,
  Settings,
  Users,
  BarChart,
  Brain,
  Zap,
  GraduationCap,
  Clock,
  Award,
  Eye,
  Gamepad2,
  Volume2,
  MessageCircle,
  Trophy,
  Mic
} from "lucide-react";

const AllInterfacesPage = () => {
  const navigate = useNavigate();

  const interfaces = [
    // Main Pages
    {
      category: "Trang chính",
      items: [
        {
          title: "Trang chủ",
          description: "Landing page với hero section, features và testimonials",
          path: "/",
          icon: Home,
          badge: "Main",
          color: "bg-blue-500"
        },
        {
          title: "Dashboard",
          description: "Bảng điều khiển học tập với thống kê và tiến trình",
          path: "/dashboard",
          icon: BarChart,
          badge: "Dashboard",
          color: "bg-green-500"
        },
        {
          title: "Lộ trình học tập",
          description: "Kế hoạch học theo cấp độ, lịch 25 ngày và calendar",
          path: "/study-plan",
          icon: GraduationCap,
          badge: "Planning",
          color: "bg-purple-500"
        }
      ]
    },
    // Learning Lessons
    {
      category: "Bài học",
      items: [
        {
          title: "Bài đọc hiểu",
          description: "Reading comprehension với đoạn văn business và câu hỏi trắc nghiệm",
          path: "/lesson/reading",
          icon: BookOpen,
          badge: "Reading",
          color: "bg-emerald-500"
        },
        {
          title: "Bài luyện nghe",
          description: "Listening practice với video, audio controls và câu hỏi",
          path: "/lesson/listening",
          icon: Headphones,
          badge: "Listening",
          color: "bg-orange-500"
        },
        {
          title: "Bài tập viết",
          description: "Writing practice với business email và đánh giá AI",
          path: "/lesson/writing",
          icon: PenTool,
          badge: "Writing",
          color: "bg-red-500"
        },
        {
          title: "Bài học chi tiết",
          description: "Detailed lesson với nhiều phần tương tác",
          path: "/detailed-lesson",
          icon: FileText,
          badge: "Detailed",
          color: "bg-indigo-500"
        },
        {
          title: "Luyện giao tiếp với AI",
          description: "Chat với AI assistant theo các chủ đề khác nhau",
          path: "/lesson/conversation",
          icon: MessageCircle,
          badge: "Conversation",
          color: "bg-blue-500"
        }
      ]
    },
    // Assessment & AI
    {
      category: "Đánh giá & AI",
      items: [
        {
          title: "Bài kiểm tra đầu vào",
          description: "Assessment quiz để xác định level hiện tại",
          path: "/assessment",
          icon: Target,
          badge: "Assessment",
          color: "bg-yellow-500"
        },
        {
          title: "AI Assessment",
          description: "Đánh giá chi tiết từ AI với analysis và recommendations",
          path: "/ai-assessment",
          icon: Brain,
          badge: "AI",
          color: "bg-cyan-500"
        },
        {
          title: "AI Analysis",
          description: "Phân tích kết quả học tập bằng AI",
          path: "/ai-analysis",
          icon: Zap,
          badge: "Analysis",
          color: "bg-pink-500"
        }
      ]
    },
    // Modern Learning Features
    {
      category: "Tính năng học hiện đại",
      items: [
        {
          title: "Truyện tương tác",
          description: "Học tiếng Anh qua các câu chuyện kinh doanh với lựa chọn",
          path: "/interactive-story",
          icon: BookOpen,
          badge: "Interactive",
          color: "bg-emerald-600"
        },
        {
          title: "Xây dựng từ vựng",
          description: "Luyện từ vựng với spaced repetition và AI feedback",
          path: "/vocabulary-builder",
          icon: Brain,
          badge: "Vocabulary",
          color: "bg-purple-600"
        },
        {
          title: "Luyện phát âm",
          description: "Cải thiện phát âm với AI speech recognition",
          path: "/pronunciation-practice",
          icon: Volume2,
          badge: "Pronunciation",
          color: "bg-pink-600"
        },
        {
          title: "Game ngữ pháp",
          description: "Học ngữ pháp qua game thử thách với timer",
          path: "/grammar-game",
          icon: Gamepad2,
          badge: "Grammar Game",
          color: "bg-orange-600"
        },
        {
          title: "Thách thức Speaking",
          description: "Thi đấu speaking với leaderboard và challenges",
          path: "/speaking-challenge",
          icon: Mic,
          badge: "Speaking Arena",
          color: "bg-red-600"
        }
      ]
    },
    // Admin
    {
      category: "Quản trị",
      items: [
        {
          title: "Admin Dashboard",
          description: "Trang quản trị với quản lý users, content, analytics và settings",
          path: "/admin",
          icon: Settings,
          badge: "Admin",
          color: "bg-gray-600"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Tất cả giao diện trang web
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Khám phá tất cả các trang và chức năng đã được xây dựng trong hệ thống học TOEIC
          </p>
        </div>

        {/* Interface Categories */}
        <div className="space-y-12">
          {interfaces.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  {category.category}
                </h2>
                <Badge variant="outline" className="text-xs">
                  {category.items.length} trang
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, index) => (
                  <Card 
                    key={index}
                    className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center`}>
                            <item.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                              {item.title}
                            </CardTitle>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                          {item.path}
                        </code>
                        <Button
                          onClick={() => navigate(item.path)}
                          size="sm"
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          Xem
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {interfaces.reduce((total, category) => total + category.items.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Tổng số trang</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5</div>
              <div className="text-sm text-muted-foreground">Loại bài học</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">8</div>
              <div className="text-sm text-muted-foreground">Tính năng hiện đại</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1</div>
              <div className="text-sm text-muted-foreground">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* User Flow Guide */}
        <div className="mt-16">
          <UserFlowGuide />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllInterfacesPage;