import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Brain, RotateCcw, CheckCircle, XCircle, Star, Zap } from "lucide-react";

interface VocabCard {
  id: string;
  word: string;
  definition: string;
  example: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  pronunciation: string;
  synonyms: string[];
  repetitionCount: number;
  lastReviewed: Date;
  masteryLevel: number; // 0-100
}

const VocabularyBuilder = () => {
  const [currentCard, setCurrentCard] = useState<VocabCard | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [mode, setMode] = useState<"definition" | "example" | "synonym">("definition");

  const vocabularyCards: VocabCard[] = [
    {
      id: "1",
      word: "collaborate",
      definition: "to work jointly with others in an intellectual endeavor",
      example: "We need to collaborate with the marketing team to launch this product successfully.",
      level: "intermediate",
      category: "Business",
      pronunciation: "/kəˈlæbəˌreɪt/",
      synonyms: ["cooperate", "work together", "partner"],
      repetitionCount: 0,
      lastReviewed: new Date(),
      masteryLevel: 25
    },
    {
      id: "2",
      word: "analyze",
      definition: "to examine methodically and in detail the constitution or structure of something",
      example: "Please analyze the quarterly sales data and prepare a comprehensive report.",
      level: "intermediate",
      category: "Business",
      pronunciation: "/ˈænəˌlaɪz/",
      synonyms: ["examine", "study", "investigate"],
      repetitionCount: 0,
      lastReviewed: new Date(),
      masteryLevel: 40
    },
    {
      id: "3",
      word: "innovative",
      definition: "featuring new methods; advanced and original",
      example: "The company's innovative approach to customer service has increased satisfaction rates.",
      level: "advanced",
      category: "Business",
      pronunciation: "/ˈɪnəˌveɪtɪv/",
      synonyms: ["creative", "original", "groundbreaking"],
      repetitionCount: 0,
      lastReviewed: new Date(),
      masteryLevel: 10
    },
    {
      id: "4",
      word: "strategy",
      definition: "a plan of action designed to achieve a long-term or overall aim",
      example: "Our marketing strategy focuses on digital channels and social media engagement.",
      level: "intermediate",
      category: "Business",
      pronunciation: "/ˈstrætɪdʒi/",
      synonyms: ["plan", "approach", "method"],
      repetitionCount: 0,
      lastReviewed: new Date(),
      masteryLevel: 60
    },
    {
      id: "5",
      word: "implement",
      definition: "to put a decision or plan into effect",
      example: "We will implement the new software system next quarter.",
      level: "intermediate",
      category: "Business",
      pronunciation: "/ˈɪmpləˌmɛnt/",
      synonyms: ["execute", "carry out", "apply"],
      repetitionCount: 0,
      lastReviewed: new Date(),
      masteryLevel: 30
    }
  ];

  const [cards, setCards] = useState(vocabularyCards);

  useEffect(() => {
    loadNewCard();
  }, []);

  const loadNewCard = () => {
    // Select card based on spaced repetition algorithm (simplified)
    const availableCards = cards.filter(card => card.masteryLevel < 90);
    if (availableCards.length === 0) {
      setCurrentCard(null);
      return;
    }
    
    // Prioritize cards with lower mastery levels
    const sortedCards = availableCards.sort((a, b) => a.masteryLevel - b.masteryLevel);
    const randomIndex = Math.floor(Math.random() * Math.min(3, sortedCards.length));
    setCurrentCard(sortedCards[randomIndex]);
    setUserAnswer("");
    setShowAnswer(false);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (!currentCard) return;

    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    if (isCorrect) {
      setStreak(prev => prev + 1);
      // Increase mastery level
      setCards(prev => prev.map(card => 
        card.id === currentCard.id 
          ? { ...card, masteryLevel: Math.min(card.masteryLevel + 15, 100), repetitionCount: card.repetitionCount + 1 }
          : card
      ));
    } else {
      setStreak(0);
      // Decrease mastery level slightly
      setCards(prev => prev.map(card => 
        card.id === currentCard.id 
          ? { ...card, masteryLevel: Math.max(card.masteryLevel - 5, 0) }
          : card
      ));
    }

    setTimeout(() => {
      loadNewCard();
    }, 2000);
  };

  const checkAnswer = () => {
    if (!currentCard) return;
    
    const isCorrect = userAnswer.toLowerCase().trim() === currentCard.word.toLowerCase();
    setShowAnswer(true);
    handleAnswer(isCorrect);
  };

  const resetProgress = () => {
    setCards(vocabularyCards);
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    loadNewCard();
  };

  const changeMode = (newMode: "definition" | "example" | "synonym") => {
    setMode(newMode);
    setShowAnswer(false);
    setUserAnswer("");
  };

  const getPromptText = () => {
    if (!currentCard) return "";
    
    switch (mode) {
      case "definition":
        return currentCard.definition;
      case "example":
        return currentCard.example.replace(currentCard.word, "_____");
      case "synonym":
        return `Synonym for: ${currentCard.synonyms[0]}`;
      default:
        return currentCard.definition;
    }
  };

  const masteredWords = cards.filter(card => card.masteryLevel >= 80).length;
  const averageMastery = cards.reduce((sum, card) => sum + card.masteryLevel, 0) / cards.length;

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <Star className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Congratulations!</h1>
            <p className="text-muted-foreground mb-6">
              You've mastered all available vocabulary cards!
            </p>
            <Button onClick={resetProgress} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Practice Again
            </Button>
          </div>
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
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Vocabulary Builder</h1>
          </div>
          <p className="text-muted-foreground">Master business English vocabulary with spaced repetition</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{score.correct}/{score.total}</div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-orange-500" />
                <div className="text-2xl font-bold text-orange-500">{streak}</div>
              </div>
              <p className="text-sm text-muted-foreground">Streak</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-500">{masteredWords}</div>
              <p className="text-sm text-muted-foreground">Mastered</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-500">{Math.round(averageMastery)}%</div>
              <p className="text-sm text-muted-foreground">Average</p>
            </CardContent>
          </Card>
        </div>

        {/* Mode Selection */}
        <div className="flex justify-center gap-2 mb-6">
          <Button 
            variant={mode === "definition" ? "default" : "outline"}
            onClick={() => changeMode("definition")}
            size="sm"
          >
            Definition
          </Button>
          <Button 
            variant={mode === "example" ? "default" : "outline"}
            onClick={() => changeMode("example")}
            size="sm"
          >
            Example
          </Button>
          <Button 
            variant={mode === "synonym" ? "default" : "outline"}
            onClick={() => changeMode("synonym")}
            size="sm"
          >
            Synonym
          </Button>
        </div>

        {/* Main Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>What word fits this {mode}?</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{currentCard.level}</Badge>
                <Badge variant="secondary">{currentCard.category}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Mastery Level</span>
                <span>{currentCard.masteryLevel}%</span>
              </div>
              <Progress value={currentCard.masteryLevel} className="h-2" />
            </div>

            {/* Question */}
            <div className="bg-muted/50 p-6 rounded-lg mb-6">
              <p className="text-lg leading-relaxed">{getPromptText()}</p>
            </div>

            {/* Input */}
            <div className="space-y-4">
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer..."
                disabled={showAnswer}
                onKeyPress={(e) => e.key === 'Enter' && !showAnswer && checkAnswer()}
                className="text-lg"
              />

              {!showAnswer ? (
                <Button 
                  onClick={checkAnswer} 
                  disabled={!userAnswer.trim()}
                  className="w-full"
                >
                  Check Answer
                </Button>
              ) : (
                <div className="space-y-4">
                  {/* Answer Feedback */}
                  <div className={`p-4 rounded-lg ${
                    userAnswer.toLowerCase().trim() === currentCard.word.toLowerCase()
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {userAnswer.toLowerCase().trim() === currentCard.word.toLowerCase() ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-semibold">
                        {userAnswer.toLowerCase().trim() === currentCard.word.toLowerCase() ? 'Correct!' : 'Incorrect'}
                      </span>
                    </div>
                    <p className="text-sm">
                      The correct answer is: <strong>{currentCard.word}</strong>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Pronunciation: {currentCard.pronunciation}
                    </p>
                  </div>

                  {/* Word Details */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Word Details:</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Definition:</strong> {currentCard.definition}</p>
                        <p><strong>Example:</strong> {currentCard.example}</p>
                        <div>
                          <strong>Synonyms:</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {currentCard.synonyms.map((synonym, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {synonym}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button onClick={loadNewCard} className="w-full">
                    Next Word
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Reset Button */}
        <div className="text-center">
          <Button variant="outline" onClick={resetProgress} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset Progress
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VocabularyBuilder;