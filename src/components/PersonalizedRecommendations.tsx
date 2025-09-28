import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Clock, 
  BookOpen, 
  TrendingUp, 
  Star,
  Calendar,
  ArrowRight,
  CheckCircle
} from "lucide-react";

interface PersonalizedRecommendationsProps {
  score: number;
  lessonType: string;
  weaknesses: string[];
  strengths: string[];
  studyPlan: Array<{day: string, focus: string, time: string}>;
}

const PersonalizedRecommendations = ({ 
  score, 
  lessonType, 
  weaknesses, 
  strengths, 
  studyPlan 
}: PersonalizedRecommendationsProps) => {
  
  const getRecommendedLessons = () => {
    const recommendations = [];
    
    if (lessonType === 'reading' && score < 70) {
      recommendations.push({
        title: "Từ vựng Business cơ bản",
        type: "Vocabulary",
        time: "20 phút",
        difficulty: "Dễ",
        priority: "Cao"
      });
      recommendations.push({
        title: "Kỹ thuật đọc hiểu nhanh",
        type: "Reading Strategy", 
        time: "30 phút",
        difficulty: "Trung bình",
        priority: "Cao"
      });
    }
    
    if (lessonType === 'listening' && score < 70) {
      recommendations.push({
        title: "Luyện nghe giọng chuẩn",
        type: "Listening",
        time: "25 phút", 
        difficulty: "Dễ",
        priority: "Cao"
      });
      recommendations.push({
        title: "Từ vựng giao tiếp điện thoại",
        type: "Vocabulary",
        time: "15 phút",
        difficulty: "Dễ", 
        priority: "Trung bình"
      });
    }

    if (score >= 80) {
      recommendations.push({
        title: "Bài tập nâng cao",
        type: "Advanced",
        time: "45 phút",
        difficulty: "Khó",
        priority: "Trung bình"
      });
    }

    return recommendations;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Cao": return "bg-red-100 text-red-800";
      case "Trung bình": return "bg-yellow-100 text-yellow-800";
      case "Thấp": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ": return "bg-green-100 text-green-800";
      case "Trung bình": return "bg-yellow-100 text-yellow-800";
      case "Khó": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Learning Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-toeic-navy">
            <Target className="w-5 h-5 mr-2" />
            Tiến độ học tập
          </CardTitle>
          <CardDescription>
            Dựa trên hiệu suất hiện tại của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Mục tiêu TOEIC 300 điểm</span>
              <span className="font-medium">{Math.min(score * 3, 300)}/300</span>
            </div>
            <Progress value={(Math.min(score * 3, 300) / 300) * 100} className="h-3" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-toeic-success">{strengths.length}</div>
              <div className="text-xs text-muted-foreground">Điểm mạnh</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-toeic-warning">{weaknesses.length}</div>
              <div className="text-xs text-muted-foreground">Cần cải thiện</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-toeic-blue">{studyPlan.length}</div>
              <div className="text-xs text-muted-foreground">Ngày học/tuần</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Next Lessons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-toeic-navy">
            <BookOpen className="w-5 h-5 mr-2" />
            Bài học được đề xuất
          </CardTitle>
          <CardDescription>
            AI đề xuất những bài học phù hợp với trình độ của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getRecommendedLessons().map((lesson, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-toeic-navy">{lesson.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{lesson.type}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{lesson.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getPriorityColor(lesson.priority)} variant="secondary">
                      {lesson.priority}
                    </Badge>
                    <Badge className={getDifficultyColor(lesson.difficulty)} variant="secondary">
                      {lesson.difficulty}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  <ArrowRight className="w-3 h-3 mr-1" />
                  Bắt đầu học
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Study Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-toeic-navy">
            <Calendar className="w-5 h-5 mr-2" />
            Kế hoạch học tuần này
          </CardTitle>
          <CardDescription>
            Lộ trình được cá nhân hóa dựa trên điểm yếu của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {studyPlan.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-toeic-blue/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-toeic-blue" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{day.day}</div>
                    <div className="text-xs text-muted-foreground">{day.focus}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {day.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Motivational Message */}
      <Card className="bg-gradient-to-r from-toeic-blue/10 to-toeic-success/10">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <Star className="w-8 h-8 mx-auto text-toeic-warning" />
            <h3 className="font-semibold text-toeic-navy">Lời động viên từ AI</h3>
            <p className="text-sm text-muted-foreground">
              {score >= 80 ? 
                "Xuất sắc! Bạn đang có tiến bộ rất tốt. Hãy tiếp tục duy trì đà này và thử thách bản thân với những bài tập khó hơn!" :
                score >= 60 ?
                "Tốt lắm! Bạn đang trên đường đúng. Chỉ cần kiên trì và tập trung vào những điểm cần cải thiện!" :
                "Đừng nản lòng! Mọi chuyên gia đều bắt đầu từ những bước đầu tiên. Quan trọng là bạn không bỏ cuộc!"
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedRecommendations;