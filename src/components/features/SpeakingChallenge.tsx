import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { Mic, MicOff, Trophy, Users, Clock, Flame, Crown } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  prompt: string;
  timeLimit: number; // in seconds
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  points: number;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  avatar: string;
  badge: string;
}

const SpeakingChallenge = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [challengeComplete, setChallengeComplete] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const challenges: Challenge[] = [
    {
      id: "1",
      title: "Elevator Pitch",
      description: "Introduce yourself and your business idea in 60 seconds",
      prompt: "You're in an elevator with a potential investor. You have 60 seconds to pitch your innovative app idea. Be confident, clear, and persuasive!",
      timeLimit: 60,
      difficulty: "intermediate",
      category: "Business",
      points: 150
    },
    {
      id: "2",
      title: "Product Presentation",
      description: "Present a new product to potential customers",
      prompt: "Present your company's new eco-friendly smartphone to a group of environmentally conscious consumers. Highlight key features and benefits.",
      timeLimit: 90,
      difficulty: "advanced",
      category: "Presentation",
      points: 200
    },
    {
      id: "3",
      title: "Customer Service",
      description: "Handle a customer complaint professionally",
      prompt: "A customer is upset about a delayed shipment. Address their concerns professionally and offer solutions to maintain good customer relations.",
      timeLimit: 45,
      difficulty: "intermediate",
      category: "Service",
      points: 120
    },
    {
      id: "4",
      title: "Job Interview",
      description: "Answer common interview questions confidently",
      prompt: "You're interviewing for your dream job. Answer this question: 'Tell me about a challenging project you worked on and how you overcame obstacles.'",
      timeLimit: 75,
      difficulty: "advanced",
      category: "Career",
      points: 180
    },
    {
      id: "5",
      title: "Team Meeting",
      description: "Present weekly progress to your team",
      prompt: "Lead a weekly team meeting. Update your colleagues on project progress, discuss challenges, and assign next week's tasks.",
      timeLimit: 90,
      difficulty: "advanced",
      category: "Leadership",
      points: 220
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    { id: "1", name: "Sarah Chen", score: 2850, avatar: "👩‍💼", badge: "Speaking Master" },
    { id: "2", name: "Mike Johnson", score: 2720, avatar: "👨‍💻", badge: "Presentation Pro" },
    { id: "3", name: "Emma Davis", score: 2680, avatar: "👩‍🎓", badge: "Communication Expert" },
    { id: "4", name: "Alex Kim", score: 2590, avatar: "👨‍💼", badge: "Business Speaker" },
    { id: "5", name: "Lisa Wang", score: 2450, avatar: "👩‍🔬", badge: "Fluency Champion" }
  ];

  const challenge = challenges[currentChallenge];

  useEffect(() => {
    if (isRecording && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isRecording) {
      stopRecording();
    }
  }, [timeLeft, isRecording]);

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
        
        // Simulate AI scoring
        const baseScore = Math.floor(Math.random() * 30) + 70; // 70-100
        const difficultyMultiplier = challenge.difficulty === "advanced" ? 1.2 : challenge.difficulty === "intermediate" ? 1.1 : 1.0;
        const finalScore = Math.floor(baseScore * difficultyMultiplier);
        const points = Math.floor((finalScore / 100) * challenge.points);
        
        setUserScore(finalScore);
        setTotalPoints(prev => prev + points);
        setChallengeComplete(true);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTimeLeft(challenge.timeLimit);
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

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
    } else {
      setCurrentChallenge(0);
    }
    setRecordedAudio(null);
    setUserScore(0);
    setChallengeComplete(false);
    setTimeLeft(challenge.timeLimit);
  };

  const resetChallenge = () => {
    setRecordedAudio(null);
    setUserScore(0);
    setChallengeComplete(false);
    setTimeLeft(challenge.timeLimit);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-500";
      case "intermediate": return "bg-yellow-500";
      case "advanced": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getRank = () => {
    const userPosition = leaderboard.findIndex(entry => totalPoints > entry.score);
    return userPosition === -1 ? leaderboard.length + 1 : userPosition + 1;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mic className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Speaking Challenge Arena</h1>
          </div>
          <p className="text-muted-foreground">Compete with others and improve your speaking skills!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Challenge Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{totalPoints}</div>
                  <p className="text-xs text-muted-foreground">Total Points</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <div className="text-2xl font-bold text-yellow-500">#{getRank()}</div>
                  </div>
                  <p className="text-xs text-muted-foreground">Rank</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-500">{currentChallenge + 1}/{challenges.length}</div>
                  <p className="text-xs text-muted-foreground">Challenge</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <div className="text-2xl font-bold text-orange-500">5</div>
                  </div>
                  <p className="text-xs text-muted-foreground">Streak</p>
                </CardContent>
              </Card>
            </div>

            {/* Challenge Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{challenge.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="outline">{challenge.category}</Badge>
                    <Badge variant="secondary">{challenge.points} pts</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="font-semibold mb-2">Challenge:</h4>
                    <p className="text-muted-foreground">{challenge.description}</p>
                  </div>

                  {/* Prompt */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Your Scenario:</h4>
                    <p className="leading-relaxed">{challenge.prompt}</p>
                  </div>

                  {/* Recording Section */}
                  <div className="text-center space-y-4">
                    {/* Timer */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span className="text-lg font-semibold">
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Recording Button */}
                    <div className="flex justify-center">
                      <Button
                        onClick={isRecording ? stopRecording : startRecording}
                        size="lg"
                        disabled={challengeComplete}
                        className={`w-24 h-24 rounded-full ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-primary hover:bg-primary/90'}`}
                      >
                        {isRecording ? (
                          <MicOff className="h-8 w-8" />
                        ) : (
                          <Mic className="h-8 w-8" />
                        )}
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {isRecording ? "Recording... Click to stop" : challengeComplete ? "Challenge Complete!" : "Click to start speaking"}
                    </p>

                    {/* Progress Bar */}
                    {isRecording && (
                      <div className="max-w-xs mx-auto">
                        <Progress value={((challenge.timeLimit - timeLeft) / challenge.timeLimit) * 100} className="h-2" />
                      </div>
                    )}

                    {/* Results */}
                    {challengeComplete && (
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center space-y-3">
                            <div className={`text-4xl font-bold ${getScoreColor(userScore)}`}>
                              {userScore}%
                            </div>
                            <p className="text-sm">
                              You earned <strong>{Math.floor((userScore / 100) * challenge.points)} points!</strong>
                            </p>
                            
                            <div className="flex gap-2 justify-center">
                              <Button variant="outline" onClick={resetChallenge}>
                                Retry
                              </Button>
                              <Button onClick={nextChallenge}>
                                Next Challenge
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => (
                    <div key={entry.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        {index === 0 && <Crown className="h-4 w-4 text-yellow-500" />}
                        <span className="text-sm font-semibold w-6">#{index + 1}</span>
                      </div>
                      <Avatar className="w-8 h-8">
                        <div className="text-lg">{entry.avatar}</div>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{entry.name}</p>
                        <p className="text-xs text-muted-foreground">{entry.badge}</p>
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        {entry.score.toLocaleString()}
                      </div>
                    </div>
                  ))}
                  
                  {/* User's Position */}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-primary/10">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold w-6">#{getRank()}</span>
                      </div>
                      <Avatar className="w-8 h-8">
                        <div className="text-lg">👤</div>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">You</p>
                        <p className="text-xs text-muted-foreground">Rising Star</p>
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        {totalPoints.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Challenge */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span className="text-sm font-semibold">Debate Master</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Complete 10 speaking challenges this week for bonus points!
                  </p>
                  <Progress value={30} className="h-2" />
                  <p className="text-xs text-muted-foreground">3/10 completed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingChallenge;