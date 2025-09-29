import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, Headphones, PenTool, CheckCircle, Clock, Play } from "lucide-react";
import { apiService, TopicExercises, Exercise } from "@/services/api";
import { useNavigate } from "react-router-dom";

interface ExerciseTopicListProps {
  topicName: string;
}

const ExerciseTopicList = ({ topicName }: ExerciseTopicListProps) => {
  const [topicData, setTopicData] = useState<TopicExercises | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopicExercises();
  }, [topicName]);

  const fetchTopicExercises = async () => {
    try {
      setLoading(true);
      const data = await apiService.getExercisesByTopic(topicName);
      setTopicData(data);
    } catch (err) {
      setError('Không thể tải bài tập. Vui lòng thử lại.');
      console.error('Error fetching topic exercises:', err);
    } finally {
      setLoading(false);
    }
  };

  const getExerciseIcon = (type: Exercise['exerciseType']) => {
    switch (type) {
      case 'Reading':
        return <Book className="w-5 h-5" />;
      case 'Listening':
        return <Headphones className="w-5 h-5" />;
      case 'Writing':
        return <PenTool className="w-5 h-5" />;
      default:
        return <Book className="w-5 h-5" />;
    }
  };

  const getStatusIcon = (status?: Exercise['status']) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'InProgress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Play className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status?: Exercise['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'InProgress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExerciseClick = (exercise: Exercise) => {
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

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded"></div>
        {[1, 2, 3].map((i) => (
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
          <Button onClick={fetchTopicExercises}>Thử lại</Button>
        </CardContent>
      </Card>
    );
  }

  if (!topicData) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Không tìm thấy bài tập cho chủ đề này.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-toeic-navy mb-2">
          {topicData.topic}
        </h2>
        <p className="text-muted-foreground">
          {topicData.exercises.length} bài tập có sẵn
        </p>
      </div>

      <div className="grid gap-4">
        {topicData.exercises.map((exercise) => (
          <Card key={exercise.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleExerciseClick(exercise)}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getExerciseIcon(exercise.exerciseType)}
                  <div>
                    <CardTitle className="text-lg">{exercise.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {exercise.exerciseType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(exercise.status)}
                  <Badge className={getStatusColor(exercise.status)}>
                    {exercise.status === 'Completed' && 'Hoàn thành'}
                    {exercise.status === 'InProgress' && 'Đang học'}
                    {exercise.status === 'Pending' && 'Chưa bắt đầu'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Chủ đề: {exercise.topic}
                </p>
                <Button variant="outline" size="sm">
                  {exercise.status === 'Completed' ? 'Xem lại' : 'Bắt đầu'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExerciseTopicList;