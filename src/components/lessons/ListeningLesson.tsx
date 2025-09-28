import { useState, useRef } from "react";
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
  Headphones,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  ChevronLeft,
  Send,
  Volume2,
  Brain,
  SkipBack,
  SkipForward,
  ChevronRight,
  Mic,
  Heart,
  CheckCircle2
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ListeningLesson = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [submitted, setSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [analyzingAI, setAnalyzingAI] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const questions = [
    {
      question: "Hôm nay tôi được nghỉ.",
      options: [
        "I have the day off.",
        "I have a day trip.",
        "I have the day shift.",
        "I have the day free."
      ],
      correct: "I have the day off."
    },
    {
      question: "Chúng ta sẽ có một kỳ nghỉ.",
      options: [
        "We're going on a vacation.",
        "We're going on a mission.",
        "We're going on a journey.",
        "We're going on a trip."
      ],
      correct: "We're going on a vacation."
    },
    {
      question: "Tôi sẽ nghỉ ngơi một thời gian.",
      options: [
        "I'm gonna take some time off.",
        "I'm gonna take some time out.",
        "I'm gonna take some rest.",
        "I'm gonna take a break."
      ],
      correct: "I'm gonna take some time off."
    },
    {
      question: "Có có kế hoạch gì cho kỳ nghỉ lễ không?",
      options: [
        "Do you have plans for the holiday?",
        "Do you have plans for the weekend?",
        "Do you have plans for the vacation?",
        "Do you have plans for the break?"
      ],
      correct: "Do you have plans for the holiday?"
    },
    {
      question: "Tôi sẽ nghỉ một tuần.",
      options: [
        "I will be off for a week.",
        "I will be away for a week.", 
        "I will be free for a week.",
        "I will be out for a week."
      ],
      correct: "I will be off for a week."
    }
  ];

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        setPlayCount(prev => prev + 1);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      setPlayCount(prev => prev + 1);
    }
  };

  const handleAnswerSelect = (questionIndex: number, value: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    setAnalyzingAI(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setAnalyzingAI(false);
    toast({
      title: "Kết quả đã được gửi cho AI",
      description: "AI đang phân tích kỹ năng nghe của bạn",
    });
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
                <h1 className="text-xl font-semibold text-foreground">Bài học Nghe hiểu</h1>
                <p className="text-sm text-muted-foreground">Lesson 4: Restaurant Conversation</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              Listening Practice
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
                  <Volume2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Số lần đã nghe</p>
                  <p className="text-xs text-muted-foreground">{playCount} lần</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Thời gian</p>
                <p className="text-xs text-muted-foreground">2:45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Video/Audio Player */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-0">
                {/* Video Player Area */}
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-lg overflow-hidden">
                  <div className="aspect-video flex items-center justify-center">
                    {/* Placeholder for video - you can replace with actual video */}
                    <div className="text-center text-white">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                        <Play className="h-8 w-8" />
                      </div>
                      <p className="text-lg font-medium">Restaurant Conversation</p>
                      <p className="text-sm opacity-80">Click to start listening</p>
                    </div>
                  </div>
                  
                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleRestart}
                        className="text-white hover:bg-white/20"
                      >
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handlePlay}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                      >
                        <SkipForward className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 mx-3">
                        <div className="h-1 bg-white/30 rounded-full">
                          <div className="h-1 bg-white rounded-full w-1/3"></div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Audio Element (hidden) */}
                <audio
                  ref={audioRef}
                  src="/audio/restaurant-conversation.mp3"
                  className="hidden"
                />

                {/* Controls Panel */}
                <div className="p-4 border-t">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        1x
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                      >
                        ALL
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="font-medium text-sm mb-1">Okay, Boyle. Stop freaking out.</p>
                    <p className="text-xs text-muted-foreground">Được rồi, Boyle. Đừng hoảng hốt nữa.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Practice Speaking Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Hãy thử luyện nói nào!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary font-medium">Số lần luyện nói còn lại: 3</span>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Volume2 className="h-3 w-3" />
                      </Button>
                      <span className="font-medium text-sm">I have the day off.</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Hôm nay tôi được nghỉ.</p>
                  </div>

                  <Button className="w-full" variant="default">
                    <Mic className="h-4 w-4 mr-2" />
                    Luyện nói
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Questions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary">Chú ý đang học</h2>
              <Badge variant="secondary" className="text-xs">Nghi lẽ (4)</Badge>
            </div>

            <div className="space-y-3">
              {questions.map((question, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs font-medium">LV {index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm mb-2 leading-relaxed">
                          {question.question}
                        </h3>
                        <RadioGroup
                          value={selectedAnswers[index] || ""}
                          onValueChange={(value) => handleAnswerSelect(index, value)}
                          className="space-y-2"
                        >
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-start space-x-2">
                              <RadioGroupItem
                                value={option}
                                id={`q${index}-option${optionIndex}`}
                                disabled={submitted}
                                className="mt-1"
                              />
                              <Label
                                htmlFor={`q${index}-option${optionIndex}`}
                                className={`text-sm cursor-pointer leading-relaxed flex-1 ${
                                  submitted && option === question.correct
                                    ? 'text-green-600 font-medium'
                                    : submitted && option === selectedAnswers[index] && option !== question.correct
                                    ? 'text-red-600'
                                    : ''
                                }`}
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {!submitted && (
              <Button 
                onClick={handleSubmit} 
                className="w-full mt-4"
                disabled={Object.keys(selectedAnswers).length !== questions.length}
              >
                <Heart className="h-4 w-4 mr-2" />
                Trả lời câu hỏi
              </Button>
            )}

            {analyzingAI && (
              <div className="text-center py-6">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                  AI đang phân tích kết quả của bạn...
                </div>
              </div>
            )}

            {submitted && !analyzingAI && (
              <div className="space-y-4 mt-4">
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Hoàn thành bài học!</AlertTitle>
                  <AlertDescription>
                    Bạn đã hoàn thành bài nghe hiểu. Kết quả đã được gửi cho AI phân tích.
                  </AlertDescription>
                </Alert>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => navigate('/ai-assessment', { 
                      state: { 
                        score: Object.keys(selectedAnswers).filter((key, index) => 
                          selectedAnswers[index] === questions[index].correct
                        ).length,
                        total: questions.length,
                        lessonType: 'listening',
                        answers: selectedAnswers,
                        questions: questions
                      }
                    })}
                    className="flex-1"
                  >
                    Xem phân tích AI
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/lesson/writing')}
                  >
                    Bài tiếp theo: Writing
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningLesson;