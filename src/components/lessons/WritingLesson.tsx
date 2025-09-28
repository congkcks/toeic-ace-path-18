import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Clock,
  PenTool,
  CheckCircle,
  Target,
  ChevronLeft,
  Send,
  Brain,
  FileText,
  Lightbulb,
  Star,
  TrendingUp
} from "lucide-react";

const WritingLesson = () => {
  const [essay, setEssay] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Writing prompt and criteria
  const writingPrompt = {
    title: "Business Email - Requesting Information",
    instruction: "Write a formal business email (150-200 words) to request information about a product or service. Your email should include:",
    requirements: [
      "A clear subject line",
      "Proper greeting and closing",
      "Specific questions about the product/service",
      "Professional tone throughout",
      "Request for follow-up action"
    ],
    scenario: "You are interested in purchasing software for your company and need more information about pricing, features, and implementation support."
  };

  const handleEssayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setEssay(text);
    
    // Calculate word count (split by whitespace and filter empty strings)
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(text.trim() === "" ? 0 : words.length);
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    setIsAnalyzing(true);
    
    // Simulate AI analysis time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsAnalyzing(false);
    toast({
      title: "Bài viết đã được gửi cho AI!",
      description: "AI đang phân tích bài viết của bạn",
    });

    // Navigate to AI assessment with writing data
    navigate('/ai-assessment', {
      state: {
        lessonType: 'writing',
        score: Math.min(Math.max(Math.round((wordCount / 175) * 100), 0), 100), // Basic scoring based on word count
        userResponse: essay,
        exerciseData: {
          prompt: writingPrompt,
          wordCount,
          timeSpent: timeSpent + "phút",
          lessonTitle: "Business Email Writing",
          difficulty: "Trung bình"
        }
      }
    });
  };

  const getWordCountColor = (count: number) => {
    if (count < 150) return "text-yellow-600";
    if (count > 200) return "text-red-500";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/study-plan')}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Bài tập Viết</h1>
                <p className="text-sm text-muted-foreground">Lesson 3: Business Email Writing</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              <PenTool className="w-3 h-3 mr-1" />
              Writing Practice
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Progress Card */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Số từ đã viết</p>
                  <p className="text-xs text-muted-foreground">{wordCount} từ</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Mục tiêu</p>
                <p className="text-xs text-muted-foreground">150-200 từ</p>
              </div>
            </div>
            <div className="mt-3">
              <Progress value={Math.min((wordCount / 175) * 100, 100)} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Writing Prompt and Guidelines */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  {writingPrompt.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-foreground mb-3">
                    {writingPrompt.instruction}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Yêu cầu:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {writingPrompt.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm text-blue-800 dark:text-blue-200">Tình huống:</h4>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                        {writingPrompt.scenario}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/50 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm text-amber-800 dark:text-amber-200">Tiêu chí đánh giá:</h4>
                      <ul className="text-xs text-amber-700 dark:text-amber-300 mt-1 space-y-1">
                        <li>• Grammar và cấu trúc câu (25%)</li>
                        <li>• Vocabulary và từ vựng phù hợp (25%)</li>
                        <li>• Tổ chức nội dung logic (25%)</li>
                        <li>• Phong cách và tone chuyên nghiệp (25%)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Writing Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Gợi ý viết tốt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <p><strong>Subject:</strong> Be specific and clear about your purpose</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <p><strong>Opening:</strong> Use "Dear [Name]" or "Dear Sir/Madam"</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <p><strong>Body:</strong> State your purpose clearly in the first paragraph</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                    <p><strong>Closing:</strong> Use "Sincerely" or "Best regards"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Writing Area */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <PenTool className="h-5 w-5" />
                  Khu vực viết bài
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Subject: Request for Software Information

Dear Sir/Madam,

I hope this email finds you well. I am writing to inquire about your company's software solutions for business management.

Our company is currently looking for a comprehensive software package that can help streamline our operations. Could you please provide information about:

- Available software packages and their key features
- Pricing options for small to medium-sized businesses
- Implementation support and training services
- Trial or demo availability

We would appreciate the opportunity to discuss our specific requirements with your sales team. Please let me know your availability for a meeting or phone call next week.

Thank you for your time and consideration. I look forward to hearing from you soon.

Best regards,
[Your name]
[Your position]
[Company name]"
                  value={essay}
                  onChange={handleEssayChange}
                  className="min-h-[500px] font-mono text-sm resize-none"
                  disabled={isSubmitted}
                />
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className={`font-medium ${getWordCountColor(wordCount)}`}>
                        {wordCount} từ
                      </span>
                      <span className="text-muted-foreground ml-2">
                        / 150-200 từ
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Thời gian: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                  
                  {!isSubmitted ? (
                    <Button 
                      onClick={handleSubmit}
                      disabled={wordCount < 50}
                      className="min-w-[120px]"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Nộp bài
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            {/* Analysis Progress */}
            {isAnalyzing && (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <Brain className="h-5 w-5 text-primary animate-pulse" />
                      <span className="font-medium">AI đang phân tích bài viết của bạn...</span>
                    </div>
                    <Progress value={65} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      Đang kiểm tra grammar, vocabulary và cấu trúc bài viết
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Completion Message */}
            {isSubmitted && !isAnalyzing && (
              <Card>
                <CardContent className="p-6">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Hoàn thành bài tập viết!</AlertTitle>
                    <AlertDescription>
                      Bài viết của bạn đã được gửi cho AI phân tích. Bạn sẽ nhận được đánh giá chi tiết về grammar, vocabulary và cấu trúc bài viết.
                    </AlertDescription>
                  </Alert>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => navigate('/ai-assessment')}
                      className="flex-1"
                    >
                      Xem đánh giá AI
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/lesson/reading')}
                    >
                      Bài tiếp theo: Reading
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/dashboard')}
                    >
                      Về Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingLesson;