import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Clock,
  BookOpen,
  CheckCircle,
  Target,
  ChevronLeft,
  Send,
  Brain
} from "lucide-react";

const ReadingLesson = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const readingPassage = `
    Dear Ms. Johnson,

    We are pleased to inform you that your application for the position of Marketing Manager at Global Tech Solutions has been accepted. Your first day of work will be Monday, March 15th, at 9:00 AM.

    Please report to the Human Resources office on the 5th floor. You will need to bring the following documents:
    - A copy of your passport or driver's license
    - Your signed employment contract
    - Two passport-sized photographs

    Your supervisor, Mr. Chen, will meet you at 10:00 AM to discuss your initial responsibilities and introduce you to the team. The orientation program will last for three days, covering company policies, procedures, and your specific job duties.

    We look forward to working with you and are confident that you will be a valuable addition to our team.

    Best regards,
    Sarah Williams
    HR Director
  `;

  const questions = [
    {
      id: 1,
      question: "What position has Ms. Johnson been offered?",
      options: [
        "HR Director",
        "Marketing Manager", 
        "Sales Representative",
        "Technical Support"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "When should Ms. Johnson start work?",
      options: [
        "Monday, March 15th",
        "Tuesday, March 16th",
        "March 15th at 10:00 AM",
        "The orientation day"
      ],
      correct: 0
    },
    {
      id: 3,
      question: "Where should Ms. Johnson report on her first day?",
      options: [
        "Mr. Chen's office",
        "The Marketing Department",
        "The Human Resources office on the 5th floor",
        "The main reception"
      ],
      correct: 2
    }
  ];

  const handleAnswerSelect = (questionIndex: number, value: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = value;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    setIsAnalyzing(true);
    
    // Prepare answers with correctness
    const answers = questions.map((question, index) => ({
      questionId: question.id,
      selectedAnswer: parseInt(selectedAnswers[index] || "-1"),
      correctAnswer: question.correct,
      isCorrect: parseInt(selectedAnswers[index] || "-1") === question.correct,
      question: question.question,
      options: question.options
    }));

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Đang gửi kết quả cho AI...",
      description: "AI đang phân tích bài làm của bạn",
    });

    // Auto navigate to AI assessment
    navigate('/ai-assessment', {
      state: {
        lessonType: 'reading',
        score: Math.round((answers.filter(a => a.isCorrect).length / answers.length) * 100),
        answers,
        exerciseData: {
          passage: readingPassage,
          lessonTitle: "Reading Comprehension - Business Letter",
          timeSpent: "~15 phút",
          difficulty: "Trung bình"
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/study-plan')}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Quay lại lộ trình
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-toeic-navy">Reading Comprehension</h1>
              <p className="text-muted-foreground">Day 2 - Business Letter</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-toeic-success">
              <BookOpen className="w-3 h-3 mr-1" />
              Reading
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              15 phút
            </div>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Tiến trình bài học</span>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1}/{questions.length} câu hỏi
              </span>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Reading Passage */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-lg text-toeic-navy">Đoạn văn</CardTitle>
              <CardDescription>
                Đọc kỹ đoạn văn sau và trả lời các câu hỏi bên cạnh
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="bg-muted/30 p-4 rounded-lg border">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {readingPassage}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <div className="space-y-6">
            {questions.map((question, questionIndex) => (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle className="text-base text-toeic-navy">
                    Câu {questionIndex + 1}: {question.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={selectedAnswers[questionIndex] || ""}
                    onValueChange={(value) => handleAnswerSelect(questionIndex, value)}
                    disabled={isSubmitted}
                  >
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={optionIndex.toString()} 
                          id={`q${questionIndex}_${optionIndex}`}
                        />
                        <Label 
                          htmlFor={`q${questionIndex}_${optionIndex}`}
                          className="cursor-pointer flex-1"
                        >
                          {String.fromCharCode(65 + optionIndex)}. {option}
                        </Label>
                        {isSubmitted && optionIndex === question.correct && (
                          <CheckCircle className="w-4 h-4 text-toeic-success" />
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              {!isSubmitted ? (
                <Button 
                  onClick={handleSubmit}
                  disabled={selectedAnswers.length < questions.length}
                  variant="hero"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Nộp bài và nhận đánh giá AI
                </Button>
              ) : isAnalyzing ? (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-primary">
                    <Brain className="w-5 h-5 animate-pulse" />
                    <span className="font-medium">Đang gửi cho AI phân tích...</span>
                  </div>
                  <Progress value={75} className="w-64 mx-auto" />
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-toeic-success">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Đã hoàn thành bài học!</span>
                  </div>
                  <Button 
                    variant="hero"
                    onClick={() => navigate('/lesson/listening')}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Tiếp tục học bài tiếp theo
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingLesson;