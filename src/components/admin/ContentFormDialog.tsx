import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const lessonSchema = z.object({
  title: z.string().min(5, "Tiêu đề phải có ít nhất 5 ký tự"),
  type: z.enum(["listening", "reading", "writing"]),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
  duration: z.string().min(1, "Thời lượng không được để trống"),
  questions: z.number().min(1, "Số câu hỏi phải lớn hơn 0"),
  status: z.enum(["draft", "published"]),
});

const assessmentSchema = z.object({
  title: z.string().min(5, "Tiêu đề phải có ít nhất 5 ký tự"),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
  duration: z.string().min(1, "Thời lượng không được để trống"),
  totalQuestions: z.number().min(1, "Tổng số câu hỏi phải lớn hơn 0"),
  passingScore: z.number().min(1, "Điểm đạt phải lớn hơn 0"),
  status: z.enum(["active", "inactive"]),
});

type LessonFormData = z.infer<typeof lessonSchema>;
type AssessmentFormData = z.infer<typeof assessmentSchema>;

interface ContentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "lesson" | "assessment";
  content?: any;
  onSubmit: (data: any) => void;
}

export function ContentFormDialog({ 
  open, 
  onOpenChange, 
  type, 
  content, 
  onSubmit 
}: ContentFormDialogProps) {
  const isEditing = !!content;
  const isLesson = type === "lesson";
  
  const schema = isLesson ? lessonSchema : assessmentSchema;
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: isLesson ? {
      title: content?.title || "",
      type: content?.type || "listening",
      level: content?.level || "A1",
      description: content?.description || "",
      duration: content?.duration || "",
      questions: content?.questions || 10,
      status: content?.status || "draft",
    } : {
      title: content?.title || "",
      level: content?.level || "A1",
      description: content?.description || "",
      duration: content?.duration || "",
      totalQuestions: content?.totalQuestions || 50,
      passingScore: content?.passingScore || 600,
      status: content?.status || "active",
    },
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing 
              ? `Chỉnh sửa ${isLesson ? 'bài học' : 'đề thi'}` 
              : `Thêm ${isLesson ? 'bài học' : 'đề thi'} mới`
            }
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tiêu đề..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isLesson && (
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại bài học</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại bài học" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="listening">Nghe</SelectItem>
                        <SelectItem value="reading">Đọc</SelectItem>
                        <SelectItem value="writing">Viết</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cấp độ</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn cấp độ" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A1">A1 - Sơ cấp</SelectItem>
                      <SelectItem value="A2">A2 - Cơ bản</SelectItem>
                      <SelectItem value="B1">B1 - Trung cấp</SelectItem>
                      <SelectItem value="B2">B2 - Trung cấp cao</SelectItem>
                      <SelectItem value="C1">C1 - Nâng cao</SelectItem>
                      <SelectItem value="C2">C2 - Thành thạo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập mô tả chi tiết..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thời lượng</FormLabel>
                    <FormControl>
                      <Input placeholder="VD: 30 phút" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={isLesson ? "questions" : "totalQuestions"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{isLesson ? "Số câu hỏi" : "Tổng số câu hỏi"}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!isLesson && (
              <FormField
                control={form.control}
                name="passingScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Điểm đạt</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="600"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLesson ? (
                        <>
                          <SelectItem value="draft">Bản nháp</SelectItem>
                          <SelectItem value="published">Đã xuất bản</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="active">Hoạt động</SelectItem>
                          <SelectItem value="inactive">Không hoạt động</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
              <Button type="submit">
                {isEditing ? "Cập nhật" : "Tạo mới"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}