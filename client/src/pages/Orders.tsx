import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { ArrowLeft, Package, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { startLogin } from "@/const";

export default function Orders() {
  const { user, loading: authLoading } = useAuth();
  const { data: orders, isLoading } = trpc.orders.useQuery(undefined, {
    enabled: !!user,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#2D3A1E] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1
            className="font-serif text-3xl text-[#2D3A1E] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Sign In Required
          </h1>
          <p className="text-[#6B7B5E] mb-6">
            Please sign in to view your reservations.
          </p>
          <button
            onClick={startLogin}
            className="bg-[#2D3A1E] text-[#F5F0E8] px-8 py-3 hover:bg-[#3D4A2E] transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* Header */}
      <header className="border-b border-[#C5B88A]/30 bg-white/40 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <button className="inline-flex items-center gap-2 text-[#2D3A1E] hover:text-[#C5B88A] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </Link>
          <h1
            className="font-serif text-xl text-[#2D3A1E]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My Reservations
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-[#6B7B5E]">
            Welcome, {user.name || "Hatem"}. Here are your Founding Harvest reservations.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 text-[#2D3A1E] animate-spin" />
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-[#C5B88A] mx-auto mb-4" />
            <h2
              className="font-serif text-2xl text-[#2D3A1E] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              No Reservations Yet
            </h2>
            <p className="text-[#6B7B5E] mb-6">
              Reserve your numbered bottle from the Founding Harvest.
            </p>
            <Link href="/">
              <button className="bg-[#2D3A1E] text-[#F5F0E8] px-8 py-3 hover:bg-[#3D4A2E] transition-colors">
                Reserve Your Bottle
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white/60 backdrop-blur rounded-sm border border-[#C5B88A]/30 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3
                      className="font-serif text-lg text-[#2D3A1E]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Founding Harvest No.1
                    </h3>
                    <p className="text-sm text-[#6B7B5E]">
                      Order #{order.id} ·{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : order.status === "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status === "completed"
                      ? "Confirmed"
                      : order.status === "pending"
                      ? "Processing"
                      : order.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#6B7B5E]">Quantity</span>
                    <p className="text-[#2D3A1E] font-medium">
                      {order.quantity} bottle{order.quantity !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#6B7B5E]">Price</span>
                    <p className="text-[#2D3A1E] font-medium">
                      €{(2900 / 100) * order.quantity}
                    </p>
                  </div>
                  {order.bottleNumber && (
                    <div>
                      <span className="text-[#6B7B5E]">Bottle No.</span>
                      <p className="text-[#2D3A1E] font-mono">
                        #{order.bottleNumber}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-[#6B7B5E]">Origin</span>
                    <p className="text-[#2D3A1E]">Sfax, Tunisia</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
