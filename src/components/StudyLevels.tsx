import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  Target, 
  Star, 
  Clock, 
  BookOpen, 
  Headphones, 
  PenTool, 
  Award,
  CheckCircle,
  ArrowRight,
  Users
} from "lucide-react";

const StudyLevels = () => {
  const navigate = useNavigate();
  const levels = [
    {
      id: 'A1',
      name: 'A1 - Cơ bản',
      description: 'Dành cho người mới bắt đầu học tiếng Anh',
      color: 'bg-green-500',
      progress: 85,
      duration: '2-3 tháng',
      targetScore: '300-400 điểm TOEIC',
      skills: [
        { name: 'Từ vựng cơ bản', icon: BookOpen, level: 'Cần thiết' },
        { name: 'Ngữ pháp đơn giản', icon: PenTool, level: 'Cần thiết' },
        { name: 'Nghe hiểu cơ bản', icon: Headphones, level: 'Cần thiết' }
      ],
      lessons: [
        'Giới thiệu bản thân',
        'Gia đình và bạn bè', 
        'Công việc hàng ngày',
        'Mua sắm cơ bản',
        'Thời gian và ngày tháng'
      ],
      completed: 17,
      total: 20
    },
    {
      id: 'A2',
      name: 'A2 - Sơ cấp',
      description: 'Phát triển kỹ năng giao tiếp thường ngày',
      color: 'bg-blue-500',
      progress: 45,
      duration: '3-4 tháng',
      targetScore: '400-600 điểm TOEIC',
      skills: [
        { name: 'Giao tiếp thường ngày', icon: Users, level: 'Phát triển' },
        { name: 'Đọc hiểu văn bản ngắn', icon: BookOpen, level: 'Phát triển' },
        { name: 'Viết email đơn giản', icon: PenTool, level: 'Phát triển' }
      ],
      lessons: [
        'Giao tiếp điện thoại',
        'Đặt lịch hẹn',
        'Thảo luận kế hoạch',
        'Mô tả trải nghiệm',
        'Đưa ra ý kiến'
      ],
      completed: 9,
      total: 20
    },
    {
      id: 'B1',
      name: 'B1 - Trung cấp',
      description: 'Làm chủ tiếng Anh trong môi trường làm việc',
      color: 'bg-purple-500',
      progress: 0,
      duration: '4-6 tháng',
      targetScore: '600-785 điểm TOEIC',
      skills: [
        { name: 'Thuyết trình công việc', icon: Users, level: 'Nâng cao' },
        { name: 'Đọc báo cáo kinh doanh', icon: BookOpen, level: 'Nâng cao' },
        { name: 'Viết email chuyên nghiệp', icon: PenTool, level: 'Nâng cao' }
      ],
      lessons: [
        'Họp và thảo luận',
        'Thuyết trình dự án',
        'Đàm phán kinh doanh',
        'Báo cáo kết quả',
        'Giải quyết vấn đề'
      ],
      completed: 0,
      total: 25
    }
  ];

  const getCurrentLevel = () => {
    return levels.find(level => level.progress > 0 && level.progress < 100) || levels[0];
  };

  const currentLevel = getCurrentLevel();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-toeic-blue to-toeic-success rounded-full flex items-center justify-center mx-auto">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-toeic-navy">Lộ trình học theo cấp độ</h1>
          <p className="text-lg text-muted-foreground">
            Phát triển kỹ năng tiếng Anh từ cơ bản đến thành thạo
          </p>
        </div>
      </div>

      {/* Current Level Progress */}
      <Card className="bg-gradient-to-r from-toeic-blue/10 to-toeic-success/10 border-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-toeic-navy">
                Cấp độ hiện tại: {currentLevel.name}
              </CardTitle>
              <CardDescription className="text-base">
                {currentLevel.description}
              </CardDescription>
            </div>
            <Badge className={`${currentLevel.color} text-white px-4 py-2`}>
              {currentLevel.progress}% hoàn thành
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={currentLevel.progress} className="h-3" />
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-toeic-blue">
                  {currentLevel.completed}/{currentLevel.total}
                </div>
                <p className="text-sm text-muted-foreground">Bài học</p>
              </div>
              <div className="p-3 bg-white/50 rounded-lg">
                <div className="text-lg font-bold text-toeic-success">
                  {currentLevel.duration}
                </div>
                <p className="text-sm text-muted-foreground">Thời gian dự kiến</p>
              </div>
              <div className="p-3 bg-white/50 rounded-lg">
                <div className="text-sm font-bold text-toeic-warning">
                  {currentLevel.targetScore}
                </div>
                <p className="text-sm text-muted-foreground">Mục tiêu điểm số</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level Details */}
      <div className="grid gap-6">
        {levels.map((level, index) => (
          <Card key={level.id} className={`${level.progress === 100 ? 'bg-green-50 border-green-200' : level.progress > 0 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${level.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {level.id}
                  </div>
                  <div>
                    <CardTitle className="text-xl text-toeic-navy">{level.name}</CardTitle>
                    <CardDescription className="text-base">{level.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {level.progress === 100 && (
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Hoàn thành
                    </Badge>
                  )}
                  {level.progress > 0 && level.progress < 100 && (
                    <Badge className="bg-blue-500 text-white">
                      Đang học
                    </Badge>
                  )}
                  {level.progress === 0 && (
                    <Badge variant="outline">
                      Chưa bắt đầu
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Skills */}
                <div>
                  <h4 className="font-semibold text-toeic-navy mb-3 flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    Kỹ năng trọng tâm
                  </h4>
                  <div className="space-y-2">
                    {level.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center justify-between p-2 bg-white/50 rounded">
                        <div className="flex items-center space-x-2">
                          <skill.icon className="w-4 h-4 text-toeic-blue" />
                          <span className="text-sm">{skill.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {skill.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lessons */}
                <div>
                  <h4 className="font-semibold text-toeic-navy mb-3 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Chủ đề bài học
                  </h4>
                  <div className="space-y-1">
                    {level.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="flex items-center space-x-2 p-2 bg-white/30 rounded text-sm">
                        {lessonIndex < level.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : lessonIndex === level.completed ? (
                          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                        )}
                        <span className={lessonIndex < level.completed ? 'text-muted-foreground line-through' : ''}>{lesson}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-6">
                {level.progress > 0 && level.progress < 100 && (
                  <Button 
                    variant="hero"
                    onClick={() => navigate('/lesson/reading')}
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Tiếp tục học
                  </Button>
                )}
                <Button size="sm" onClick={() => navigate('/lesson/reading')}>
                  Bài đọc hiểu
                </Button>
                <Button size="sm" onClick={() => navigate('/lesson/listening')}>
                  Bài luyện nghe
                </Button>
                <Button size="sm" onClick={() => navigate('/lesson/writing')}>
                  Bài tập viết
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigate('/lesson/conversation')}>
                  Luyện giao tiếp
                </Button>
                {level.progress === 0 && index === levels.findIndex(l => l.progress > 0 && l.progress < 100) + 1 && (
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/lesson/reading')}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Bắt đầu cấp độ này
                  </Button>
                )}
                {level.progress === 100 && (
                  <Button variant="outline">
                    <Award className="w-4 h-4 mr-2" />
                    Xem chứng chỉ
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    // Switch to roadmap tab
                    const tabsTrigger = document.querySelector('[value="roadmap"]') as HTMLElement;
                    if (tabsTrigger) {
                      tabsTrigger.click();
                    }
                  }}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Chi tiết lộ trình 25 ngày
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudyLevels;