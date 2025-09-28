import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Youtube, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  Send
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-toeic-navy text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold">TOEIC ACE PATH</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Nền tảng học TOEIC hàng đầu Việt Nam với công nghệ AI tiên tiến, 
              giúp học viên đạt điểm số mục tiêu một cách hiệu quả nhất.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Youtube className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Trang chủ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Khóa học</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Luyện thi</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Thống kê</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Liên hệ</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Hướng dẫn học tập</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Điều khoản sử dụng</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Hoàn tiền</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">1900 xxxx</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">support@toeicacepath.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Hà Nội, Việt Nam</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="font-medium mb-3">Nhận tin tức mới nhất</h4>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Email của bạn" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button variant="hero" size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 TOEIC ACE PATH. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Điều khoản sử dụng
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;