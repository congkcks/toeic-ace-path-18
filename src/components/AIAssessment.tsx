import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  CheckCircle, 
  AlertCircle, 
  Star,
  BookOpen,
  Clock,
  Award,
  Lightbulb,
  BarChart3,
  Calendar,
  ArrowRight,
  BookmarkPlus,
  Users,
  Headphones,
  PenTool,
  AlertTriangle
} from "lucide-react";
import PersonalizedRecommendations from "./PersonalizedRecommendations";

interface AIAssessmentProps {
  lessonType?: 'reading' | 'listening' | 'writing' | 'detailed';
  score?: number;
  answers?: any[];
  userResponse?: string;
  exerciseData?: any;
}

const AIAssessment = ({ 
  lessonType = 'reading', 
  score = 75, 
  answers = [], 
  userResponse = '', 
  exerciseData = null 
}: AIAssessmentProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("analysis");
  const [learningData, setLearningData] = useState<any>(null);

  useEffect(() => {
    // Simulate AI analysis of user learning patterns
    const generateLearningInsights = () => {
      const insights = {
        strengths: [],
        weaknesses: [],
        nextSteps: [],
        studyPlan: [],
        motivation: ""
      };

      // AI analysis based on lesson type and performance
      if (lessonType === 'reading') {
        if (score >= 80) {
          insights.strengths = ["Hiểu nhanh ý chính", "Từ vựng business tốt", "Phân tích thông tin chi tiết"];
          insights.weaknesses = ["Tốc độ đọc có thể cải thiện"];
          insights.nextSteps = ["Chuyển sang bài đọc phức tạp hơn", "Luyện đọc skimming và scanning"];
        } else if (score >= 60) {
          insights.strengths = ["Hiểu ý chính cơ bản"];
          insights.weaknesses = ["Từ vựng business", "Chi tiết trong đoạn văn", "Suy luận thông tin"];
          insights.nextSteps = ["Ôn lại từ vựng business", "Luyện tập đọc hiểu thêm"];
        } else {
          insights.weaknesses = ["Từ vựng cơ bản", "Kỹ năng đọc hiểu", "Thời gian làm bài"];
          insights.nextSteps = ["Bắt đầu với bài đọc đơn giản hơn", "Học từ vựng cơ bản"];
        }
      }

      if (lessonType === 'listening') {
        if (score >= 80) {
          insights.strengths = ["Nghe hiểu giọng nói chuẩn", "Phân biệt thông tin quan trọng"];
          insights.weaknesses = ["Có thể cải thiện với giọng địa phương"];
          insights.nextSteps = ["Thử bài nghe với nhiều giọng khác nhau"];
        } else {
          insights.weaknesses = ["Nghe chi tiết", "Từ vựng trong giao tiếp"];
          insights.nextSteps = ["Luyện nghe từ từ", "Học từ vựng giao tiếp"];
        }
      }

      // Generate study plan
      insights.studyPlan = [
        { day: "Thứ 2", focus: "Từ vựng", time: "30 phút" },
        { day: "Thứ 3", focus: "Luyện tập kỹ năng yếu", time: "45 phút" },
        { day: "Thứ 4", focus: "Bài tập thực hành", time: "30 phút" },
        { day: "Thứ 5", focus: "Ôn tập", time: "30 phút" },
        { day: "Thứ 6", focus: "Kiểm tra tiến độ", time: "60 phút" }
      ];

      insights.motivation = score >= 80 ? 
        "Xuất sắc! Bạn đang có tiến bộ rất tốt. Hãy tiếp tục duy trì đà này!" :
        score >= 60 ?
        "Tốt! Bạn đang trên đường đúng. Chỉ cần cố gắng thêm một chút nữa!" :
        "Đừng nản lòng! Mọi người đều có điểm xuất phát khác nhau. Quan trọng là bạn đang tiến bộ!";

      setLearningData(insights);
    };

    generateLearningInsights();
  }, [lessonType, score]);

  const saveToStudyPlan = () => {
    toast({
      title: "Đã lưu vào kế hoạch học!",
      description: "Lời khuyên của AI đã được thêm vào lộ trình học tập của bạn.",
    });
  };

  const getLessonName = () => {
    switch (lessonType) {
      case 'reading': return 'Đọc hiểu';
      case 'listening': return 'Nghe hiểu';
      case 'writing': return 'Viết';
      case 'detailed': return 'Bài tập tổng hợp';
      default: return 'Bài học';
    }
  };

  const getLessonIcon = () => {
    switch (lessonType) {
      case 'reading': return <BookOpen className="h-5 w-5" />;
      case 'listening': return <Headphones className="h-5 w-5" />;
      case 'writing': return <PenTool className="h-5 w-5" />;
      case 'detailed': return <Brain className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  const getScoreColor = () => {
    if (score >= 80) return 'text-toeic-success';
    if (score >= 60) return 'text-toeic-blue';
    return 'text-toeic-warning';
  };

  const getScoreBadge = () => {
    if (score >= 80) return { text: 'Xuất sắc', color: 'bg-toeic-success' };
    if (score >= 60) return { text: 'Tốt', color: 'bg-toeic-blue' };
    if (score >= 40) return { text: 'Trung bình', color: 'bg-toeic-warning' };
    return { text: 'Cần cải thiện', color: 'bg-red-500' };
  };

  const scoreBadge = getScoreBadge();

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-toeic-blue/10 to-toeic-success/10 border-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                <Brain className="h-8 w-8 text-toeic-blue" />
              </div>
              <div>
                <CardTitle className="text-2xl text-toeic-navy">
                  AI Đánh Giá Chi Tiết
                </CardTitle>
                <CardDescription className="text-lg">
                  {getLessonName()} - Phân tích thông minh và lời khuyên cá nhân hóa
                </CardDescription>
              </div>
            </div>
            <Badge className={`${scoreBadge.color} text-white text-lg px-4 py-2`}>
              {scoreBadge.text}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className={`text-4xl font-bold ${getScoreColor()} mb-2`}>
                {score}%
              </div>
              <p className="text-sm text-muted-foreground">Điểm số của bạn</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-toeic-blue mb-2">
                {answers ? answers.filter(a => a.isCorrect).length : 0}/{answers ? answers.length : 0}
              </div>
              <p className="text-sm text-muted-foreground">Câu trả lời đúng</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-lg font-bold text-toeic-success mb-2">
                +15%
              </div>
              <p className="text-sm text-muted-foreground">Cải thiện dự kiến</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-sm font-bold text-toeic-warning mb-2">
                Trung bình
              </div>
              <p className="text-sm text-muted-foreground">So với học viên khác</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Phân tích
          </TabsTrigger>
          <TabsTrigger value="advice" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Lời khuyên
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Hiệu suất
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Mẹo hay
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-toeic-navy flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-toeic-success" />
                  Điểm mạnh
                </CardTitle>
                <CardDescription>
                  Những kỹ năng bạn đã thành thạo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {learningData?.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-toeic-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-toeic-navy flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-toeic-warning" />
                  Khu vực cần cải thiện
                </CardTitle>
                <CardDescription>
                  Tập trung vào những điểm này để tiến bộ nhanh hơn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {learningData?.weaknesses.map((weakness: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <AlertTriangle className="w-4 h-4 text-toeic-warning mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-toeic-navy">Phân tích chi tiết</CardTitle>
              <CardDescription>
                AI phân tích từng khía cạnh trong bài làm của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Quản lý thời gian</span>
                    <Badge variant="outline">8/10</Badge>
                  </div>
                  <Progress value={80} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Bạn quản lý thời gian rất tốt, hoàn thành bài trong thời gian hợp lý
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Độ chính xác</span>
                    <Badge variant="outline">{Math.round(score/10)}/10</Badge>
                  </div>
                  <Progress value={score} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Tỷ lệ chính xác {score >= 70 ? 'tốt' : 'cần cải thiện'}, {score >= 70 ? 'hãy tiếp tục duy trì' : 'tập trung ôn luyện thêm'}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Chiến lược làm bài</span>
                    <Badge variant="outline">6/10</Badge>
                  </div>
                  <Progress value={60} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Cần áp dụng chiến lược làm bài hiệu quả hơn để nâng cao điểm số
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advice" className="space-y-6">
          {learningData && (
            <PersonalizedRecommendations 
              score={score}
              lessonType={lessonType}
              weaknesses={learningData.weaknesses}
              strengths={learningData.strengths}
              studyPlan={learningData.studyPlan}
            />
          )}
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-toeic-navy">So sánh với trung bình</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Điểm của bạn</span>
                    <span className="font-bold text-toeic-blue">{score}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trung bình lớp</span>
                    <span className="font-bold text-muted-foreground">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Điểm cao nhất</span>
                    <span className="font-bold text-toeic-success">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-toeic-navy">Tiến bộ theo thời gian</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-toeic-success">+{score > 65 ? '12' : '5'}%</div>
                    <p className="text-sm text-muted-foreground">So với lần trước</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <div className="font-medium">Lần 1</div>
                      <div className="text-muted-foreground">55%</div>
                    </div>
                    <div>
                      <div className="font-medium">Lần 2</div>
                      <div className="text-muted-foreground">63%</div>
                    </div>
                    <div>
                      <div className="font-medium">Hôm nay</div>
                      <div className="text-toeic-blue font-bold">{score}%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-toeic-navy flex items-center">
                <Star className="w-5 h-5 mr-2 text-toeic-warning" />
                Mẹo học tập hiệu quả
              </CardTitle>
              <CardDescription>
                Những chiến lược được AI đề xuất dành riêng cho bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="p-4 bg-gradient-to-r from-toeic-blue/10 to-transparent rounded-lg border">
                  <h4 className="font-medium text-toeic-navy mb-2">Kỹ thuật đọc hiểu</h4>
                  <p className="text-sm text-muted-foreground">
                    Đọc tiêu đề và câu hỏi trước khi đọc đoạn văn để định hướng tìm kiếm thông tin
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-toeic-success/10 to-transparent rounded-lg border">
                  <h4 className="font-medium text-toeic-navy mb-2">Quản lý thời gian</h4>
                  <p className="text-sm text-muted-foreground">
                    Dành 2 phút đọc lướt toàn bộ bài, sau đó tập trung vào từng câu hỏi
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-toeic-warning/10 to-transparent rounded-lg border">
                  <h4 className="font-medium text-toeic-navy mb-2">Từ vựng chiến lược</h4>
                  <p className="text-sm text-muted-foreground">
                    Gạch chân các từ khóa trong câu hỏi và tìm từ đồng nghĩa trong đoạn văn
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-100 to-transparent rounded-lg border">
                  <h4 className="font-medium text-toeic-navy mb-2">Luyện tập hàng ngày</h4>
                  <p className="text-sm text-muted-foreground">
                    Dành 30 phút mỗi ngày để đọc các email, thông báo tiếng Anh trong công việc
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motivational Message */}
          <Card className="bg-gradient-to-r from-toeic-blue/10 to-toeic-success/10 border-none">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <Star className="w-8 h-8 mx-auto text-toeic-warning" />
                <h3 className="font-semibold text-toeic-navy">Lời động viên từ AI</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {learningData?.motivation}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Button onClick={saveToStudyPlan} variant="outline">
              <BookmarkPlus className="w-4 h-4 mr-2" />
              Lưu vào kế hoạch
            </Button>
            <Button onClick={() => navigate('/study-plan')} variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Xem lộ trình học
            </Button>
            <Button onClick={() => navigate('/')} variant="hero">
              <BookOpen className="w-4 h-4 mr-2" />
              Tiếp tục học
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssessment;