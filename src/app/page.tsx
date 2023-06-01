import { CanvasModel } from "@/canvas";
import Customizer from "@/components/views/Customizer";
import HomePage from "@/components/views/HomePage";

export default function Home() {
  return (
    <main className="app transition-all ease-in">
      <HomePage />
      <CanvasModel />
      <Customizer />
    </main>
  );
}
