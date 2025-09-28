import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIAssessment from "@/components/AIAssessment";

const AIAssessmentPage = () => {
  const location = useLocation();
  const { lessonType = 'reading', score = 75, answers = [], userResponse = '' } = location.state || {};

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-6 max-w-6xl">
          <AIAssessment 
            lessonType={lessonType}
            score={score}
            answers={answers}
            userResponse={userResponse}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIAssessmentPage;