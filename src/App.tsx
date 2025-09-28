import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudyPlan from "./pages/StudyPlan";
import Assessment from "./pages/Assessment";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboard from "./pages/AdminDashboard";
import ReadingLessonPage from "./pages/ReadingLessonPage";
import ListeningLessonPage from "./pages/ListeningLessonPage";
import WritingLessonPage from "./pages/WritingLessonPage";
import ConversationPracticePage from "./pages/ConversationPracticePage";
import AIAssessmentPage from "./pages/AIAssessmentPage";
import AIAnalysisPage from "./pages/AIAnalysisPage";
import DetailedLessonPage from "./pages/DetailedLessonPage";
import AllInterfacesPage from "./pages/AllInterfacesPage";
import InteractiveStoryPage from "./pages/InteractiveStoryPage";
import VocabularyBuilderPage from "./pages/VocabularyBuilderPage";
import PronunciationPracticePage from "./pages/PronunciationPracticePage";
import GrammarGamePage from "./pages/GrammarGamePage";
import SpeakingChallengePage from "./pages/SpeakingChallengePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/study-plan" element={<StudyPlan />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/lesson/reading" element={<ReadingLessonPage />} />
          <Route path="/lesson/listening" element={<ListeningLessonPage />} />
          <Route path="/lesson/writing" element={<WritingLessonPage />} />
          <Route path="/lesson/conversation" element={<ConversationPracticePage />} />
          <Route path="/ai-assessment" element={<AIAssessmentPage />} />
          <Route path="/ai-analysis" element={<AIAnalysisPage />} />
          <Route path="/detailed-lesson" element={<DetailedLessonPage />} />
          <Route path="/all-interfaces" element={<AllInterfacesPage />} />
          <Route path="/interactive-story" element={<InteractiveStoryPage />} />
          <Route path="/vocabulary-builder" element={<VocabularyBuilderPage />} />
          <Route path="/pronunciation-practice" element={<PronunciationPracticePage />} />
          <Route path="/grammar-game" element={<GrammarGamePage />} />
          <Route path="/speaking-challenge" element={<SpeakingChallengePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
