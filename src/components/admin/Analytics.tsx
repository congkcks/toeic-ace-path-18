import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, BookOpen, Clock, Award } from "lucide-react";

export function Analytics() {
  const performanceData = [
    { skill: "Listening", score: 742, change: "+5%", trend: "up" },
    { skill: "Reading", score: 678, change: "-2%", trend: "down" },
    { skill: "Writing", score: 589, change: "+8%", trend: "up" },
    { skill: "Speaking", score: 634, change: "+3%", trend: "up" },
  ];

  const popularLessons = [
    { title: "TOEIC Listening Part 1", completions: 1847, rating: 4.8 },
    { title: "Grammar Fundamentals", completions: 1523, rating: 4.6 },
    { title: "Reading Comprehension", completions: 1342, rating: 4.7 },
    { title: "Business Vocabulary", completions: 1156, rating: 4.5 },
    { title: "Email Writing", completions: 987, rating: 4.4 },
  ];

  const monthlyStats = [
    { month: "Tháng 1", users: 2847, lessons: 156, certificates: 423 },
    { month: "Tháng 2", users: 3124, lessons: 178, certificates: 467 },
    { month: "Tháng 3", users: 3456, lessons: 192, certificates: 512 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Phân tích & Thống kê</h2>
        <p className="text-muted-foreground">Theo dõi hiệu suất và xu hướng học tập</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
          <TabsTrigger value="content">Nội dung</TabsTrigger>
          <TabsTrigger value="engagement">Tương tác</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Người dùng hoạt động</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% so với tháng trước
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bài học hoàn thành</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,231</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18% so với tháng trước
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Thời gian học TB</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4h</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +7% so với tháng trước
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chứng chỉ cấp</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">512</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +22% so với tháng trước
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Phân bố cấp độ người dùng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>A1 Beginner</span>
                    <span>35% (996 users)</span>
                  </div>
                  <Progress value={35} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>A2 Elementary</span>
                    <span>28% (797 users)</span>
                  </div>
                  <Progress value={28} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>B1 Intermediate</span>
                    <span>24% (683 users)</span>
                  </div>
                  <Progress value={24} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>B2+ Advanced</span>
                    <span>13% (371 users)</span>
                  </div>
                  <Progress value={13} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thống kê theo tháng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyStats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center p-2 border rounded">
                      <span className="font-medium">{stat.month}</span>
                      <div className="flex gap-4 text-sm">
                        <span>{stat.users} users</span>
                        <span>{stat.lessons} lessons</span>
                        <span>{stat.certificates} certs</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hiệu suất theo kỹ năng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performanceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-medium w-20">{item.skill}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{item.score}</span>
                        <Badge variant={item.trend === "up" ? "default" : "secondary"}>
                          {item.trend === "up" ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {item.change}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={(item.score / 990) * 100} className="w-40" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bài học phổ biến nhất</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularLessons.map((lesson, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-medium">{lesson.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {lesson.completions} lượt hoàn thành
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">⭐ {lesson.rating}</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mức độ tương tác</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Dữ liệu tương tác đang được thu thập...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}