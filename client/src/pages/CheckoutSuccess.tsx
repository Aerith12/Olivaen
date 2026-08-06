import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";
  const [, navigate] = useLocation();

  const { data, isLoading } = trpc.checkoutStatus.useQuery(
    { sessionId },
    { enabled: !!sessionId }
  );

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (data?.found && data.order?.status === "completed") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            navigate("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [data, navigate]);

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 text-[#2D3A1E] mx-auto mb-4" />
          <h1
            className="font-serif text-4xl text-[#2D3A1E] mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Reservation Confirmed
          </h1>
          <p className="text-[#6B7B5E] text-lg">
            Your Founding Harvest bottle is secured.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur rounded-sm border border-[#C5B88A]/30 p-6 mb-8">
          {isLoading ? (
            <p className="text-[#6B7B5E]">Verifying your reservation...</p>
          ) : data?.found ? (
            <div className="space-y-3 text-left">
              <div className="flex justify-between border-b border-[#C5B88A]/20 pb-2">
                <span className="text-[#6B7B5E]">Order</span>
                <span className="font-mono text-sm text-[#2D3A1E]">
                  #{data.order?.id}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#C5B88A]/20 pb-2">
                <span className="text-[#6B7B5E]">Quantity</span>
                <span className="text-[#2D3A1E]">
                  {data.order?.quantity} bottle{data.order?.quantity !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#C5B88A]/20 pb-2">
                <span className="text-[#6B7B5E]">Status</span>
                <span
                  className={`text-sm font-medium ${
                    data.order?.status === "completed"
                      ? "text-green-700"
                      : "text-amber-700"
                  }`}
                >
                  {data.order?.status === "completed"
                    ? "Confirmed"
                    : data.order?.status === "pending"
                    ? "Processing"
                    : data.order?.status}
                </span>
              </div>
              {data.order?.bottleNumber && (
                <div className="flex justify-between pt-2">
                  <span className="text-[#6B7B5E]">Bottle No.</span>
                  <span className="font-mono text-[#2D3A1E]">
                    #{data.order.bottleNumber}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-[#6B7B5E]">
              If you don't see your order, check your email for confirmation.
            </p>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-sm text-[#6B7B5E]">
            {data?.found && data.order?.status === "completed"
              ? `Returning to home in ${countdown}s...`
              : "You'll receive your bottle assignment before October 2026."}
          </p>
          <Link href="/">
            <button className="inline-flex items-center gap-2 text-[#2D3A1E] hover:text-[#C5B88A] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to OLIVAEN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
