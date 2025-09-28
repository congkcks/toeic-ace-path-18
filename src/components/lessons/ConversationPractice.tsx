import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Send, 
  RotateCcw, 
  Clock,
  Users,
  Globe,
  Briefcase,
  GraduationCap,
  Home,
  Coffee,
  Plane,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ConversationPractice = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'ai', timestamp: Date}>>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  const conversationTopics = [
    {
      id: "business",
      title: "Business & Work",
      description: "Thảo luận về công việc, cuộc họp, và môi trường kinh doanh",
      icon: <Briefcase className="w-5 h-5" />,
      level: "Intermediate",
      color: "blue"
    },
    {
      id: "travel",
      title: "Travel & Tourism",
      description: "Luyện tập về du lịch, đặt phòng, và hỏi đường",
      icon: <Plane className="w-5 h-5" />,
      level: "Beginner",
      color: "green"
    },
    {
      id: "education",
      title: "Education & Learning",
      description: "Thảo luận về học tập, trường học, và kế hoạch giáo dục",
      icon: <GraduationCap className="w-5 h-5" />,
      level: "Intermediate",
      color: "purple"
    },
    {
      id: "daily",
      title: "Daily Life",
      description: "Cuộc sống hàng ngày, mua sắm, và hoạt động thường nhật",
      icon: <Home className="w-5 h-5" />,
      level: "Beginner",
      color: "orange"
    },
    {
      id: "social",
      title: "Social & Networking",
      description: "Giao tiếp xã hội, làm quen bạn mới, và networking",
      icon: <Users className="w-5 h-5" />,
      level: "Advanced",
      color: "pink"
    },
    {
      id: "culture",
      title: "Culture & Society",
      description: "Thảo luận về văn hóa, truyền thống, và xã hội",
      icon: <Globe className="w-5 h-5" />,
      level: "Advanced",
      color: "cyan"
    }
  ];

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    const topic = conversationTopics.find(t => t.id === topicId);
    const welcomeMessage = {
      id: Date.now().toString(),
      text: `Hello! I'm your AI conversation partner. Let's practice talking about ${topic?.title}. What would you like to discuss?`,
      sender: 'ai' as const,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: "That's a great point! Can you tell me more about your experience with that?",
        sender: 'ai' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const resetConversation = () => {
    setMessages([]);
    setSelectedTopic(null);
    setSessionTime(0);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!selectedTopic) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/study-plan')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại lộ trình học tập
            </Button>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary mb-4">
                Luyện giao tiếp với AI
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Chọn chủ đề và bắt đầu cuộc trò chuyện với trợ lý AI để cải thiện kỹ năng giao tiếp tiếng Anh
              </p>
            </div>
          </div>

          {/* Topic Selection */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conversationTopics.map((topic) => (
              <Card 
                key={topic.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleTopicSelect(topic.id)}
              >
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    {topic.icon}
                  </div>
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                  <Badge className={getLevelColor(topic.level)}>
                    {topic.level}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {topic.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <MessageCircle className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Trò chuyện tự nhiên</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  AI sẽ đáp ứng theo ngữ cảnh và giúp bạn luyện tập giao tiếp thực tế
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Mic className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Hỗ trợ giọng nói</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Luyện tập phát âm và nghe với chức năng nhận diện giọng nói
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Clock className="w-8 h-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Theo dõi tiến độ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Thống kê thời gian luyện tập và số lượng cuộc hội thoại
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const currentTopic = conversationTopics.find(t => t.id === selectedTopic);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={resetConversation}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Chọn chủ đề khác
              </Button>
              <div>
                <h2 className="font-semibold">{currentTopic?.title}</h2>
                <p className="text-sm text-muted-foreground">AI Conversation Partner</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getLevelColor(currentTopic?.level || "")}>
                {currentTopic?.level}
              </Badge>
              <Button variant="outline" size="sm" onClick={resetConversation}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Bắt đầu lại
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="container mx-auto px-6 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Chat Messages */}
          <Card className="lg:col-span-3 flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/ai-avatar.png" />
                    <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">AI Conversation Partner</h3>
                    <p className="text-sm text-muted-foreground">Trực tuyến</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {Math.floor(sessionTime / 60)}:{(sessionTime % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <Separator className="my-4" />

              {/* Input Area */}
              <div className="flex gap-2">
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="icon"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Input
                  placeholder="Nhập tin nhắn..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Side Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Gợi ý cuộc hội thoại</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Bắt đầu cuộc trò chuyện:</p>
                  <p className="text-sm text-muted-foreground">
                    "Can you tell me about..."
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Đặt câu hỏi:</p>
                  <p className="text-sm text-muted-foreground">
                    "What do you think about..."
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Chia sẻ kinh nghiệm:</p>
                  <p className="text-sm text-muted-foreground">
                    "In my experience..."
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Đưa ra ý kiến:</p>
                  <p className="text-sm text-muted-foreground">
                    "I believe that..."
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h4 className="font-medium mb-3">Thống kê phiên</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tin nhắn:</span>
                    <span>{messages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chủ đề:</span>
                    <span>{currentTopic?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cấp độ:</span>
                    <span>{currentTopic?.level}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConversationPractice;