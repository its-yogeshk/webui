import Fitness from "@/components/Fitness/page";
import AppShowcase from "@/components/AppShowcase";
import Testimonials from "@/components/Testimonials";
import FitnessSecondary from "@/components/FitnessSecondary"

export default function HomePage() {
  return (
    <main>
      <Fitness />
      <AppShowcase />
      <Testimonials />
      <FitnessSecondary />
    </main>
  );
}
