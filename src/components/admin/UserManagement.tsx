import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { MoreHorizontal, Search, UserPlus, Filter, Edit, Trash2, Key, Eye } from "lucide-react";
import { UserFormDialog } from "./UserFormDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { useToast } from "@/hooks/use-toast";

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userDialog, setUserDialog] = useState<{ open: boolean; user?: any }>({ open: false });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; user?: any }>({ open: false });
  const { toast } = useToast();

  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      level: "B1",
      score: 750,
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-03-10"
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      level: "A2",
      score: 650,
      status: "active",
      joinDate: "2024-02-20",
      lastLogin: "2024-03-09"
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      level: "B2",
      score: 850,
      status: "inactive",
      joinDate: "2024-01-10",
      lastLogin: "2024-03-05"
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      level: "A1",
      score: 550,
      status: "active",
      joinDate: "2024-03-01",
      lastLogin: "2024-03-10"
    },
  ];

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge variant="default">Hoạt động</Badge>
    ) : (
      <Badge variant="secondary">Không hoạt động</Badge>
    );
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      A1: "bg-green-100 text-green-800",
      A2: "bg-blue-100 text-blue-800",
      B1: "bg-yellow-100 text-yellow-800",
      B2: "bg-red-100 text-red-800",
    };
    
    return (
      <Badge className={colors[level as keyof typeof colors] || ""}>
        {level}
      </Badge>
    );
  };

  const handleCreateUser = () => {
    setUserDialog({ open: true });
  };

  const handleEditUser = (user: any) => {
    setUserDialog({ open: true, user });
  };

  const handleDeleteUser = (user: any) => {
    setDeleteDialog({ open: true, user });
  };

  const handleUserSubmit = (data: any) => {
    if (userDialog.user) {
      toast({
        title: "Cập nhật thành công",
        description: `Đã cập nhật thông tin người dùng ${data.name}`,
      });
    } else {
      toast({
        title: "Tạo thành công",
        description: `Đã tạo người dùng mới ${data.name}`,
      });
    }
  };

  const handleConfirmDelete = () => {
    toast({
      title: "Xóa thành công",
      description: `Đã xóa người dùng ${deleteDialog.user?.name}`,
    });
  };

  const handleResetPassword = (user: any) => {
    toast({
      title: "Reset mật khẩu",
      description: `Đã gửi email reset mật khẩu cho ${user.email}`,
    });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quản lý người dùng</h2>
          <p className="text-muted-foreground">Quản lý tài khoản và hoạt động của học viên</p>
        </div>
        <Button onClick={handleCreateUser}>
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm người dùng
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách người dùng</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm người dùng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người dùng</TableHead>
                <TableHead>Cấp độ</TableHead>
                <TableHead>Điểm số</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tham gia</TableHead>
                <TableHead>Đăng nhập cuối</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getLevelBadge(user.level)}</TableCell>
                  <TableCell className="font-medium">{user.score}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleResetPassword(user)}>
                          <Key className="mr-2 h-4 w-4" />
                          Reset mật khẩu
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteUser(user)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa người dùng
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

      <UserFormDialog
        open={userDialog.open}
        onOpenChange={(open) => setUserDialog({ open })}
        user={userDialog.user}
        onSubmit={handleUserSubmit}
      />

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open })}
        title="Xác nhận xóa người dùng"
        description={`Bạn có chắc chắn muốn xóa người dùng "${deleteDialog.user?.name}"? Hành động này không thể hoàn tác.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}