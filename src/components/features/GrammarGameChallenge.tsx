import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gamepad2, Timer, Trophy, Zap, RotateCcw, CheckCircle, XCircle } from "lucide-react";

interface GrammarQuestion {
  id: string;
  type: "fill-blank" | "choose-correct" | "reorder" | "error-correction";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  points: number;
}

const GrammarGameChallenge = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<"playing" | "finished" | "paused">("playing");
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);

  const grammarQuestions: GrammarQuestion[] = [
    {
      id: "1",
      type: "choose-correct",
      question: "The company ____ a new marketing strategy next quarter.",
      options: ["will implement", "will be implement", "is implementing", "implement"],
      correctAnswer: "will implement",
      explanation: "Future simple tense is used for plans and decisions made at the time of speaking.",
      difficulty: "medium",
      topic: "Future Tense",
      points: 10
    },
    {
      id: "2",
      type: "fill-blank",
      question: "If I ____ you, I would accept the job offer.",
      options: ["am", "were", "was", "be"],
      correctAnswer: "were",
      explanation: "In second conditional sentences, we use 'were' for all persons after 'if'.",
      difficulty: "medium",
      topic: "Conditionals",
      points: 15
    },
    {
      id: "3",
      type: "error-correction",
      question: "She has been working here since five years.",
      options: ["since five years", "for five years", "during five years", "in five years"],
      correctAnswer: "for five years",
      explanation: "Use 'for' with periods of time and 'since' with specific points in time.",
      difficulty: "easy",
      topic: "Prepositions",
      points: 8
    },
    {
      id: "4",
      type: "reorder",
      question: "Reorder: [presentation / the / successfully / she / delivered / important]",
      options: ["she successfully delivered the important presentation", "she delivered the important presentation successfully", "she delivered successfully the important presentation", "the important presentation she delivered successfully"],
      correctAnswer: "she successfully delivered the important presentation",
      explanation: "Adverbs of manner usually come before the main verb in active voice.",
      difficulty: "hard",
      topic: "Word Order",
      points: 20
    },
    {
      id: "5",
      type: "choose-correct",
      question: "The report ____ by the team yesterday.",
      options: ["was completed", "has completed", "completed", "completing"],
      correctAnswer: "was completed",
      explanation: "Passive voice in past simple: was/were + past participle.",
      difficulty: "medium",
      topic: "Passive Voice",
      points: 12
    },
    {
      id: "6",
      type: "fill-blank",
      question: "I wish I ____ more time to finish the project.",
      options: ["have", "had", "would have", "will have"],
      correctAnswer: "had",
      explanation: "After 'I wish', we use past tense to express regret about the present.",
      difficulty: "hard",
      topic: "Wish Clauses",
      points: 18
    }
  ];

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      handleTimeout();
    }
  }, [timeLeft, gameState]);

  const question = grammarQuestions[currentQuestion];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === question.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + question.points);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
      setLives(prev => prev - 1);
    }

    setTimeout(() => {
      if (currentQuestion < grammarQuestions.length - 1 && lives > 0) {
        nextQuestion();
      } else {
        setGameState("finished");
      }
    }, 3000);
  };

  const handleTimeout = () => {
    setSelectedAnswer("");
    setShowResult(true);
    setStreak(0);
    setLives(prev => prev - 1);
    
    setTimeout(() => {
      if (currentQuestion < grammarQuestions.length - 1 && lives > 0) {
        nextQuestion();
      } else {
        setGameState("finished");
      }
    }, 2000);
  };

  const nextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
    setSelectedAnswer("");
    setShowResult(false);
    setTimeLeft(30);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowResult(false);
    setScore(0);
    setTimeLeft(30);
    setGameState("playing");
    setStreak(0);
    setLives(3);
  };

  const getStreakBonus = () => {
    if (streak >= 5) return 3;
    if (streak >= 3) return 2;
    return 1;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "hard": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  if (gameState === "finished") {
    const finalScore = score;
    const accuracy = Math.round((score / (grammarQuestions.length * 15)) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy className="h-16 w-16 text-yellow-500" />
              </div>
              <CardTitle className="text-3xl">Game Complete!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{finalScore}</div>
                    <p className="text-sm text-muted-foreground">Final Score</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">{accuracy}%</div>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Performance Rating:</h3>
                  <Badge variant={accuracy >= 80 ? "default" : accuracy >= 60 ? "secondary" : "destructive"}>
                    {accuracy >= 80 ? "Excellent!" : accuracy >= 60 ? "Good!" : "Keep Practicing!"}
                  </Badge>
                </div>

                <Button onClick={resetGame} className="gap-2 w-full">
                  <RotateCcw className="h-4 w-4" />
                  Play Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Grammar Game Challenge</h1>
          </div>
          <p className="text-muted-foreground">Test your grammar skills in this exciting challenge!</p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{score}</div>
              <p className="text-xs text-muted-foreground">Score</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <Timer className="h-4 w-4 text-orange-500" />
                <div className="text-2xl font-bold text-orange-500">{timeLeft}</div>
              </div>
              <p className="text-xs text-muted-foreground">Time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <Zap className="h-4 w-4 text-yellow-500" />
                <div className="text-2xl font-bold text-yellow-500">{streak}</div>
              </div>
              <p className="text-xs text-muted-foreground">Streak</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-500">{"❤️".repeat(lives)}</div>
              <p className="text-xs text-muted-foreground">Lives</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-500">×{getStreakBonus()}</div>
              <p className="text-xs text-muted-foreground">Multiplier</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Question {currentQuestion + 1} of {grammarQuestions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / grammarQuestions.length) * 100)}% Complete</span>
          </div>
          <Progress value={((currentQuestion + 1) / grammarQuestions.length) * 100} className="h-2" />
        </div>

        {/* Main Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Grammar Challenge</CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getDifficultyColor(question.difficulty)}>
                  {question.difficulty}
                </Badge>
                <Badge variant="outline">{question.topic}</Badge>
                <Badge variant="secondary">{question.points} pts</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Question */}
              <div className="text-lg font-medium p-4 bg-muted/50 rounded-lg">
                {question.question}
              </div>

              {/* Answer Options */}
              <div className="grid gap-3">
                {question.options?.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === option ? "default" : "outline"}
                    onClick={() => !showResult && handleAnswer(option)}
                    disabled={showResult}
                    className="justify-start h-auto p-4 text-left"
                  >
                    <span className="font-mono mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>

              {/* Result */}
              {showResult && (
                <Card className={`${selectedAnswer === question.correctAnswer || !selectedAnswer ? 'border-green-500' : 'border-red-500'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      {selectedAnswer === question.correctAnswer ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="font-semibold text-green-500">Correct!</span>
                          <Badge variant="outline">+{question.points * getStreakBonus()} points</Badge>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-red-500" />
                          <span className="font-semibold text-red-500">
                            {selectedAnswer ? "Incorrect" : "Time's up!"}
                          </span>
                        </>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Time Warning */}
        {timeLeft <= 10 && timeLeft > 0 && !showResult && (
          <div className="text-center mb-4">
            <Badge variant="destructive" className="animate-pulse">
              Hurry up! {timeLeft} seconds left!
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrammarGameChallenge;