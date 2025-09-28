import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Search, Eye, Play, FileText, Edit, Trash2, Copy } from "lucide-react";
import { ContentFormDialog } from "./ContentFormDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { useToast } from "@/hooks/use-toast";

export function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [contentDialog, setContentDialog] = useState<{ 
    open: boolean; 
    type: "lesson" | "assessment"; 
    content?: any 
  }>({ open: false, type: "lesson" });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; item?: any; type?: string }>({ open: false });
  const { toast } = useToast();

  const lessons = [
    {
      id: 1,
      title: "TOEIC Listening Part 1: Photos",
      type: "listening",
      level: "A1",
      status: "published",
      questions: 20,
      duration: "30 phút",
      created: "2024-03-01"
    },
    {
      id: 2,
      title: "TOEIC Reading Part 5: Grammar",
      type: "reading",
      level: "A2",
      status: "draft",
      questions: 25,
      duration: "45 phút",
      created: "2024-03-05"
    },
    {
      id: 3,
      title: "TOEIC Writing Task 1: Email",
      type: "writing",
      level: "B1",
      status: "published",
      questions: 10,
      duration: "60 phút",
      created: "2024-03-08"
    },
  ];

  const assessments = [
    {
      id: 1,
      title: "TOEIC Practice Test A1",
      level: "A1",
      status: "active",
      attempts: 145,
      avgScore: 650,
      created: "2024-02-15"
    },
    {
      id: 2,
      title: "TOEIC Practice Test A2",
      level: "A2",
      status: "active",
      attempts: 89,
      avgScore: 720,
      created: "2024-02-20"
    },
    {
      id: 3,
      title: "TOEIC Practice Test B1",
      level: "B1",
      status: "inactive",
      attempts: 67,
      avgScore: 780,
      created: "2024-02-25"
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      published: "default",
      draft: "secondary",
      active: "default",
      inactive: "secondary",
    };
    
    const labels = {
      published: "Đã xuất bản",
      draft: "Bản nháp",
      active: "Hoạt động",
      inactive: "Không hoạt động",
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      listening: Play,
      reading: FileText,
      writing: FileText,
    };
    
    const Icon = icons[type as keyof typeof icons] || FileText;
    return <Icon className="h-4 w-4" />;
  };

  const handleCreateContent = (type: "lesson" | "assessment") => {
    setContentDialog({ open: true, type });
  };

  const handleEditContent = (type: "lesson" | "assessment", content: any) => {
    setContentDialog({ open: true, type, content });
  };

  const handleDeleteContent = (item: any, type: string) => {
    setDeleteDialog({ open: true, item, type });
  };

  const handleContentSubmit = (data: any) => {
    if (contentDialog.content) {
      toast({
        title: "Cập nhật thành công",
        description: `Đã cập nhật ${contentDialog.type === "lesson" ? "bài học" : "đề thi"} "${data.title}"`,
      });
    } else {
      toast({
        title: "Tạo thành công",
        description: `Đã tạo ${contentDialog.type === "lesson" ? "bài học" : "đề thi"} mới "${data.title}"`,
      });
    }
  };

  const handleConfirmDelete = () => {
    toast({
      title: "Xóa thành công",
      description: `Đã xóa ${deleteDialog.type} "${deleteDialog.item?.title}"`,
    });
  };

  const handleCopyContent = (item: any, type: string) => {
    toast({
      title: "Sao chép thành công",
      description: `Đã tạo bản sao của ${type} "${item.title}"`,
    });
  };

  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAssessments = assessments.filter(assessment =>
    assessment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quản lý nội dung</h2>
          <p className="text-muted-foreground">Quản lý bài học, đề thi và tài liệu học tập</p>
        </div>
      </div>

      <Tabs defaultValue="lessons" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lessons">Bài học</TabsTrigger>
          <TabsTrigger value="assessments">Đề thi</TabsTrigger>
          <TabsTrigger value="roadmaps">Lộ trình</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Danh sách bài học</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Tìm kiếm bài học..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-80"
                    />
                  </div>
                  <Button onClick={() => handleCreateContent("lesson")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm bài học
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bài học</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Cấp độ</TableHead>
                    <TableHead>Câu hỏi</TableHead>
                    <TableHead>Thời lượng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLessons.map((lesson) => (
                    <TableRow key={lesson.id}>
                      <TableCell className="font-medium">{lesson.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(lesson.type)}
                          <span className="capitalize">{lesson.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{lesson.level}</Badge>
                      </TableCell>
                      <TableCell>{lesson.questions}</TableCell>
                      <TableCell>{lesson.duration}</TableCell>
                      <TableCell>{getStatusBadge(lesson.status)}</TableCell>
                      <TableCell>{lesson.created}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Xem trước
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditContent("lesson", lesson)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCopyContent(lesson, "bài học")}>
                              <Copy className="mr-2 h-4 w-4" />
                              Sao chép
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteContent(lesson, "bài học")}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Danh sách đề thi</CardTitle>
                <Button onClick={() => handleCreateContent("assessment")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm đề thi
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên đề thi</TableHead>
                    <TableHead>Cấp độ</TableHead>
                    <TableHead>Lượt thi</TableHead>
                    <TableHead>Điểm TB</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssessments.map((assessment) => (
                    <TableRow key={assessment.id}>
                      <TableCell className="font-medium">{assessment.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{assessment.level}</Badge>
                      </TableCell>
                      <TableCell>{assessment.attempts}</TableCell>
                      <TableCell>{assessment.avgScore}</TableCell>
                      <TableCell>{getStatusBadge(assessment.status)}</TableCell>
                      <TableCell>{assessment.created}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditContent("assessment", assessment)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem>Thống kê</DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteContent(assessment, "đề thi")}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmaps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý lộ trình học tập</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Chức năng quản lý lộ trình đang được phát triển</p>
                <Button onClick={() => handleCreateContent("lesson")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo lộ trình mới
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ContentFormDialog
        open={contentDialog.open}
        onOpenChange={(open) => setContentDialog({ ...contentDialog, open })}
        type={contentDialog.type}
        content={contentDialog.content}
        onSubmit={handleContentSubmit}
      />

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open })}
        title={`Xác nhận xóa ${deleteDialog.type}`}
        description={`Bạn có chắc chắn muốn xóa ${deleteDialog.type} "${deleteDialog.item?.title}"? Hành động này không thể hoàn tác.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}