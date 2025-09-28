import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar,
  BookOpen,
  Headphones,
  PenTool,
  Trophy,
  Target,
  ChevronLeft,
  ChevronRight,
  CheckCircle
} from "lucide-react";

interface DayActivity {
  day: number;
  type: 'new' | 'review' | 'test' | 'rest';
  activity: string;
  status: 'completed' | 'current' | 'locked';
  skill?: 'reading' | 'listening' | 'writing' | 'vocabulary';
}

const StudyCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  
  // Study plan data based on the uploaded images (35-day plan to reach 300 TOEIC)
  const studyPlan: DayActivity[] = [
    // Week 1 (Days 1-7)
    { day: 1, type: 'new', activity: 'Giới thiệu chung về bài thi và phương pháp học', status: 'completed' },
    { day: 2, type: 'new', activity: 'Danh từ', status: 'completed', skill: 'vocabulary' },
    { day: 3, type: 'test', activity: 'Mini test 1', status: 'completed' },
    { day: 4, type: 'new', activity: 'Động từ', status: 'current', skill: 'vocabulary' },
    { day: 5, type: 'test', activity: 'Mini test 2', status: 'locked' },
    { day: 6, type: 'review', activity: 'Ôn lại bài Danh từ (Section 1 + 2: các loại danh từ; danh từ đếm được và danh từ không đếm được)', status: 'locked', skill: 'vocabulary' },
    { day: 7, type: 'test', activity: 'Mini test 1', status: 'locked' },
    
    // Week 2 (Days 8-14)
    { day: 8, type: 'new', activity: 'Tính từ và Trạng từ', status: 'locked', skill: 'vocabulary' },
    { day: 9, type: 'new', activity: 'Giới từ', status: 'locked', skill: 'vocabulary' },
    { day: 10, type: 'test', activity: 'Mini test 4', status: 'locked' },
    { day: 11, type: 'new', activity: 'Các mẫu câu', status: 'locked', skill: 'vocabulary' },
    { day: 12, type: 'review', activity: 'Trang từ (Section 3, 4 về Trang từ, vị trí của trang từ; sự khác biệt giữa tính từ và trang từ)', status: 'locked', skill: 'vocabulary' },
    { day: 13, type: 'new', activity: 'Giới từ (Chi tiết điểm và chi tiết thời gian)', status: 'locked', skill: 'vocabulary' },
    { day: 14, type: 'test', activity: 'Các mẫu câu Mini test 4', status: 'locked' },
    
    // Week 3 (Days 15-21)
    { day: 15, type: 'rest', activity: 'NGHỈ NGƠI', status: 'locked' },
    { day: 16, type: 'new', activity: 'Lesson 1 (Khoa học ứng cơ bản)', status: 'locked', skill: 'listening' },
    { day: 17, type: 'new', activity: 'Từ vựng về chủ đề Thể giới từ nhiền', status: 'locked', skill: 'vocabulary' },
    { day: 18, type: 'test', activity: 'Mini-test 1', status: 'locked' },
    { day: 19, type: 'new', activity: 'Từ vựng về chủ đề Hoạt động hàng ngày', status: 'locked', skill: 'vocabulary' },
    { day: 20, type: 'new', activity: 'Từ vựng về chủ đề Gia đình', status: 'locked', skill: 'vocabulary' },
    { day: 21, type: 'test', activity: 'Mini-test 2', status: 'locked' },
    
    // Week 4 (Days 22-28)
    { day: 22, type: 'new', activity: 'Từ vựng về chủ đề Kiến trúc và nội thất', status: 'locked', skill: 'vocabulary' },
    { day: 23, type: 'new', activity: 'Từ vựng về chủ đề Sức khỏe', status: 'locked', skill: 'vocabulary' },
    { day: 24, type: 'test', activity: 'Mini-test 3', status: 'locked' },
    { day: 25, type: 'new', activity: 'Từ vựng về chủ đề Đời sống sinh viên', status: 'locked', skill: 'vocabulary' },
    { day: 26, type: 'new', activity: 'Từ vựng về chủ đề Thời gian rảnh rỗi', status: 'locked', skill: 'vocabulary' },
    { day: 27, type: 'test', activity: 'Mini-test 4', status: 'locked' },
    { day: 28, type: 'new', activity: 'Từ vựng về chủ đề: Công việc và công nghiệp', status: 'locked', skill: 'vocabulary' },
    
    // Week 5 (Days 29-35)
    { day: 29, type: 'new', activity: 'Từ vựng về chủ đề Công nghệ', status: 'locked', skill: 'vocabulary' },
    { day: 30, type: 'test', activity: 'Mini test 5', status: 'locked' },
    { day: 31, type: 'new', activity: 'Từ vựng về chủ đề Email', status: 'locked', skill: 'vocabulary' },
    { day: 32, type: 'new', activity: 'Từ vựng về chủ đề Telephone', status: 'locked', skill: 'vocabulary' },
    { day: 33, type: 'test', activity: 'Final test', status: 'locked' },
    { day: 34, type: 'review', activity: 'Từ vựng về chủ đề Telephone Final test', status: 'locked', skill: 'vocabulary' },
    { day: 35, type: 'rest', activity: 'NGHỈ NGƠI', status: 'locked' }
  ];

  const getWeekDays = (week: number) => {
    const startDay = (week - 1) * 7;
    return studyPlan.slice(startDay, startDay + 7);
  };

  const getActivityIcon = (skill?: string) => {
    switch (skill) {
      case 'reading': return <BookOpen className="w-4 h-4" />;
      case 'listening': return <Headphones className="w-4 h-4" />;
      case 'writing': return <PenTool className="w-4 h-4" />;
      case 'vocabulary': return <Target className="w-4 h-4" />;
      default: return <Trophy className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string, skill?: string) => {
    if (type === 'test') return 'bg-toeic-warning';
    if (type === 'rest') return 'bg-gray-400';
    
    switch (skill) {
      case 'reading': return 'bg-toeic-success';
      case 'listening': return 'bg-toeic-blue';
      case 'writing': return 'bg-purple-500';
      case 'vocabulary': return 'bg-orange-500';
      default: return 'bg-toeic-navy';
    }
  };

  const getStatusBorder = (status: string) => {
    switch (status) {
      case 'completed': return 'border-toeic-success';
      case 'current': return 'border-toeic-blue border-2';
      case 'locked': return 'border-muted opacity-50';
      default: return 'border-muted';
    }
  };

  const totalWeeks = Math.ceil(studyPlan.length / 7);
  const completedDays = studyPlan.filter(day => day.status === 'completed').length;
  const progressPercentage = (completedDays / studyPlan.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-toeic-blue/10 text-toeic-blue px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Calendar className="w-4 h-4" />
          <span>Lộ trình 35 ngày</span>
        </div>
        <h2 className="text-3xl font-bold text-toeic-navy mb-2">
          TOEIC Study Plan - Mục tiêu 300 điểm
        </h2>
        <p className="text-muted-foreground mb-4">
          Lộ trình học tập có cấu trúc từ cơ bản đến nâng cao
        </p>
        
        {/* Overall Progress */}
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Tiến trình tổng thể</span>
              <span className="text-sm text-muted-foreground">
                {completedDays}/{studyPlan.length} ngày
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
          disabled={currentWeek === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Badge variant="outline" className="px-4 py-2">
          Tuần {currentWeek} / {totalWeeks}
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentWeek(Math.min(totalWeeks, currentWeek + 1))}
          disabled={currentWeek === totalWeeks}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {getWeekDays(currentWeek).map((day) => (
          <Card 
            key={day.day} 
            className={`relative cursor-pointer transition-all hover:shadow-md ${getStatusBorder(day.status)}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge className={`${getActivityColor(day.type, day.skill)} text-white text-xs`}>
                  Day {day.day}
                </Badge>
                {day.status === 'completed' && (
                  <CheckCircle className="w-4 h-4 text-toeic-success" />
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  {getActivityIcon(day.skill)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">
                      {day.activity}
                    </p>
                  </div>
                </div>
                
                {day.skill && (
                  <Badge variant="outline" className="text-xs">
                    {day.skill === 'vocabulary' && 'Từ vựng'}
                    {day.skill === 'reading' && 'Đọc hiểu'}
                    {day.skill === 'listening' && 'Nghe hiểu'}
                    {day.skill === 'writing' && 'Viết'}
                  </Badge>
                )}
                
                {day.status === 'current' && (
                  <Button 
                    size="sm" 
                    variant="hero" 
                    className="w-full text-xs"
                    onClick={() => {
                      // Navigate to different lesson types based on skill
                      const lessonType = day.skill === 'listening' ? 'listening' :
                                       day.skill === 'writing' ? 'writing' :
                                       day.skill === 'vocabulary' ? 'detailed-lesson' :
                                       'reading';
                      window.location.href = `/lesson/${lessonType}`;
                    }}
                  >
                    Bắt đầu học
                  </Button>
                )}
                
                {day.status === 'locked' && (
                  <div className="text-xs text-muted-foreground text-center">
                    Chưa mở khóa
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Chú thích</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-toeic-success"></div>
              <span>Đọc hiểu (Reading)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-toeic-blue"></div>
              <span>Nghe hiểu (Listening)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-orange-500"></div>
              <span>Từ vựng (Vocabulary)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-toeic-warning"></div>
              <span>Kiểm tra (Test)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyCalendar;