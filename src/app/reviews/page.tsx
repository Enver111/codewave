import Footer from "../components/footer";
import Header from "../components/header";
import Reviews from "../components/reviews";

export default function ReviewsPage() {
  return (
    <div>
      <main className="min-h-screen bg-[#0a0e1a] text-white font-sans">
        <Header />
        <div className="pt-24">
            <Reviews />
        </div>
        <Footer />
      </main>
    </div>
  );
}
