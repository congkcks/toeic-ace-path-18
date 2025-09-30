import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Target, 
  BookOpen, 
  TrendingUp, 
  Clock,
  Award,
  Flame
} from "lucide-react";
import { apiService, DashboardStats, Badge as UserBadge } from "@/services/api";

const UserProgressDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const userId = apiService.getCurrentUserId();

      const [dashboardStats, userBadges] = await Promise.all([
        apiService.getDashboardStats(userId),
        apiService.getUserBadges(userId)
      ]);

      setDashboardData(dashboardStats);
      setBadges(userBadges);
    } catch (err) {
      setError('Không thể tải dữ liệu. Vui lòng thử lại.');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-destructive mb-4">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Thử lại
          </button>
        </CardContent>
      </Card>
    );
  }

  if (!dashboardData) return null;

  const completionRate = Math.round((dashboardData.completedExercises / dashboardData.totalExercises) * 100);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chuỗi ngày học</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.streakDays}</div>
            <p className="text-xs text-muted-foreground">ngày liên tiếp</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Điểm tổng</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalScore}</div>
            <p className="text-xs text-muted-foreground">điểm TOEIC ước tính</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bài học hoàn thành</CardTitle>
            <BookOpen className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.completedExercises}/{dashboardData.totalExercises}
            </div>
            <p className="text-xs text-muted-foreground">{completionRate}% hoàn thành</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giờ học tập</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.studyHours}</div>
            <p className="text-xs text-muted-foreground">giờ tổng cộng</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Skills Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tiến độ theo kỹ năng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Listening (Nghe)</span>
                <span>{dashboardData.progress.listening}%</span>
              </div>
              <Progress value={dashboardData.progress.listening} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Reading (Đọc)</span>
                <span>{dashboardData.progress.reading}%</span>
              </div>
              <Progress value={dashboardData.progress.reading} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Writing (Viết)</span>
                <span>{dashboardData.progress.writing}%</span>
              </div>
              <Progress value={dashboardData.progress.writing} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Speaking (Nói)</span>
                <span>{dashboardData.progress.speaking}%</span>
              </div>
              <Progress value={dashboardData.progress.speaking} />
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Kết quả gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentResults.map((result, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{result.exercise}</p>
                  </div>
                  <Badge variant={result.score >= 80 ? "default" : "secondary"}>
                    {result.score} điểm
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Huy hiệu ({badges.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <Badge key={badge.badgeId} variant="outline" className="px-3 py-1">
                  <Award className="h-3 w-3 mr-1" />
                  {badge.badgeName}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserProgressDashboard;