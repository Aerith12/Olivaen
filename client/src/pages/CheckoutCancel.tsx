import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-[#C5B88A] mx-auto mb-4 flex items-center justify-center">
            <span className="text-[#C5B88A] text-2xl font-serif">✕</span>
          </div>
          <h1
            className="font-serif text-4xl text-[#2D3A1E] mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Reservation Cancelled
          </h1>
          <p className="text-[#6B7B5E] text-lg">
            Your Founding Harvest bottle is still available.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur rounded-sm border border-[#C5B88A]/30 p-6 mb-8">
          <p className="text-[#6B7B5E] leading-relaxed">
            No worries — the 500 numbered bottles from the Founding Harvest are
            still being allocated. You can try again whenever you're ready.
          </p>
        </div>

        <Link href="/">
          <button className="inline-flex items-center gap-2 bg-[#2D3A1E] text-[#F5F0E8] px-8 py-3 hover:bg-[#3D4A2E] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Return to OLIVAEN
          </button>
        </Link>
      </div>
    </div>
  );
}
