import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, TrendingUp, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function DashboardOverview() {
  const stats = [
    { title: "Tổng người dùng", value: "2,847", icon: Users, change: "+12%" },
    { title: "Bài học đã tạo", value: "156", icon: BookOpen, change: "+8%" },
    { title: "Điểm trung bình", value: "750", icon: TrendingUp, change: "+15%" },
    { title: "Chứng chỉ đã cấp", value: "423", icon: Award, change: "+22%" },
  ];

  const recentActivities = [
    { user: "Nguyễn Văn A", action: "Hoàn thành bài test A2", time: "5 phút trước" },
    { user: "Trần Thị B", action: "Đăng ký khóa học B1", time: "15 phút trước" },
    { user: "Lê Văn C", action: "Đạt 850 điểm TOEIC", time: "30 phút trước" },
    { user: "Phạm Thị D", action: "Hoàn thành lộ trình 25 ngày", time: "1 giờ trước" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tổng quan Dashboard</h2>
        <p className="text-muted-foreground">Thống kê tổng quan hệ thống TOEIC</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600">{stat.change} so với tháng trước</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Tiến độ học tập theo cấp độ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>A1 Beginner</span>
                <span>85%</span>
              </div>
              <Progress value={85} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>A2 Elementary</span>
                <span>72%</span>
              </div>
              <Progress value={72} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>B1 Intermediate</span>
                <span>58%</span>
              </div>
              <Progress value={58} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>B2 Upper-Intermediate</span>
                <span>34%</span>
              </div>
              <Progress value={34} />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}