"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { sendOtpForLoginAndRegister, verifyOtp } from "@/services/auth.service";
import { getAddon } from "@/services/addon.service";
import { AddonPack, addonPlanResponse } from "@/models/addon.model";


function AddonDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const uid = searchParams.get("uid");

  const [addon, setAddon] = useState<AddonPack | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Auth states (SAME as plan page)
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [otpSessionId, setOtpSessionId] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (uid) {
        localStorage.setItem("token", uid);
        console.log("Plan ID stored:", uid);
    }
  }, [uid]);

  // 🔁 Fetch addon details
  useEffect(() => {
    if (!id) return;

    const fetchAddon = async () => {
      try {
        const res : addonPlanResponse = await getAddon(id);
        setAddon(res.data.category);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddon();
  }, [id]);

  const handleBuyAddon = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(`/addon-payment?addonPackCategoryId=${addon?.id}&amount=${addon?.price}&addonPackCategoryName=${addon?.title}`);
    } else {
      localStorage.setItem(
        "selectedAddon",
        JSON.stringify({ addonPackCategoryId: addon?.id, amount: addon?.price })
      );
      setShowLoginModal(true);
    }
  };

  // 🔐 OTP FLOW
  const handleContinue = async () => {
    if (phoneNumber.length !== 10) return;

    try {
      const res = await sendOtpForLoginAndRegister({
        countryCode,
        mobileNumber: phoneNumber,
      });

      setOtpSessionId(res.data?.id || null);
      setShowLoginModal(false);
      setShowOtpModal(true);
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    const otp = otpValues.join("");
    if (!otpSessionId || otp.length !== 4) return;

    try {
      const res = await verifyOtp({ id: otpSessionId, otp });
      localStorage.setItem("token", res.data.accessToken);

      const selectedAddon = localStorage.getItem("selectedAddon");
      if (selectedAddon) {
        const { addonId, amount } = JSON.parse(selectedAddon);
        localStorage.removeItem("selectedAddon");
        router.push(`/payment?addonId=${addonId}&amount=${amount}`);
      }
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const updated = [...otpValues];
    updated[index] = value.slice(-1);
    setOtpValues(updated);

    if (index < 3 && value) inputRefs.current[index + 1]?.focus();
    if (updated.every(v => v.length === 1)) handleVerifyOtp();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };


  useEffect(() => {
    if (showOtpModal) {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [showOtpModal]);

  const closeLoginModal = () => {
    setShowLoginModal(false);
    setPhoneNumber("");
};

    const closeOtpModal = () => {
        setShowOtpModal(false);
        setOtpValues(["", "", "", ""]);
    };

  if (loading) {
    return <div className="text-center py-10">Loading addon...</div>;
  }

  if (!addon) {
    return <div className="text-center py-10">Addon not found</div>;
  }

  return (
    <section className="w-full min-h-screen bg-white flex justify-center px-4 py-6">
      <div className="w-full max-w-md space-y-4">

        {/* IMAGE */}
        {addon.image?.imageUrl && (
          <div className="w-full h-[220px] relative rounded-2xl overflow-hidden">
            <Image
              src={addon.image.imageUrl}
              alt={addon.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* ADDON CARD */}
        <div className="bg-[#111827] rounded-2xl p-5 space-y-3">
          <h1 className="text-white text-xl font-bold">
            {addon.title}
          </h1>

          <p className="text-gray-300 text-sm leading-relaxed">
            {addon.description}
          </p>

          <div className="flex items-center justify-between pt-4">
            <span className="text-white font-bold text-lg">
              ₹ {addon.price}
            </span>

            <button
              onClick={handleBuyAddon}
              className="px-6 py-3 bg-[#EF418E] rounded-xl text-white font-semibold hover:bg-[#D72F7A]"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl p-6 w-full max-w-sm relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-white text-xl"
            >
              ×
            </button>

            <h2 className="text-white text-xl font-bold text-center">
              Login / Signup
            </h2>

            <div className="mt-4 space-y-3">
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="h-12 rounded-xl px-3"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>

                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="Phone number"
                  className="flex-1 h-12 rounded-xl px-4"
                />
              </div>

              <button
                onClick={handleContinue}
                disabled={phoneNumber.length !== 10}
                className="w-full h-12 bg-[#EF418E] rounded-xl text-white font-bold disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal - WITH CLOSE BUTTON */}
      {showLoginModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#111827] rounded-[16px] p-6 w-full max-w-sm mx-4 flex flex-col items-center relative">
                        {/* CLOSE BUTTON */}
                        <button
                            onClick={closeLoginModal}
                            className="absolute top-4 right-4 w-8 h-8 bg-gray-800/50 hover:bg-gray-700 rounded-full flex items-center justify-center text-white text-lg font-bold transition-colors"
                        >
                            ×
                        </button>

                        <div className="w-full text-center space-y-4 px-2 pt-4">
                            <h2 className="font-[var(--font-sans)] font-bold text-2xl leading-[28px] tracking-[-0.2px] text-white">
                                Welcome!
                            </h2>
                            <p className="font-[var(--font-sans)] font-medium text-[16px] leading-[100%] text-[#6B7280]">
                                Log in or sign up
                            </p>

                            <div className="space-y-2 sm:flex sm:space-y-0 sm:space-x-2 w-full">
                                <select
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                    className="w-full sm:w-24 h-12 bg-[#F4F4F5] rounded-[16px] px-3 text-black font-semibold text-sm outline-none border border-gray-200 focus:ring-2 focus:ring-[#EF418E] focus:border-transparent"
                                >
                                    <option value="+91">+91</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+971">+971</option>
                                </select>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    placeholder="Phone number"
                                    maxLength={10}
                                    className="w-full sm:flex-1 h-12 bg-[#F4F4F5] rounded-[16px] px-4 text-black font-semibold text-sm outline-none border border-gray-200 focus:ring-2 focus:ring-[#EF418E] focus:border-transparent text-center"
                                />
                            </div>

                            <button
                                onClick={handleContinue}
                                disabled={phoneNumber.length !== 10}
                                className="w-full h-14 bg-[#EF418E] rounded-[16px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D72F7A] transition-colors"
                            >
                                <span className="font-[var(--font-sans)] font-bold text-[16px] leading-[100%] text-white">
                                    Continue
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

    {/* OTP Modal - WITH CLOSE BUTTON */}
    {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#111827] rounded-[16px] p-6 w-full max-w-sm mx-4 flex flex-col items-center relative">
                {/* CLOSE BUTTON */}
                <button
                    onClick={closeOtpModal}
                    className="absolute top-4 right-4 w-8 h-8 bg-gray-800/50 hover:bg-gray-700 rounded-full flex items-center justify-center text-white text-lg font-bold transition-colors"
                >
                    ×
                </button>

                <div className="w-full text-center space-y-4 px-2 pt-4">
                    <h2 className="font-[var(--font-sans)] font-bold text-2xl leading-[28px] tracking-[-0.2px] text-white">
                        Verify your number
                    </h2>
                    <p className="font-[var(--font-sans)] font-medium text-[16px] leading-[100%] text-[#6B7280] max-w-[260px] mx-auto">
                        Enter OTP sent to {countryCode} {phoneNumber}
                    </p>

                    <div className="flex gap-3 w-full max-w-[280px] mx-auto">
                        {Array(4).fill(0).map((_, i) => (
                            <input
                                key={i}
                                ref={(el) => { inputRefs.current[i] = el; }}
                                type="text"
                                maxLength={1}
                                value={otpValues[i]}
                                onChange={(e) => handleOtpChange(i, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                className="flex-1 w-16 h-16 bg-[#F4F4F5] rounded-[16px] text-center font-[var(--font-sans)] font-semibold text-xl text-black outline-none focus:ring-2 focus:ring-[#EF418E] focus:border-transparent"
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleVerifyOtp}
                        disabled={otpValues.join("").length !== 4}
                        className="w-full h-14 bg-[#EF418E] rounded-[16px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D72F7A] transition-colors"
                    >
                        <span className="font-[var(--font-sans)] font-bold text-[16px] leading-[100%] text-white">
                            Verify OTP
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )}
    </section>
  );
}

export default function AddonPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddonDetail />
    </Suspense>
  );
}
