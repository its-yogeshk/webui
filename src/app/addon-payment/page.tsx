'use client';
import axios from 'axios';
import { useState } from 'react';
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const addonPackCategoryId = searchParams.get("addonPackCategoryId");
  const addonPackCategoryName = searchParams.get("addonPackCategoryName");
  const amount = Number(searchParams.get("amount"));

  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () =>
    new Promise<boolean>((resolve) => {
      const existingScript = document.getElementById("razorpay-script");
      if (existingScript) return resolve(true);

      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePay = async () => {
    if (!amount) return;

    const token = localStorage.getItem("token");
    if(!token) return

    setLoading(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Failed to load Razorpay");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND_ONE}/orders/create-payment/add-on-pack`,
        { amount, addonPackCategoryId: addonPackCategoryId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: data.data.key,
        amount: data.data.amount,
        currency: "INR",
        name: "Revolve By Preethi",
        description: "Membership Checkout",
        order_id: data.data.orderId,
        image: "https://revolvebypreethi-image-upload.s3.ap-south-1.amazonaws.com/df409050b3a8387636617a5ee7047906ff1bb3fa.pngW22dLIOo1eZT7HE1R4_INDu2GV2q2A0QY76z.png",
        handler: async function (response: any) {
          const verifyRes = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND_ONE}/orders/verify-payment/add-on-pack`,
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (verifyRes.data.data.order.status === "SUCCESS") {
            alert("✅ Payment Successful!");
            router.push(`/`);
          } else {
            alert("❌ Payment Failed!");
          }
        },

        prefill: {
          name: "User",
          email: "user@example.com",
        },

        theme: {
          color: "#EF418E",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Checkout
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Complete your addon product payment
          </p>
        </div>

        {/* Plan Details */}
        <div className="border rounded-xl p-4 space-y-3 bg-gray-50">
          <div className="flex justify-between">
            <span className="text-gray-600">Product name</span>
            <span className="font-medium text-gray-900">
              {addonPackCategoryName}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Amount</span>
            <span className="font-semibold text-gray-900">
              ₹{amount}
            </span>
          </div>

          <div className="border-t pt-3 flex justify-between text-lg">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-[#EF418E]">
              ₹{amount}
            </span>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-[#EF418E] text-white font-semibold text-lg hover:bg-[#d9377c] transition disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay ₹${amount}`}
        </button>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400">
          Secure payment powered by Razorpay
        </p>
      </div>
    </main>
  );
}


export default function PaymentDefaultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPage />
    </Suspense>
  );
}

