import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Target, 
  Trophy,
  CheckCircle,
  ArrowRight,
  Play,
  Clock,
  Bookmark,
  BookOpen
} from "lucide-react";
import { apiService, LearningPlan, Exercise } from "@/services/api";
import { format, parseISO, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { vi } from "date-fns/locale";


interface DayData {
  day: number;
  topic: string;
  status: 'completed' | 'current' | 'locked';
  score: number | null;
  plan: LearningPlan;
  exercise?: Exercise;
}

interface WeekData {
  week: number;
  title: string;
  days: DayData[];
}

const StudyRoadmap25Days = () => {
  const navigate = useNavigate();
  const [learningPlan, setLearningPlan] = useState<LearningPlan[]>([]);
  const [exercises, setExercises] = useState<Map<number, Exercise>>(new Map());
  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRoadmapData();
  }, []);

  const fetchRoadmapData = async () => {
    try {
      setLoading(true);
      const userId = apiService.getCurrentUserId();
      
      if (!userId) {
        setError('Vui lòng đăng nhập để xem lộ trình học tập');
        return;
      }

      const planData = await apiService.getLearningPlan(userId);
      setLearningPlan(planData);

      // Fetch exercise details
      const exerciseMap = new Map<number, Exercise>();
      for (const plan of planData) {
        try {
          const exercise = await apiService.getExerciseById(plan.exerciseId);
          exerciseMap.set(plan.exerciseId, exercise);
        } catch (err) {
          console.error(`Failed to fetch exercise ${plan.exerciseId}:`, err);
        }
      }
      setExercises(exerciseMap);

      // Group into weeks
      const sortedPlans = [...planData].sort((a, b) => 
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );

      const weekGroups: WeekData[] = [];
      let currentWeek: DayData[] = [];
      let weekNumber = 1;
      
      sortedPlans.forEach((plan, index) => {
        const exercise = exerciseMap.get(plan.exerciseId);
        const dayData: DayData = {
          day: index + 1,
          topic: exercise?.title || exercise?.topic || `Bài ${index + 1}`,
          status: plan.status === 'Completed' ? 'completed' : 
                  plan.status === 'InProgress' ? 'current' : 'locked',
          score: null, // Score sẽ được lấy từ submissions nếu cần
          plan,
          exercise
        };

        currentWeek.push(dayData);

        // Group by 7 days per week
        if (currentWeek.length === 7 || index === sortedPlans.length - 1) {
          weekGroups.push({
            week: weekNumber,
            title: `Tuần ${weekNumber}: ${getWeekTitle(weekNumber)}`,
            days: currentWeek
          });
          currentWeek = [];
          weekNumber++;
        }
      });

      setWeeks(weekGroups);
    } catch (err) {
      setError('Không thể tải lộ trình học tập. Vui lòng thử lại.');
      console.error('Error fetching roadmap data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getWeekTitle = (weekNum: number): string => {
    const titles = [
      'Nền tảng từ vựng',
      'Giao tiếp thường ngày', 
      'Kỹ năng nghe nâng cao',
      'Tổng hợp và thực hành'
    ];
    return titles[weekNum - 1] || 'Học tập';
  };

  const handleStartExercise = (dayData: DayData) => {
    if (!dayData.exercise) return;

    switch (dayData.exercise.exerciseType) {
      case 'Reading':
        navigate(`/reading-lesson/${dayData.exercise.id}`);
        break;
      case 'Listening':
        navigate(`/listening-lesson/${dayData.exercise.id}`);
        break;
      case 'Writing':
        navigate(`/writing-lesson/${dayData.exercise.id}`);
        break;
      case 'Speaking':
        navigate(`/speaking-challenge/${dayData.exercise.id}`);
        break;
      default:
        navigate(`/lesson/${dayData.exercise.id}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "current":
        return <Play className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 border-green-200";
      case "current":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-muted border-border";
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-muted rounded-lg"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-muted rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={fetchRoadmapData}>Thử lại</Button>
        </CardContent>
      </Card>
    );
  }

  if (weeks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Chưa có lộ trình học tập nào.</p>
        </CardContent>
      </Card>
    );
  }

  const completedDays = weeks.flatMap(week => week.days).filter(day => day.status === "completed").length;
  const totalDays = weeks.flatMap(week => week.days).length;
  const progressPercentage = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/60 rounded-full flex items-center justify-center mx-auto">
          <Calendar className="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Lộ trình học tập</h1>
          <p className="text-lg text-muted-foreground">
            Học tiếng Anh hiệu quả với chương trình được cá nhân hóa
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">
                Tiến độ học tập
              </CardTitle>
              <CardDescription className="text-base">
                Bạn đã hoàn thành {completedDays}/{totalDays} ngày học
              </CardDescription>
            </div>
            <Badge className="px-4 py-2">
              {progressPercentage}% hoàn thành
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progressPercentage} className="h-3" />
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {completedDays}
                </div>
                <p className="text-sm text-muted-foreground">Ngày đã học</p>
              </div>
              <div className="p-3 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {totalDays}
                </div>
                <p className="text-sm text-muted-foreground">Tổng số ngày</p>
              </div>
              <div className="p-3 bg-background/50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
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
        {weeks.map((week) => (
          <Card key={week.week} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {week.week}
                    </div>
                    {week.title}
                  </CardTitle>
                  <CardDescription>
                    Ngày {week.days[0].day} - {week.days[week.days.length - 1].day}
                  </CardDescription>
                </div>
                <Badge variant="outline">
                  {week.days.filter(d => d.status === "completed").length}/{week.days.length} hoàn thành
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {week.days.map((day) => (
                  <div key={day.day} className={`p-4 rounded-lg border transition-all ${getStatusColor(day.status)}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(day.status)}
                        <div>
                          <div className="font-medium">
                            Ngày {day.day}: {day.topic}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {day.exercise?.exerciseType || 'Bài học'}
                            {day.plan.startTime && ` • ${format(parseISO(day.plan.startTime), 'dd/MM/yyyy')}`}
                          </div>
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
                            onClick={() => handleStartExercise(day)}
                            disabled={!day.exercise}
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
          variant="default" 
          size="lg"
          onClick={() => {
            const currentDay = weeks.flatMap(w => w.days).find(d => d.status === "current");
            if (currentDay) {
              handleStartExercise(currentDay);
            } else {
              navigate('/dashboard');
            }
          }}
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          Tiếp tục học tập
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => navigate('/dashboard')}
        >
          <Target className="w-4 h-4 mr-2" />
          Xem dashboard
        </Button>
      </div>
    </div>
  );
};

export default StudyRoadmap25Days;