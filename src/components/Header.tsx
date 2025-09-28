import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-toeic-navy">TOEIC ACE PATH</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-toeic-blue transition-colors">Trang chủ</a>
            <a href="/assessment" className="text-foreground hover:text-toeic-blue transition-colors">Đánh giá trình độ</a>
            <a href="/study-plan" className="text-foreground hover:text-toeic-blue transition-colors">Lộ trình học</a>
            <a href="/dashboard" className="text-foreground hover:text-toeic-blue transition-colors">Dashboard</a>
            <a href="/all-interfaces" className="text-foreground hover:text-toeic-blue transition-colors">Tất cả trang</a>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Đăng nhập</Button>
            <Button variant="hero">Đăng ký miễn phí</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-foreground hover:text-toeic-blue transition-colors">Trang chủ</a>
              <a href="/assessment" className="text-foreground hover:text-toeic-blue transition-colors">Đánh giá trình độ</a>
              <a href="/study-plan" className="text-foreground hover:text-toeic-blue transition-colors">Lộ trình học</a>
              <a href="/dashboard" className="text-foreground hover:text-toeic-blue transition-colors">Dashboard</a>
              <a href="/all-interfaces" className="text-foreground hover:text-toeic-blue transition-colors">Tất cả trang</a>
            </nav>
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="ghost">Đăng nhập</Button>
              <Button variant="hero">Đăng ký miễn phí</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;