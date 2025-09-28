import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Mic, MicOff, Play, RotateCcw, Volume2, Award } from "lucide-react";

interface PronunciationWord {
  id: string;
  word: string;
  phonetic: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  tips: string;
  commonMistakes: string[];
}

const PronunciationPractice = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const pronunciationWords: PronunciationWord[] = [
    {
      id: "1",
      word: "presentation",
      phonetic: "/ˌpriːzənˈteɪʃən/",
      difficulty: "medium",
      category: "Business",
      tips: "Stress on the third syllable: pre-sen-TA-tion",
      commonMistakes: ["Stressing the first syllable", "Pronouncing 'tion' as 'shun' instead of 'ʃən'"]
    },
    {
      id: "2",
      word: "entrepreneur",
      phonetic: "/ˌɑntrəprəˈnɜr/",
      difficulty: "hard",
      category: "Business",
      tips: "French origin: AN-truh-pruh-NOOR with stress on the last syllable",
      commonMistakes: ["English pronunciation instead of French", "Missing the 'r' sound at the end"]
    },
    {
      id: "3",
      word: "schedule",
      phonetic: "/ˈʃɛdʒuːl/ (UK) /ˈskɛdʒuːl/ (US)",
      difficulty: "medium",
      category: "General",
      tips: "Different pronunciations in UK (SHED-yool) vs US (SKED-yool)",
      commonMistakes: ["Mixing UK and US pronunciations", "Pronouncing the 'ch' as in 'church'"]
    },
    {
      id: "4",
      word: "collaborate",
      phonetic: "/kəˈlæbəˌreɪt/",
      difficulty: "medium",
      category: "Business",
      tips: "Stress on the second syllable: co-LAB-o-rate",
      commonMistakes: ["Stressing the first syllable", "Dropping the middle syllables"]
    },
    {
      id: "5",
      word: "analyze",
      phonetic: "/ˈænəˌlaɪz/",
      difficulty: "easy",
      category: "Academic",
      tips: "Stress on the first syllable: AN-a-lyze",
      commonMistakes: ["Stressing the second syllable", "Pronouncing 'z' as 's'"]
    }
  ];

  const word = pronunciationWords[currentWord];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        
        // Simulate pronunciation scoring (in real app, this would use speech recognition)
        const simulatedScore = Math.floor(Math.random() * 30) + 70; // 70-100
        setScore(simulatedScore);
        setAttempts(prev => prev + 1);
        
        // Update progress
        if (simulatedScore >= 85) {
          setProgress(prev => Math.min(prev + 20, 100));
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const playExample = () => {
    // In a real app, this would play actual pronunciation audio
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  const nextWord = () => {
    if (currentWord < pronunciationWords.length - 1) {
      setCurrentWord(prev => prev + 1);
    } else {
      setCurrentWord(0);
    }
    setRecordedAudio(null);
    setScore(null);
    setAttempts(0);
  };

  const resetProgress = () => {
    setCurrentWord(0);
    setProgress(0);
    setRecordedAudio(null);
    setScore(null);
    setAttempts(0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    if (score >= 70) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Excellent pronunciation! 🎉";
    if (score >= 80) return "Good job! Keep practicing! 👍";
    if (score >= 70) return "Not bad, but try again 📈";
    return "Need more practice 💪";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Volume2 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Pronunciation Practice</h1>
          </div>
          <p className="text-muted-foreground">Perfect your English pronunciation with AI feedback</p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{currentWord + 1}/{pronunciationWords.length}</div>
              <p className="text-sm text-muted-foreground">Word Progress</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-500">{progress}%</div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-500">{attempts}</div>
              <p className="text-sm text-muted-foreground">Attempts</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <div className="text-2xl font-bold text-yellow-500">
                  {Math.floor(progress / 20)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Words Mastered</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Practice Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{word.word}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={word.difficulty === "easy" ? "default" : word.difficulty === "medium" ? "secondary" : "destructive"}>
                  {word.difficulty}
                </Badge>
                <Badge variant="outline">{word.category}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Phonetic */}
            <div className="text-center mb-6">
              <div className="text-3xl font-mono mb-2 text-primary">{word.phonetic}</div>
              <Button variant="outline" onClick={playExample} className="gap-2">
                <Play className="h-4 w-4" />
                Listen to Example
              </Button>
            </div>

            {/* Tips */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">💡 Pronunciation Tips:</h4>
                <p className="text-sm text-muted-foreground mb-3">{word.tips}</p>
                
                <h4 className="font-semibold mb-2">⚠️ Common Mistakes:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {word.commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recording Section */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  size="lg"
                  className={`w-20 h-20 rounded-full ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}`}
                >
                  {isRecording ? (
                    <MicOff className="h-8 w-8" />
                  ) : (
                    <Mic className="h-8 w-8" />
                  )}
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {isRecording ? "Recording... Click to stop" : "Click to start recording"}
              </p>

              {/* Recording Feedback */}
              {recordedAudio && score !== null && (
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
                          {score}%
                        </div>
                        <p className="text-sm">{getScoreMessage(score)}</p>
                        
                        {/* Progress Bar */}
                        <div className="mt-4">
                          <Progress value={score} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-2 justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setRecordedAudio(null);
                        setScore(null);
                      }}
                    >
                      Try Again
                    </Button>
                    <Button onClick={nextWord}>
                      Next Word
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Overall Progress */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mastery Level</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
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

export default PronunciationPractice;