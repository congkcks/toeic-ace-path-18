import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock,
  CheckCircle,
  ChevronRight,
  Target,
  Brain,
  Headphones,
  FileText,
  Play
} from "lucide-react";

const quizQuestions = [
  {
    id: 1,
    type: "listening",
    question: "What is the man doing?",
    options: [
      "He is making a phone call",
      "He is reading a document", 
      "He is writing a report",
      "He is giving a presentation"
    ],
    correct: 0
  },
  {
    id: 2,
    type: "reading",
    question: "Choose the correct word to complete the sentence: The meeting has been _____ until next week.",
    options: [
      "postponed",
      "advanced", 
      "cancelled",
      "scheduled"
    ],
    correct: 0
  },
  {
    id: 3,
    type: "vocabulary",
    question: "What does 'budget' mean in a business context?",
    options: [
      "A financial plan",
      "A meeting room",
      "A computer program", 
      "An employee"
    ],
    correct: 0
  }
];

const AssessmentQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correct) {
        correct++;
      }
    });
    return Math.round((correct / quizQuestions.length) * 100);
  };

  const getRecommendedPath = (score: number) => {
    if (score >= 80) return { level: "Nâng cao", path: "Advanced Path", color: "bg-toeic-success" };
    if (score >= 60) return { level: "Trung cấp", path: "Intermediate Path", color: "bg-toeic-blue" };
    return { level: "Cơ bản", path: "Beginner Path", color: "bg-toeic-warning" };
  };

  if (showResults) {
    const score = calculateScore();
    const recommendation = getRecommendedPath(score);
    
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-toeic-success/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-toeic-success" />
              </div>
              <CardTitle className="text-2xl text-toeic-navy">
                Hoàn thành đánh giá trình độ!
              </CardTitle>
              <CardDescription>
                Dựa trên kết quả của bạn, chúng tôi đã tạo lộ trình học phù hợp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-toeic-blue mb-2">{score}%</div>
                    <p className="text-sm text-muted-foreground">Điểm số đánh giá</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Badge className={recommendation.color}>{recommendation.level}</Badge>
                    <p className="text-sm text-muted-foreground mt-2">Trình độ hiện tại</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-lg font-semibold text-toeic-navy mb-2">{recommendation.path}</div>
                    <p className="text-sm text-muted-foreground">Lộ trình được đề xuất</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-toeic-navy">Phân tích chi tiết:</h3>
                <div className="grid md:grid-cols-3 gap-4 text-left">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Headphones className="w-4 h-4 text-toeic-blue" />
                      <span className="font-medium">Listening</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground">Khá tốt - Cần luyện thêm</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-toeic-success" />
                      <span className="font-medium">Reading</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground">Tốt - Duy trì phong độ</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-toeic-warning" />
                      <span className="font-medium">Vocabulary</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <p className="text-xs text-muted-foreground">Cần cải thiện</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Bắt đầu lộ trình học
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = '/study-plan'}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Xem chi tiết lộ trình
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-toeic-blue/10 text-toeic-blue px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            <span>Đánh giá trình độ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-toeic-navy mb-4">
            Quiz đánh giá trình độ TOEIC
          </h2>
          <p className="text-lg text-muted-foreground">
            Hoàn thành quiz để nhận lộ trình học phù hợp với trình độ của bạn
          </p>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Tiến trình</span>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1}/{quizQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>Ước tính: 10-15 phút</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>~5 phút còn lại</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className={`${
                question.type === 'listening' ? 'bg-toeic-blue' : 
                question.type === 'reading' ? 'bg-toeic-success' : 'bg-toeic-warning'
              } text-white`}>
                {question.type === 'listening' ? 'Listening' : 
                 question.type === 'reading' ? 'Reading' : 'Vocabulary'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Câu {currentQuestion + 1}
              </span>
            </div>
            <CardTitle className="text-xl text-toeic-navy">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-200 hover:border-toeic-blue ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-toeic-blue bg-toeic-blue/5'
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-toeic-blue bg-toeic-blue'
                        : 'border-muted'
                    }`}>
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-full h-full rounded-full bg-white transform scale-50" />
                      )}
                    </div>
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <p className="text-sm text-muted-foreground">
                Chọn đáp án và bấm "Tiếp tục"
              </p>
              <Button 
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                variant="hero"
              >
                {currentQuestion === quizQuestions.length - 1 ? 'Hoàn thành' : 'Tiếp tục'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AssessmentQuiz;