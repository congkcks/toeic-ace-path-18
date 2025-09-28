import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ChevronRight, RotateCcw, Trophy } from "lucide-react";

interface Choice {
  id: string;
  text: string;
  nextStoryId: string;
  vocabularyWords?: string[];
}

interface Story {
  id: string;
  title: string;
  content: string;
  choices: Choice[];
  isEnding?: boolean;
  vocabularyWords: string[];
}

const InteractiveStoryReading = () => {
  const [currentStoryId, setCurrentStoryId] = useState("start");
  const [progress, setProgress] = useState(0);
  const [wordsLearned, setWordsLearned] = useState<string[]>([]);

  const stories: Record<string, Story> = {
    start: {
      id: "start",
      title: "A Business Trip to Tokyo",
      content: "Sarah, a marketing manager from New York, arrives at Narita Airport for her first business trip to Tokyo. She needs to get to her hotel downtown and prepare for tomorrow's important presentation.",
      vocabularyWords: ["marketing", "presentation", "downtown"],
      choices: [
        { id: "1", text: "Take the express train to save time", nextStoryId: "train" },
        { id: "2", text: "Take a taxi for comfort", nextStoryId: "taxi" },
        { id: "3", text: "Use the airport shuttle bus", nextStoryId: "bus" }
      ]
    },
    train: {
      id: "train",
      title: "On the Express Train",
      content: "Sarah boards the Narita Express. The train is fast and efficient. She practices her presentation while enjoying the city views. A Japanese businessman sitting nearby offers to help with directions.",
      vocabularyWords: ["efficient", "businessman", "directions"],
      choices: [
        { id: "1", text: "Accept his help and start a conversation", nextStoryId: "conversation" },
        { id: "2", text: "Politely decline and continue practicing", nextStoryId: "practice" }
      ]
    },
    taxi: {
      id: "taxi",
      title: "In the Taxi",
      content: "The taxi ride is comfortable but expensive. The driver doesn't speak much English, but he's friendly. Sarah notices the heavy traffic and realizes she might be late for her dinner meeting.",
      vocabularyWords: ["expensive", "traffic", "dinner meeting"],
      choices: [
        { id: "1", text: "Ask the driver to take a faster route", nextStoryId: "fast_route" },
        { id: "2", text: "Call to reschedule the dinner meeting", nextStoryId: "reschedule" }
      ]
    },
    bus: {
      id: "bus",
      title: "Airport Shuttle Experience",
      content: "The shuttle bus is economical and comfortable. Sarah meets other international business travelers. They share tips about doing business in Japan and exchange contact information.",
      vocabularyWords: ["economical", "international", "exchange"],
      choices: [
        { id: "1", text: "Join them for dinner to learn more", nextStoryId: "group_dinner" },
        { id: "2", text: "Go directly to hotel to rest", nextStoryId: "hotel_rest" }
      ]
    },
    conversation: {
      id: "conversation",
      title: "Cultural Exchange",
      content: "The businessman, Tanaka-san, gives Sarah valuable insights about Japanese business culture. He explains the importance of 'nemawashi' - building consensus before meetings. This knowledge will help her presentation succeed.",
      vocabularyWords: ["insights", "consensus", "succeed"],
      choices: [
        { id: "1", text: "Continue the conversation about business etiquette", nextStoryId: "etiquette_ending", vocabularyWords: ["etiquette"] }
      ]
    },
    practice: {
      id: "practice",
      title: "Focused Preparation",
      content: "Sarah uses the quiet train time to perfect her presentation. She rehearses key points and reviews her slides. By the time she reaches Tokyo Station, she feels confident and well-prepared.",
      vocabularyWords: ["rehearses", "confident", "well-prepared"],
      choices: [
        { id: "1", text: "Head to the hotel feeling ready", nextStoryId: "confident_ending" }
      ]
    },
    etiquette_ending: {
      id: "etiquette_ending",
      title: "Success Through Understanding",
      content: "Thanks to Tanaka-san's advice, Sarah's presentation is a huge success. The Japanese clients appreciate her understanding of their culture, and she secures a major contract for her company.",
      vocabularyWords: ["appreciate", "secures", "contract"],
      choices: [],
      isEnding: true
    },
    confident_ending: {
      id: "confident_ending",
      title: "Well-Prepared Victory",
      content: "Sarah's thorough preparation pays off. Her presentation is clear, professional, and impressive. The clients are pleased with her attention to detail and offer to expand their partnership.",
      vocabularyWords: ["thorough", "impressive", "partnership"],
      choices: [],
      isEnding: true
    }
  };

  const currentStory = stories[currentStoryId];

  const handleChoice = (choice: Choice) => {
    setCurrentStoryId(choice.nextStoryId);
    setProgress(prev => Math.min(prev + 20, 100));
    
    if (choice.vocabularyWords) {
      setWordsLearned(prev => [...new Set([...prev, ...choice.vocabularyWords!])]);
    }
    
    setWordsLearned(prev => [...new Set([...prev, ...currentStory.vocabularyWords])]);
  };

  const resetStory = () => {
    setCurrentStoryId("start");
    setProgress(0);
    setWordsLearned([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Interactive Story Reading</h1>
          </div>
          <p className="text-muted-foreground">Learn English through engaging business stories with choices</p>
        </div>

        {/* Progress and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Progress</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{progress}% Complete</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{wordsLearned.length}</div>
              <p className="text-sm text-muted-foreground">Words Learned</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{currentStory.title.split(' ').length}</div>
              <p className="text-sm text-muted-foreground">Reading Level</p>
            </CardContent>
          </Card>
        </div>

        {/* Story Content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline">{currentStory.id === "start" ? "Beginning" : "Chapter"}</Badge>
              {currentStory.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray max-w-none mb-6">
              <p className="text-lg leading-relaxed">{currentStory.content}</p>
            </div>

            {/* Vocabulary Words */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3">Key Vocabulary:</h4>
              <div className="flex flex-wrap gap-2">
                {currentStory.vocabularyWords.map((word, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {word}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Choices or Ending */}
            {currentStory.isEnding ? (
              <div className="text-center">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                    Story Complete! 🎉
                  </h3>
                  <p className="text-green-600 dark:text-green-400">
                    You've learned {wordsLearned.length} new vocabulary words!
                  </p>
                </div>
                <Button onClick={resetStory} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Read Another Story
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">What should Sarah do next?</h4>
                {currentStory.choices.map((choice) => (
                  <Button
                    key={choice.id}
                    variant="outline"
                    onClick={() => handleChoice(choice)}
                    className="w-full justify-between text-left h-auto p-4"
                  >
                    <span>{choice.text}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learned Words */}
        {wordsLearned.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Vocabulary Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {wordsLearned.map((word, index) => (
                  <Badge key={index} variant="default" className="text-xs">
                    ✓ {word}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InteractiveStoryReading;