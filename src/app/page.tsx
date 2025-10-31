import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { PredictionForm } from "@/components/PredictionForm/PredictionForm";

export default function Home() {
  return (
    <>
      <Header title="Découvre ton meilleur jour pour mourir 💀" />
      <PredictionForm />
      <Footer />
    </>
  );
}
