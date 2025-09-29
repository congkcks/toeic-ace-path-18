import UserProgressDashboard from "./UserProgressDashboard";
import LearningPlanView from "./LearningPlanView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, TrendingUp } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-toeic-navy mb-2">
            Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Chào mừng bạn trở lại! Hãy tiếp tục hành trình học TOEIC của mình.
          </p>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Tổng quan
            </TabsTrigger>
            <TabsTrigger value="plan" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Kế hoạch học tập
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Tiến độ cá nhân
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <UserProgressDashboard />
          </TabsContent>

          <TabsContent value="plan">
            <LearningPlanView />
          </TabsContent>

          <TabsContent value="profile">
            <UserProgressDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;