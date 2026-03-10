import Footer from "@/features/footer/Footer";
import Hero from "@/features/hero/Hero";
import Interior from "@/features/interior/Interior";
import Menu from "@/features/menu/Menu";

export default function Home() {
  return (
    <main>
      <div className="bg-background relative z-10">
        <Hero />
        <Menu />
        <Interior />
      </div>
      <Footer />
    </main>
  );
}
