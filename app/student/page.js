import StudentNavbar from "../components/navbar/StudentNavbar";
import Hero from "../components/home/Hero";
import FeaturedCourses from "../components/home/FeaturedCourses";
import WhyChoose from "../components/home/WhyChoose";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";

export default function HomePage() {
  return (
    <main>
      <StudentNavbar />
      <Hero />
      <FeaturedCourses />
      <WhyChoose />
      <CTA />
      <Footer />
    </main>
  );
}
