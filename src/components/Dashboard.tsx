import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  BookOpen,
  Headphones,
  FileText,
  BarChart3,
  PlayCircle,
  CheckCircle,
  Star,
  Trophy,
  Flame
} from "lucide-react";

const Dashboard = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-toeic-navy mb-2">
            Dashboard - Theo dõi tiến trình học tập
          </h1>
          <p className="text-muted-foreground">
            Xin chào! Hãy tiếp tục hành trình chinh phục TOEIC của bạn
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Streak hiện tại</p>
                  <p className="text-2xl font-bold text-toeic-warning">12 ngày</p>
                </div>
                <Flame className="w-8 h-8 text-toeic-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Điểm dự đoán</p>
                  <p className="text-2xl font-bold text-toeic-blue">685</p>
                </div>
                <Target className="w-8 h-8 text-toeic-blue" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bài học hoàn thành</p>
                  <p className="text-2xl font-bold text-toeic-success">28/49</p>
                </div>
                <BookOpen className="w-8 h-8 text-toeic-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Thời gian học</p>
                  <p className="text-2xl font-bold text-toeic-navy">42 giờ</p>
                </div>
                <Clock className="w-8 h-8 text-toeic-navy" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Tiến trình hiện tại</span>
                </CardTitle>
                <CardDescription>
                  Lộ trình TOEIC ACE PATH - Trung cấp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Hoàn thành tổng thể</span>
                      <span className="text-sm text-muted-foreground">57%</span>
                    </div>
                    <Progress value={57} className="h-3" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <Headphones className="w-4 h-4 text-toeic-blue" />
                          <span className="text-sm font-medium">Listening</span>
                        </div>
                        <span className="text-sm text-muted-foreground">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-toeic-success" />
                          <span className="text-sm font-medium">Reading</span>
                        </div>
                        <span className="text-sm text-muted-foreground">48%</span>
                      </div>
                      <Progress value={48} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Kế hoạch hôm nay</span>
                </CardTitle>
                <CardDescription>
                  Ngày 13 - Mini Test 1
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-toeic-warning/20 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-toeic-warning" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Mini Test 1</h4>
                        <p className="text-sm text-muted-foreground">Kiểm tra tiến trình - 60 phút</p>
                      </div>
                    </div>
                    <Button 
                      variant="hero"
                      onClick={() => window.location.href = '/assessment'}
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Bắt đầu
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg opacity-60">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-toeic-blue/20 rounded-lg flex items-center justify-center">
                        <Headphones className="w-5 h-5 text-toeic-blue" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Lesson 8: Listening Part 2</h4>
                        <p className="text-sm text-muted-foreground">7 dạng câu hỏi What - 45 phút</p>
                      </div>
                    </div>
                    <Badge variant="outline">Tiếp theo</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Kết quả gần đây</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-toeic-success" />
                      <div>
                        <h4 className="font-medium">Lesson 7: Reading Part 5 - Đại từ</h4>
                        <p className="text-sm text-muted-foreground">Hoàn thành ngày 12</p>
                      </div>
                    </div>
                    <Badge className="bg-toeic-success text-white">92%</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-toeic-success" />
                      <div>
                        <h4 className="font-medium">Lesson 6: Listening Part 1 - Tranh tả vật</h4>
                        <p className="text-sm text-muted-foreground">Hoàn thành ngày 10</p>
                      </div>
                    </div>
                    <Badge className="bg-toeic-warning text-white">85%</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-toeic-success" />
                      <div>
                        <h4 className="font-medium">Lesson 5: Electronics và Correspondence</h4>
                        <p className="text-sm text-muted-foreground">Hoàn thành ngày 11</p>
                      </div>
                    </div>
                    <Badge className="bg-toeic-blue text-white">78%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Thành tích</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-toeic-warning/20 rounded-lg flex items-center justify-center">
                      <Flame className="w-5 h-5 text-toeic-warning" />
                    </div>
                    <div>
                      <h4 className="font-medium">Streak Master</h4>
                      <p className="text-sm text-muted-foreground">12 ngày liên tục</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-toeic-success/20 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-toeic-success" />
                    </div>
                    <div>
                      <h4 className="font-medium">Quick Learner</h4>
                      <p className="text-sm text-muted-foreground">Hoàn thành 25 bài học</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-toeic-blue/20 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-toeic-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium">Listening Pro</h4>
                      <p className="text-sm text-muted-foreground">85% trung bình Listening</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Study Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Mục tiêu học tập</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Mục tiêu điểm số</span>
                      <span className="text-sm text-muted-foreground">700+</span>
                    </div>
                    <Progress value={82} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Còn 15 điểm nữa</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Thời gian học/tuần</span>
                      <span className="text-sm text-muted-foreground">10/12 giờ</span>
                    </div>
                    <Progress value={83} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Còn 2 giờ nữa</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Hành động nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/lesson/reading'}
                >
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Luyện tập nhanh
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/ai-analysis'}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Xem báo cáo chi tiết
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/study-plan'}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Điều chỉnh mục tiêu
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;