import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, RefreshCw, Database, Mail, Shield, Globe } from "lucide-react";

export function SystemSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Cài đặt hệ thống</h2>
        <p className="text-muted-foreground">Quản lý cấu hình và thiết lập hệ thống</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Cài đặt chung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="site-name">Tên trang web</Label>
                  <Input id="site-name" defaultValue="TOEIC Learning Platform" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="site-description">Mô tả trang web</Label>
                  <Input id="site-description" defaultValue="Nền tảng học TOEIC trực tuyến hiệu quả" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="support-email">Email hỗ trợ</Label>
                  <Input id="support-email" defaultValue="support@toeicplatform.com" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Tính năng hệ thống</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cho phép đăng ký mới</Label>
                    <p className="text-sm text-muted-foreground">Người dùng có thể tạo tài khoản mới</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Chế độ bảo trì</Label>
                    <p className="text-sm text-muted-foreground">Tạm dừng truy cập cho người dùng</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>AI Assessment</Label>
                    <p className="text-sm text-muted-foreground">Bật tính năng đánh giá bằng AI</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Gửi thông báo email</Label>
                    <p className="text-sm text-muted-foreground">Gửi email thông báo cho người dùng</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Lưu thay đổi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Cấu hình Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertDescription>
                  Cấu hình SMTP để gửi email thông báo và xác thực người dùng.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input id="smtp-host" placeholder="smtp.gmail.com" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" placeholder="587" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="smtp-username">Username</Label>
                  <Input id="smtp-username" placeholder="your-email@gmail.com" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="smtp-password">Password</Label>
                  <Input id="smtp-password" type="password" placeholder="••••••••" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Sử dụng SSL/TLS</Label>
                  <p className="text-sm text-muted-foreground">Kết nối bảo mật với SMTP server</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex gap-2">
                <Button variant="outline">
                  Kiểm tra kết nối
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Lưu cấu hình
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Cài đặt bảo mật
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Xác thực 2 bước</Label>
                    <p className="text-sm text-muted-foreground">Bắt buộc 2FA cho admin</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Đăng nhập với Google</Label>
                    <p className="text-sm text-muted-foreground">Cho phép đăng nhập bằng Google OAuth</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Ghi log truy cập</Label>
                    <p className="text-sm text-muted-foreground">Lưu lại lịch sử đăng nhập</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="session-timeout">Thời gian timeout phiên (phút)</Label>
                  <Input id="session-timeout" defaultValue="30" type="number" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="max-login-attempts">Số lần đăng nhập tối đa</Label>
                  <Input id="max-login-attempts" defaultValue="5" type="number" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password-min-length">Độ dài mật khẩu tối thiểu</Label>
                  <Input id="password-min-length" defaultValue="8" type="number" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Lưu cài đặt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Quản lý Database
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertDescription>
                  Các thao tác này có thể ảnh hưởng đến dữ liệu hệ thống. Hãy thực hiện cẩn thận.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Sao lưu Database</h4>
                        <p className="text-sm text-muted-foreground">Tạo bản sao lưu dữ liệu</p>
                      </div>
                      <Button variant="outline">
                        <Database className="mr-2 h-4 w-4" />
                        Backup
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Làm sạch Cache</h4>
                        <p className="text-sm text-muted-foreground">Xóa cache hệ thống</p>
                      </div>
                      <Button variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Clear Cache
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Tối ưu hóa Database</h4>
                        <p className="text-sm text-muted-foreground">Tối ưu hiệu suất database</p>
                      </div>
                      <Button variant="outline">
                        Optimize
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Thống kê Database</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold">2,847</div>
                    <div className="text-sm text-muted-foreground">Users</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold">45,231</div>
                    <div className="text-sm text-muted-foreground">Lessons</div>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <div className="text-2xl font-bold">1.2GB</div>
                    <div className="text-sm text-muted-foreground">Database Size</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}