import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Clock, Play, Book } from "lucide-react";
import { apiService, LearningPlan, Exercise } from "@/services/api";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const LearningPlanView = () => {
  const [learningPlan, setLearningPlan] = useState<LearningPlan[]>([]);
  const [exercises, setExercises] = useState<Map<number, Exercise>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLearningPlan();
  }, []);

  const fetchLearningPlan = async () => {
    try {
      setLoading(true);
      const userId = apiService.getCurrentUserId();
      
      if (!userId) {
        setError('Vui lòng đăng nhập để xem kế hoạch học tập');
        return;
      }

      const planData = await apiService.getLearningPlan(userId);
      setLearningPlan(planData);

      // Fetch exercise details for each plan item
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
    } catch (err) {
      setError('Không thể tải kế hoạch học tập. Vui lòng thử lại.');
      console.error('Error fetching learning plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: LearningPlan['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'InProgress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: LearningPlan['status']) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'InProgress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Play className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const handleStartExercise = (plan: LearningPlan) => {
    const exercise = exercises.get(plan.exerciseId);
    if (!exercise) return;

    // Navigate to appropriate exercise page based on type
    switch (exercise.exerciseType) {
      case 'Reading':
        navigate(`/reading-lesson/${exercise.id}`);
        break;
      case 'Listening':
        navigate(`/listening-lesson/${exercise.id}`);
        break;
      case 'Writing':
        navigate(`/writing-lesson/${exercise.id}`);
        break;
      default:
        navigate(`/lesson/${exercise.id}`);
    }
  };

  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString.split('T')[0] === today;
  };

  const isPast = (dateString: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString.split('T')[0] < today;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded"></div>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={fetchLearningPlan}>Thử lại</Button>
        </CardContent>
      </Card>
    );
  }

  if (learningPlan.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Book className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Chưa có kế hoạch học tập nào.</p>
        </CardContent>
      </Card>
    );
  }

  // Group plans by date
  const groupedPlans = learningPlan.reduce((acc, plan) => {
    const date = plan.startTime.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(plan);
    return acc;
  }, {} as Record<string, LearningPlan[]>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-toeic-navy mb-2">
          Kế hoạch học tập
        </h2>
        <p className="text-muted-foreground">
          Lộ trình học tập được cá nhân hóa cho bạn
        </p>
      </div>

      {Object.entries(groupedPlans)
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .map(([date, plans]) => (
          <div key={date} className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">
                {format(new Date(date), 'EEEE, dd MMMM yyyy', { locale: vi })}
              </h3>
              {isToday(date) && (
                <Badge className="bg-blue-100 text-blue-800">Hôm nay</Badge>
              )}
              {isPast(date) && (
                <Badge variant="outline">Đã qua</Badge>
              )}
            </div>

            <div className="grid gap-4">
              {plans.map((plan) => {
                const exercise = exercises.get(plan.exerciseId);
                return (
                  <Card key={plan.planId} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Book className="w-5 h-5 text-primary" />
                          <div>
                            <CardTitle className="text-lg">
                              {exercise?.title || `Bài tập #${plan.exerciseId}`}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {exercise?.exerciseType || 'Bài tập'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(plan.status)}
                          <Badge className={getStatusColor(plan.status)}>
                            {plan.status === 'Completed' && 'Hoàn thành'}
                            {plan.status === 'InProgress' && 'Đang học'}
                            {plan.status === 'Pending' && 'Chưa bắt đầu'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          <p>Bắt đầu: {format(new Date(plan.startTime), 'HH:mm')}</p>
                          <p>Kết thúc: {format(new Date(plan.endTime), 'HH:mm')}</p>
                        </div>
                        <Button 
                          variant={plan.status === 'Completed' ? 'outline' : 'default'}
                          size="sm"
                          onClick={() => handleStartExercise(plan)}
                          disabled={!exercise}
                        >
                          {plan.status === 'Completed' ? 'Xem lại' : 'Bắt đầu'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};

export default LearningPlanView;