"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { getPlans } from "@/services/plan.service";
import { Plan } from "@/models/plan";
import { useRouter } from "next/navigation";
import { sendOtpForLoginAndRegister, verifyOtp } from "@/services/auth.service";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ChoosePlan() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otpSessionId, setOtpSessionId] = useState<string | null>(null);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      localStorage.setItem("token", id);
      console.log("Plan ID stored:", id);
    }
  }, [id]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await getPlans();
        console.log("getPlans...............", res);
        // localStorage.removeItem("token");
        setPlans(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const currentPlan = plans.find((p) => p.userType === "free");
  const basicPlan = plans.find((p) => p.userType === "basic");
  const premiumPlan = plans.find((p) => p.userType === "premium");

  const handleGetMembership = (userType?: string, amount?: number) => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(`/payment?userType=${userType}&amount=${amount}`);
    } else {
      // ❌ Not logged in → open login popup
      setShowLoginModal(true);

      // ✅ STORE selected plan HERE
      localStorage.setItem(
        "selectedPlan",
        JSON.stringify({ userType, amount })
      );
      setShowLoginModal(true);
    }
  };

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

  // const handleVerifyOtp = () => {
  //   const otp = otpValues.join("");
  //   if (otp.length === 4) {
  //     setShowOtpModal(false);
  //     alert("Membership activated! 🎉");
  //   }
  // };

  const handleVerifyOtp = async () => {
    const otp = otpValues.join("");

    if (!otpSessionId || otp.length !== 4) return;

    try {
      const res = await verifyOtp({
        id: otpSessionId,
        otp,
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.accessToken);
      setShowOtpModal(false);
      // 🔁 Redirect to payment if user came from checkout
      const selectedPlan = localStorage.getItem("selectedPlan");

      if (selectedPlan) {
        const { userType, amount } = JSON.parse(selectedPlan);
        localStorage.removeItem("selectedPlan");
        router.push(`/payment?userType=${userType}&amount=${amount}`);
      } else {
        router.push("/"); // or dashboard
      }
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(-1);

    setOtpValues(newOtpValues);

    if (index < 3 && value) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtpValues.every((val) => val.length === 1)) {
      handleVerifyOtp();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
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
    return <div className="text-center py-10">Loading plans...</div>;
  }

  return (
    <section className="w-full py-10 flex justify-center bg-white lg:bg-gray-800 relative z-0">
      <div className="w-full max-w-full px-4 grid grid-cols-1 md:grid-cols-2 lg:block lg:space-y-6 gap-6">
        {/* Current Plan Card */}
        <div className="w-[337px] h-[180px] bg-[#EE428E] border border-[#EE428E] rounded-[16px] mx-auto relative px-5 pt-2 pb-5 flex flex-col">
          <div className="absolute top-0 left-0">
            {/* <div className="w-[107px] h-[26px] bg-white border border-[#EE428E] rounded-tl-[16px] rounded-br-[12px] flex items-center justify-center">
              <span className="font-[var(--font-sans)] font-bold text-[12px] leading-[100%] text-black">
                {currentPlan?.title}
              </span>
            </div> */}
          </div>
          <div className="mt-4 flex flex-col gap-3 flex-1">
            <p className="font-[var(--font-sans)] font-bold text-[24px] leading-[28px] text-white tracking-[-0.2px]">
              {currentPlan?.title}
            </p>
            {currentPlan?.descriptions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Image
                  src="/fitness/tick.png"
                  alt="Tick"
                  width={12}
                  height={14}
                />
                <p className="text-white text-[14px]">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 font-[var(--font-sans)] font-normal text-[12px] leading-[100%] text-white text-center opacity-80">
            Auto-activated on signup • Cancel anytime
          </p>
        </div>

        {/* Basic Plan Card */}
        <div className="w-[337px] h-[400px] bg-[#5528C8] rounded-[16px] mx-auto px-5 pt-5 pb-5 flex flex-col relative">
          <div className="absolute top-0 left-0">
            <div className="w-[93px] h-[26px] bg-[#21BC3D] rounded-tl-[16px] rounded-br-[12px] flex items-center justify-center">
              <span className="font-[var(--font-sans)] font-bold text-[12px] leading-[100%] text-white">
                POPULAR
              </span>
            </div>
          </div>

          <div className="flex items-start justify-between mt-4">
            <div className="flex flex-col gap-2">
              <p className="font-[var(--font-sans)] font-bold text-[24px] leading-[28px] text-white tracking-[-0.2px]">
                {basicPlan?.title}
              </p>

              {basicPlan?.discount && (
                <div className="w-[95px] h-[24px] bg-[#E5E7EB] rounded-full flex items-center justify-center">
                  <span className="font-[var(--font-sans)] font-bold text-[12px] leading-[100%] text-black">
                    SAVE {basicPlan?.discount}%
                  </span>
                </div>
              )}
            </div>

            <div className="text-right">
              <p className="mt-1 font-[var(--font-sans)] font-bold text-[14px] leading-[100%] text-white">
                ₹{basicPlan?.discountedPrice} / month
              </p>
              <p className="mt-1 font-[var(--font-sans)] font-normal text-[14px] leading-[100%] text-[#F59E0B] line-through">
                ₹{basicPlan?.price}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 flex-1">
            {basicPlan?.descriptions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Image
                  src="/fitness/tick.png"
                  alt="Tick"
                  width={12}
                  height={14}
                />
                <p className="text-white text-[14px]">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-center gap-2">
            <button
              disabled={basicPlan?.isCurrentPlan}
              onClick={() =>
                handleGetMembership(
                  basicPlan?.userType,
                  basicPlan?.discountedPrice
                )
              }
              className={`w-[300px] h-[48px] rounded-[12px] border flex items-center justify-center transition-colors
                      ${
                        basicPlan?.isCurrentPlan
                          ? "bg-gray-200 border-gray-300 cursor-not-allowed"
                          : "bg-white border-[#E5E7EB] hover:bg-gray-50"
                      }`}
            >
              <span
                className={`font-[var(--font-sans)] font-bold text-[14px] leading-[100%]
                        ${
                          basicPlan?.isCurrentPlan
                            ? "text-gray-500"
                            : "text-black"
                        }`}
              >
                {basicPlan?.isCurrentPlan ? "Current Plan" : "Get Membership"}
              </span>
            </button>

            <p className="mt-2 font-[var(--font-sans)] font-normal text-[12px] leading-[100%] text-white text-center opacity-80">
              Auto-renews monthly • Cancel anytime
            </p>
          </div>
        </div>
        {/* Premium Plan Card */}
        <div className="w-[337px] h-[340px] bg-[linear-gradient(116.15deg,#FF87AB_7.12%,#FF75A6_12.49%,#FF3897_19.76%,#FF2D94_30.65%,#DD229B_41.02%,#CB26AF_52.55%,#B82BC3_62.55%,#5528C8_90.07%)] rounded-[16px] mx-auto relative px-5 pt-6 pb-5 flex flex-col">
          <div className="absolute top-0 left-0">
            {/* <div className="w-[93px] h-[26px] bg-[#21BC3D] rounded-tl-[16px] rounded-br-[12px] flex items-center justify-center">
              <span className="font-[var(--font-sans)] font-bold text-[12px] leading-[100%] text-white">
                POPULAR
              </span>
            </div> */}
          </div>
          <div className="mt-4 flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-[var(--font-sans)] font-bold text-[24px] leading-[28px] text-white tracking-[-0.2px]">
                {premiumPlan?.title}
              </p>
              {/* <div className="w-[87.56px] h-[24px] bg-[#E5E7EB] rounded-full flex items-center justify-center">
                <span className="font-[var(--font-sans)] font-bold text-[12px] leading-[100%] text-black">
                  SAVE {premiumPlan?.discount}%
                </span>
              </div> */}
            </div>
            <div className="text-right">
              <p className="font-[var(--font-sans)] font-bold text-[14px] leading-[100%] text-white">
                {/* ₹ {premiumPlan?.monthlyDiscountedPrice} / month */}
              </p>

              <p className="mt-1 font-[var(--font-sans)] font-normal text-[14x] leading-[100%] text-[#F59E0B] line-through">
                {/* ₹{premiumPlan?.price} */}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 flex-1">
            {premiumPlan?.descriptions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Image
                  src="/fitness/tick.png"
                  alt="Tick"
                  width={12}
                  height={8}
                />
                <p className="text-white text-[14px]">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col items-center gap-2">
            <button
              disabled={true}
              // disabled={premiumPlan?.isCurrentPlan}
              onClick={() =>
                handleGetMembership(
                  premiumPlan?.userType,
                  premiumPlan?.discountedPrice
                )
              }
              className={`w-[300px] h-[48px] rounded-[12px] border flex items-center justify-center transition-colors ${
                premiumPlan?.isCurrentPlan
                  ? "bg-white/70 border-white/40 cursor-not-allowed"
                  : "bg-white border-[#E5E7EB] hover:bg-gray-50"
              }`}
            >
              <span
                className={`font-[var(--font-sans)] font-bold text-[14px] leading-[100%]${
                  premiumPlan?.isCurrentPlan ? "text-gray-400" : "text-black"
                }`}
              >
                {premiumPlan?.isCurrentPlan ? "Coming Soon" : "Coming Soon"}
              </span>
            </button>

            {/* <p className="font-[var(--font-sans)] font-normal text-[12px] leading-[16px] text-white text-center">
                            Billed yearly • 7-day free trial included
                        </p> */}
          </div>
        </div>

        {/* Free Trial Info Card */}
        {/* <div className="w-[337px] h-[152px] bg-[#FFE7F2] border border-[#E5E7EB] rounded-[16px] mx-auto px-5 py-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Image src="/fitness/note.png" alt="Note" width={20} height={20} />
                        <p className="font-[var(--font-sans)] font-semibold text-[16px] leading-[24px] text-[#111827]">
                            How your free trial works
                        </p>
                    </div>
                    <div className="mt-1 ml-7 flex flex-col gap-2">
                        <p className="font-[var(--font-sans)] font-normal text-[13px] leading-[100%] text-[#4B5563]">
                            • Start your 7-day free trial immediately
                        </p>
                        <p className="font-[var(--font-sans)] font-normal text-[14px] leading-[100%] text-[#4B5563]">
                            • No charges until trial ends
                        </p>
                        <p className="font-[var(--font-sans)] font-normal text-[14px] leading-[100%] text-[#4B5563]">
                            • Cancel anytime before trial expires
                        </p>
                        <p className="font-[var(--font-sans)] font-normal text-[14px] leading-[100%] text-[#4B5563]">
                            • Full access to all premium features
                        </p>
                    </div>
                </div> */}
      </div>

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
                  onChange={(e) =>
                    setPhoneNumber(
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
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
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        inputRefs.current[i] = el;
                      }}
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

export default function planDefaultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChoosePlan />
    </Suspense>
  );
}
