import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIAnalysisSubmission from "@/components/AIAnalysisSubmission";

const AIAnalysisPage = () => {
  const location = useLocation();
  const { lessonType = 'reading', score = 75, answers = [], userResponse = '', exerciseData = null } = location.state || {};

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <AIAnalysisSubmission 
            lessonType={lessonType}
            score={score}
            answers={answers}
            userResponse={userResponse}
            exerciseData={exerciseData}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIAnalysisPage;