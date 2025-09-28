import Header from "@/components/Header";
import StudyPlanSection from "@/components/StudyPlanSection";
import Footer from "@/components/Footer";

const StudyPlan = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <StudyPlanSection />
      </main>
      <Footer />
    </div>
  );
};

export default StudyPlan;