import Header from "@/components/Header";
import AssessmentQuiz from "@/components/AssessmentQuiz";
import Footer from "@/components/Footer";

const Assessment = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AssessmentQuiz />
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;