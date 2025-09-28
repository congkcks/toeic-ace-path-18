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
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  Trophy
} from "lucide-react";

interface Exercise {
  id: number;
  type: 'multiple-choice' | 'error-correction' | 'fill-blank' | 'reading-comprehension';
  title: string;
  content?: string;
  question?: string;
  options?: string[];
  correct?: number;
  errors?: { text: string; wrong: string; correct: string }[];
  blanks?: { sentence: string; options: string[]; correct: number }[];
  passage?: string;
  questions?: { question: string; options: string[]; correct: number }[];
}

const DetailedLesson = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [scores, setScores] = useState<{ [key: number]: number }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const exercises: Exercise[] = [
    {
      id: 1,
      type: 'multiple-choice',
      title: 'Exercise 1. Chọn đáp án đúng cho mỗi câu hỏi.',
      question: 'Đâu không phải là một hậu tố dùng để chỉ quốc tịch?',
      options: ['-an', '-ish', '-ese', '-ion', '-ian'],
      correct: 3
    },
    {
      id: 2,
      type: 'multiple-choice',
      title: 'Exercise 2. Chọn quốc tịch tương ứng.',
      question: 'Chọn quốc tịch tương ứng của "Mexico"',
      options: ['Mexician', 'Mexican', 'Mexicoian'],
      correct: 1
    },
    {
      id: 3,
      type: 'multiple-choice',
      title: 'Exercise 3. Chọn quốc tịch tương ứng.',
      question: 'Chọn quốc tịch tương ứng của "England"',
      options: ['English', 'Englese', 'Englian'],
      correct: 0
    },
    {
      id: 4,
      type: 'error-correction',
      title: 'Exercise 4. Xác định lỗi sai trong các câu dưới đây và sửa lại.',
      errors: [
        { text: 'We do a lot of business with Italy people.', wrong: 'Italy', correct: 'Italian' },
        { text: 'The Vietnam are usually hard-working.', wrong: 'Vietnam', correct: 'Vietnamese' },
        { text: 'I think America are very friendly.', wrong: 'America', correct: 'American' },
        { text: 'I met a lot of new friends on my trip to Australian.', wrong: 'Australian', correct: 'Australia' },
        { text: 'James is from Japan. He speaks Japanish.', wrong: 'Japanish', correct: 'Japanese' }
      ]
    },
    {
      id: 5,
      type: 'fill-blank',
      title: 'Exercise 5. Chọn đáp án đúng để hoàn thành các câu dưới đây.',
      blanks: [
        {
          sentence: 'Oliver is _____. He is _____ Brazil.',
          options: ['Brazilian - from', 'Brazilian - to'],
          correct: 0
        },
        {
          sentence: 'William and Elijah _____ from Britain. They are _____ and they speak _____.',
          options: ['come - British - English', 'are - Britese - British'],
          correct: 0
        },
        {
          sentence: 'James and her mother _____ Turkish. They come from _____.',
          options: ['come - Turkish', 'are - Turkey'],
          correct: 1
        },
        {
          sentence: 'Some of my friends _____ from Australia. They speak _____.',
          options: ['are - English', 'come - Australian'],
          correct: 0
        }
      ]
    },
    {
      id: 6,
      type: 'reading-comprehension',
      title: 'Bước 2: Chọn đáp án đúng cho mỗi câu hỏi. Hãy cố gắng trên trong lúc làm bài tập nhé!',
      passage: `Dear Dustin,

Welcome to the Friends Club. It's for English learners around the world.

Martina, Pepe, Kate, Dunya, Mary, Paul and Bernd are members of the Club: Martina is from (1) ____. She's twelve. Pepe is from (2) ____. He's nine. Kate and Mary are twins (3) ____ Great Britain. They are thirteen years old. Dunya is from (4) ____. She's ten. Paul speaks French and he's eleven. Bernd is from (6) ____ and he's years old. How old are you?

Enjoy the club!`,
      questions: [
        { question: 'Chỗ trống 1', options: ['Italy', 'Italian'], correct: 0 },
        { question: 'Chỗ trống 2', options: ['Turkey', 'Turkish'], correct: 1 },
        { question: 'Chỗ trống 3', options: ['come', 'from'], correct: 1 },
        { question: 'Chỗ trống 4', options: ['Australia', 'Australian'], correct: 0 },
        { question: 'Chỗ trống 5', options: ['come', 'is'], correct: 1 },
        { question: 'Chỗ trống 6', options: ['China', 'Chinese'], correct: 0 }
      ]
    }
  ];

  const currentEx = exercises[currentExercise];
  const totalExercises = exercises.length;

  const handleAnswerSelect = (exerciseId: number, questionIndex: number, value: string) => {
    const key = `${exerciseId}_${questionIndex}`;
    setSelectedAnswers(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const calculateScore = (exercise: Exercise) => {
    let correct = 0;
    let total = 0;

    if (exercise.type === 'multiple-choice') {
      total = 1;
      const key = `${exercise.id}_0`;
      if (selectedAnswers[key] === exercise.correct?.toString()) {
        correct = 1;
      }
    } else if (exercise.type === 'fill-blank' && exercise.blanks) {
      total = exercise.blanks.length;
      exercise.blanks.forEach((blank, index) => {
        const key = `${exercise.id}_${index}`;
        if (selectedAnswers[key] === blank.correct.toString()) {
          correct++;
        }
      });
    } else if (exercise.type === 'reading-comprehension' && exercise.questions) {
      total = exercise.questions.length;
      exercise.questions.forEach((question, index) => {
        const key = `${exercise.id}_${index}`;
        if (selectedAnswers[key] === question.correct.toString()) {
          correct++;
        }
      });
    } else if (exercise.type === 'error-correction' && exercise.errors) {
      total = exercise.errors.length;
      correct = total; // Assuming all corrections are shown
    }

    return { correct, total };
  };

  const handleNext = () => {
    const score = calculateScore(currentEx);
    setScores(prev => ({
      ...prev,
      [currentEx.id]: score.correct
    }));

    if (currentExercise < totalExercises - 1) {
      setCurrentExercise(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentExercise > 0) {
      setCurrentExercise(prev => prev - 1);
    }
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-toeic-success";
    if (percentage >= 60) return "text-toeic-warning";
    return "text-red-500";
  };

  const getTotalScore = () => {
    return Object.values(scores).reduce((sum, score) => sum + score, 0);
  };

  const getMaxScore = () => {
    return exercises.reduce((sum, ex) => {
      if (ex.type === 'multiple-choice') return sum + 1;
      if (ex.type === 'fill-blank') return sum + (ex.blanks?.length || 0);
      if (ex.type === 'reading-comprehension') return sum + (ex.questions?.length || 0);
      if (ex.type === 'error-correction') return sum + (ex.errors?.length || 0);
      return sum;
    }, 0);
  };

  const handleSubmit = () => {
    const allAnswers: any[] = [];
    
    exercises.forEach(exercise => {
      if (exercise.type === 'multiple-choice') {
        const key = `${exercise.id}_0`;
        const isCorrect = selectedAnswers[key] === exercise.correct?.toString();
        allAnswers.push({ 
          exerciseId: exercise.id, 
          questionIndex: 0, 
          answer: selectedAnswers[key], 
          correct: exercise.correct, 
          isCorrect 
        });
      } else if (exercise.type === 'fill-blank' && exercise.blanks) {
        exercise.blanks.forEach((blank, index) => {
          const key = `${exercise.id}_${index}`;
          const isCorrect = selectedAnswers[key] === blank.correct.toString();
          allAnswers.push({ 
            exerciseId: exercise.id, 
            questionIndex: index, 
            answer: selectedAnswers[key], 
            correct: blank.correct, 
            isCorrect 
          });
        });
      } else if (exercise.type === 'reading-comprehension' && exercise.questions) {
        exercise.questions.forEach((question, index) => {
          const key = `${exercise.id}_${index}`;
          const isCorrect = selectedAnswers[key] === question.correct.toString();
          allAnswers.push({ 
            exerciseId: exercise.id, 
            questionIndex: index, 
            answer: selectedAnswers[key], 
            correct: question.correct, 
            isCorrect 
          });
        });
      } else if (exercise.type === 'error-correction' && exercise.errors) {
        exercise.errors.forEach((error, index) => {
          allAnswers.push({ 
            exerciseId: exercise.id, 
            questionIndex: index, 
            answer: error.correct, 
            correct: error.correct, 
            isCorrect: true 
          });
        });
      }
    });

    const correctCount = allAnswers.filter(answer => answer.isCorrect).length;
    const calculatedScore = Math.round((correctCount / allAnswers.length) * 100);
    
    // Navigate to AI analysis submission page first
    navigate('/ai-analysis', {
      state: {
        lessonType: 'detailed',
        score: calculatedScore,
        answers: allAnswers,
        exerciseData: exercises
      }
    });
    
    toast({
      title: "Đang gửi kết quả...",
      description: "AI sẽ phân tích chi tiết bài làm của bạn",
    });
  };

  if (isCompleted) {
    const totalScore = getTotalScore();
    const maxScore = getMaxScore();
    
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-toeic-success rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-toeic-navy">Hoàn thành bài học!</CardTitle>
              <CardDescription>Bạn đã hoàn thành tất cả các bài tập</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-4xl font-bold text-toeic-success">
                {totalScore}/{maxScore}
              </div>
              <p className="text-muted-foreground">
                Tỷ lệ chính xác: {Math.round((totalScore / maxScore) * 100)}%
              </p>
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/study-plan')}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Quay lại lộ trình
                </Button>
                <Button 
                  variant="hero"
                  onClick={handleSubmit}
                >
                  Gửi kết quả cho AI đánh giá
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-6 max-w-4xl">
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
              <h1 className="text-2xl font-bold text-toeic-navy">Đáp án</h1>
              <p className="text-muted-foreground">Day 1 - Nationalities</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-toeic-success">
              <BookOpen className="w-3 h-3 mr-1" />
              Grammar
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
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-toeic-primary rounded-full flex items-center justify-center">
                  <Trophy className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-toeic-success">
                  Điểm số {scores[currentEx.id] || 0}/{calculateScore(currentEx).total}
                </span>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div className="flex h-2 rounded-full overflow-hidden">
                {Array.from({ length: totalExercises }).map((_, index) => (
                  <div
                    key={index}
                    className={`flex-1 ${
                      index < currentExercise
                        ? 'bg-toeic-success'
                        : index === currentExercise
                        ? 'bg-toeic-primary'
                        : 'bg-muted'
                    } ${index > 0 ? 'ml-1' : ''}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Exercise {currentExercise + 1}</span>
              <span>{currentExercise + 1}/{totalExercises}</span>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-toeic-navy">
              {currentEx.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Multiple Choice */}
            {currentEx.type === 'multiple-choice' && (
              <div className="space-y-4">
                <p className="font-medium">{currentEx.question}</p>
                <RadioGroup
                  value={selectedAnswers[`${currentEx.id}_0`] || ""}
                  onValueChange={(value) => handleAnswerSelect(currentEx.id, 0, value)}
                >
                  {currentEx.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`opt_${index}`} />
                      <Label htmlFor={`opt_${index}`} className="cursor-pointer">
                        {String.fromCharCode(65 + index)}. {option}
                      </Label>
                      {scores[currentEx.id] !== undefined && index === currentEx.correct && (
                        <CheckCircle className="w-4 h-4 text-toeic-success" />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Error Correction */}
            {currentEx.type === 'error-correction' && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Example:</strong><br />
                  James and her mother are France.<br />
                  Lỗi sai ở "France" → sửa lại thành "French"
                </p>
                {currentEx.errors?.map((error, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-2">
                      {index + 1}. {error.text}
                    </p>
                    <div className="flex items-center space-x-2 text-sm">
                      <span>Lỗi sai ở</span>
                      <Badge variant="destructive" className="text-xs">
                        {index + 1}
                      </Badge>
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded underline">
                        {error.wrong}
                      </span>
                      <span>→ sửa lại thành</span>
                      <Badge variant="default" className="text-xs">
                        {index + 2}
                      </Badge>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded underline">
                        {error.correct}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Fill in the Blanks */}
            {currentEx.type === 'fill-blank' && (
              <div className="space-y-6">
                {currentEx.blanks?.map((blank, index) => (
                  <div key={index} className="space-y-3">
                    <p className="font-medium">
                      <Badge className="mr-2">{index + 1}</Badge>
                      {blank.sentence}
                    </p>
                    <RadioGroup
                      value={selectedAnswers[`${currentEx.id}_${index}`] || ""}
                      onValueChange={(value) => handleAnswerSelect(currentEx.id, index, value)}
                    >
                      {blank.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center space-x-2">
                          <RadioGroupItem 
                            value={optIndex.toString()} 
                            id={`blank_${index}_${optIndex}`} 
                          />
                          <Label htmlFor={`blank_${index}_${optIndex}`} className="cursor-pointer">
                            {String.fromCharCode(65 + optIndex)}. {option}
                          </Label>
                          {scores[currentEx.id] !== undefined && optIndex === blank.correct && (
                            <CheckCircle className="w-4 h-4 text-toeic-success" />
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            )}

            {/* Reading Comprehension */}
            {currentEx.type === 'reading-comprehension' && (
              <div className="space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg border">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {currentEx.passage}
                  </pre>
                </div>
                <div className="space-y-4">
                  {currentEx.questions?.map((question, index) => (
                    <div key={index} className="space-y-2">
                      <p className="font-medium">
                        <Badge className="mr-2">{index + 1}</Badge>
                        {question.question}
                      </p>
                      <RadioGroup
                        value={selectedAnswers[`${currentEx.id}_${index}`] || ""}
                        onValueChange={(value) => handleAnswerSelect(currentEx.id, index, value)}
                      >
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center space-x-2">
                            <RadioGroupItem 
                              value={optIndex.toString()} 
                              id={`reading_${index}_${optIndex}`} 
                            />
                            <Label htmlFor={`reading_${index}_${optIndex}`} className="cursor-pointer">
                              {String.fromCharCode(65 + optIndex)}. {option}
                            </Label>
                            {scores[currentEx.id] !== undefined && optIndex === question.correct && (
                              <CheckCircle className="w-4 h-4 text-toeic-success" />
                            )}
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentExercise === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Phần trước
          </Button>

          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Xem tài liệu
          </Button>

          <Button 
            variant="hero" 
            onClick={handleNext}
          >
            {currentExercise === totalExercises - 1 ? (
              <>
                Hoàn thành
                <CheckCircle className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Tiếp theo
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailedLesson;