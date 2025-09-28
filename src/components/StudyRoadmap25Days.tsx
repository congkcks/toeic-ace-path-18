import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Target, 
  Star, 
  Clock, 
  BookOpen, 
  Headphones, 
  PenTool, 
  CheckCircle,
  ArrowRight,
  Play,
  Trophy,
  Bookmark
} from "lucide-react";

const StudyRoadmap25Days = () => {
  const navigate = useNavigate();
  const weeks = [
    {
      week: 1,
      title: "Tuần 1: Nền tảng từ vựng",
      days: [
        { day: 1, topic: "Giới thiệu bản thân", status: "completed", score: 92 },
        { day: 2, topic: "Gia đình và quan hệ", status: "completed", score: 88 },
        { day: 3, topic: "Công việc hàng ngày", status: "completed", score: 85 },
        { day: 4, topic: "Thời gian và lịch trình", status: "current", score: null },
        { day: 5, topic: "Thực phẩm và đồ uống", status: "locked", score: null },
        { day: 6, topic: "Mua sắm cơ bản", status: "locked", score: null },
        { day: 7, topic: "Ôn tập tuần 1", status: "locked", score: null }
      ]
    },
    {
      week: 2,
      title: "Tuần 2: Giao tiếp thường ngày",
      days: [
        { day: 8, topic: "Hỏi đường và chỉ đường", status: "locked", score: null },
        { day: 9, topic: "Gọi điện thoại", status: "locked", score: null },
        { day: 10, topic: "Đặt lịch hẹn", status: "locked", score: null },
        { day: 11, topic: "Thảo luận kế hoạch", status: "locked", score: null },
        { day: 12, topic: "Mô tả trải nghiệm", status: "locked", score: null },
        { day: 13, topic: "Đưa ra ý kiến", status: "locked", score: null },
        { day: 14, topic: "Kiểm tra giữa khóa", status: "locked", score: null }
      ]
    },
    {
      week: 3,
      title: "Tuần 3: Kỹ năng nghe nâng cao",
      days: [
        { day: 15, topic: "Nghe hội thoại công việc", status: "locked", score: null },
        { day: 16, topic: "Nghe thông báo", status: "locked", score: null },
        { day: 17, topic: "Nghe báo cáo", status: "locked", score: null },
        { day: 18, topic: "Nghe thuyết trình", status: "locked", score: null },
        { day: 19, topic: "Nghe phỏng vấn", status: "locked", score: null },
        { day: 20, topic: "Luyện nghe tổng hợp", status: "locked", score: null },
        { day: 21, topic: "Ôn tập tuần 3", status: "locked", score: null }
      ]
    },
    {
      week: 4,
      title: "Tuần 4: Tổng hợp và thực hành",
      days: [
        { day: 22, topic: "Thi thử TOEIC Listening", status: "locked", score: null },
        { day: 23, topic: "Thi thử TOEIC Reading", status: "locked", score: null },
        { day: 24, topic: "Phân tích kết quả", status: "locked", score: null },
        { day: 25, topic: "Hoàn thành khóa học", status: "locked", score: null }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "current":
        return <Play className="w-4 h-4 text-blue-500" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200";
      case "current":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const completedDays = weeks.flatMap(week => week.days).filter(day => day.status === "completed").length;
  const totalDays = weeks.flatMap(week => week.days).length;
  const progressPercentage = Math.round((completedDays / totalDays) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-toeic-blue to-toeic-success rounded-full flex items-center justify-center mx-auto">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-toeic-navy">Lộ trình 25 ngày</h1>
          <p className="text-lg text-muted-foreground">
            Học tiếng Anh hiệu quả với chương trình được thiết kế khoa học
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-toeic-blue/10 to-toeic-success/10 border-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-toeic-navy">
                Tiến độ học tập
              </CardTitle>
              <CardDescription className="text-base">
                Bạn đã hoàn thành {completedDays}/{totalDays} ngày học
              </CardDescription>
            </div>
            <Badge className="bg-toeic-blue text-white px-4 py-2">
              {progressPercentage}% hoàn thành
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progressPercentage} className="h-3" />
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-toeic-blue">
                  {completedDays}
                </div>
                <p className="text-sm text-muted-foreground">Ngày đã học</p>
              </div>
              <div className="p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-toeic-success">
                  {weeks.flatMap(w => w.days).filter(d => d.score).reduce((acc, d) => acc + (d.score || 0), 0) / completedDays || 0}%
                </div>
                <p className="text-sm text-muted-foreground">Điểm trung bình</p>
              </div>
              <div className="p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-toeic-warning">
                  {totalDays - completedDays}
                </div>
                <p className="text-sm text-muted-foreground">Ngày còn lại</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Breakdown */}
      <div className="grid gap-6">
        {weeks.map((week, weekIndex) => (
          <Card key={week.week} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-toeic-navy flex items-center gap-2">
                    <div className="w-8 h-8 bg-toeic-blue rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {week.week}
                    </div>
                    {week.title}
                  </CardTitle>
                  <CardDescription>
                    Ngày {week.days[0].day} - {week.days[week.days.length - 1].day}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-toeic-blue border-toeic-blue">
                  {week.days.filter(d => d.status === "completed").length}/{week.days.length} hoàn thành
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {week.days.map((day, dayIndex) => (
                  <div key={day.day} className={`p-4 rounded-lg border transition-all ${getStatusColor(day.status)}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(day.status)}
                        <div>
                          <div className="font-medium text-toeic-navy">
                            Ngày {day.day}: {day.topic}
                          </div>
                          {day.score && (
                            <div className="text-sm text-muted-foreground">
                              Điểm: {day.score}/100
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {day.status === "completed" && (
                          <Badge className="bg-green-500 text-white">
                            <Trophy className="w-3 h-3 mr-1" />
                            Hoàn thành
                          </Badge>
                        )}
                        {day.status === "current" && (
                          <Button 
                            size="sm"
                            onClick={() => {
                              // Navigate to different lesson types based on day number
                              const lessonType = day.day % 3 === 0 ? 'writing' : 
                                               day.day % 2 === 0 ? 'listening' : 'reading';
                              navigate(`/lesson/${lessonType}`);
                            }}
                          >
                            <ArrowRight className="w-4 h-4 mr-2" />
                            Học ngay
                          </Button>
                        )}
                        {day.status === "locked" && (
                          <Button size="sm" variant="outline" disabled>
                            <Bookmark className="w-4 h-4 mr-2" />
                            Chưa mở
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button 
          variant="hero" 
          size="lg"
          onClick={() => navigate('/lesson/reading')}
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          Tiếp tục học tập
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => {
            const tabsTrigger = document.querySelector('[value="levels"]') as HTMLElement;
            if (tabsTrigger) {
              tabsTrigger.click();
            }
          }}
        >
          <Target className="w-4 h-4 mr-2" />
          Xem lộ trình cấp độ
        </Button>
      </div>
    </div>
  );
};

export default StudyRoadmap25Days;