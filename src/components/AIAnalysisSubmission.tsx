import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Brain, Clock, CheckCircle, AlertCircle, TrendingUp, Target } from "lucide-react";

interface AIAnalysisSubmissionProps {
  lessonType: 'reading' | 'listening' | 'writing' | 'detailed';
  score: number;
  answers: any[];
  userResponse?: string;
  exerciseData?: any;
}

const AIAnalysisSubmission = ({ 
  lessonType, 
  score,
  answers, 
  userResponse,
  exerciseData 
}: AIAnalysisSubmissionProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmitForAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate AI analysis process
    const stages = [
      { stage: 'Đang phân tích câu trả lời...', progress: 20 },
      { stage: 'Đang đánh giá độ chính xác...', progress: 40 },
      { stage: 'Đang phân tích điểm mạnh và điểm yếu...', progress: 60 },
      { stage: 'Đang tạo lời khuyên cá nhân hóa...', progress: 80 },
      { stage: 'Hoàn tất phân tích!', progress: 100 }
    ];

    for (const { stage, progress } of stages) {
      setAnalysisStage(stage);
      setAnalysisProgress(progress);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Calculate mock score based on answers
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    const totalQuestions = answers.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Navigate to AI assessment page with results
    navigate('/ai-assessment', {
      state: {
        lessonType,
        score,
        answers,
        userResponse,
        exerciseData
      }
    });

    toast({
      title: "Phân tích hoàn tất!",
      description: "AI đã hoàn thành phân tích kết quả của bạn.",
    });
  };

  const calculateScore = () => {
    if (!answers || answers.length === 0) return 0;
    const correctAnswers = answers.filter(answer => answer.isCorrect).length;
    return Math.round((correctAnswers / answers.length) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getLessonTypeDisplay = (type: string) => {
    switch (type) {
      case 'reading': return 'Đọc hiểu';
      case 'listening': return 'Nghe hiểu';
      case 'writing': return 'Viết';
      case 'detailed': return 'Bài tập tổng hợp';
      default: return 'Bài học';
    }
  };

  if (isAnalyzing) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <CardTitle className="text-2xl">AI đang phân tích kết quả</CardTitle>
          <CardDescription>
            Vui lòng đợi trong giây lát để AI phân tích chi tiết bài làm của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{analysisStage}</span>
              <span className="text-primary font-medium">{analysisProgress}%</span>
            </div>
            <Progress value={analysisProgress} className="w-full" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-muted/50 rounded-lg">
              <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-muted-foreground">Độ chính xác</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-muted-foreground">Tiến bộ</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-muted-foreground">Lời khuyên</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Hoàn thành bài học</CardTitle>
        <CardDescription>
          Gửi kết quả cho AI phân tích và nhận đánh giá chi tiết
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Lesson Summary */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Tóm tắt bài học</h3>
            <Badge variant="outline">{getLessonTypeDisplay(lessonType)}</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Câu đúng: {answers.filter(a => a.isCorrect).length}/{answers.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span>Câu sai: {answers.filter(a => !a.isCorrect).length}/{answers.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              <span className={getScoreColor(calculateScore())}>
                Điểm số: {calculateScore()}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Thời gian: ~15 phút</span>
            </div>
          </div>
        </div>

        {/* What AI will analyze */}
        <div className="space-y-3">
          <h3 className="font-semibold">AI sẽ phân tích:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Độ chính xác và tỷ lệ đúng/sai
            </li>
            <li className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Điểm mạnh và khu vực cần cải thiện
            </li>
            <li className="flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-600" />
              Lời khuyên cá nhân hóa cho bài học tiếp theo
            </li>
            <li className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-orange-600" />
              Chiến lược học tập hiệu quả
            </li>
          </ul>
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmitForAnalysis}
          className="w-full"
          size="lg"
        >
          <Brain className="h-5 w-5 mr-2" />
          Gửi cho AI phân tích
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Quá trình phân tích sẽ mất khoảng 30 giây
        </p>
      </CardContent>
    </Card>
  );
};

export default AIAnalysisSubmission;