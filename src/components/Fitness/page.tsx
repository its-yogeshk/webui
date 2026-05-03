"use client";

import Image from "next/image";

export default function Fitness() {
  return (
    <div
      className="
        relative w-full
        h-[100dvh]
        lg:h-auto
        lg:aspect-1280/739
        overflow-hidden
      "
    >
      {/* ================= Mobile / Tablet Image ================= */}
      <div className="lg:hidden w-full h-[100dvh] relative">
        <Image
          src="/image/fitness.png"
          alt="Fitness"
          fill
          className="object-cover object-[70%_center]"
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(109.41deg, rgba(238, 67, 142, 0.6) 6.91%, rgba(85, 40, 200, 0.6) 95.02%)",
          }}
        />
      </div>

      {/* ================= Desktop Image ================= */}
      <div className="hidden lg:block w-full h-full relative">
        <Image
          src="/image/fitness.png"
          alt="Fitness"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(109.41deg, rgba(238, 67, 142, 0.6) 6.91%, rgba(85, 40, 200, 0.6) 95.02%)",
          }}
        />
      </div>

      {/* ================= Mobile / Tablet Content (Perfect Center) ================= */}
      <div className="lg:hidden absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center text-center px-6 gap-4 w-full max-w-[360px]">
          {/* Heading */}
          <p className="font-montserrat font-bold text-[28px] xs:text-[36px] leading-[36px] xs:leading-[48px] text-white drop-shadow-lg">
            Transform your
            fitness journey
            with Preethi
          </p>

          {/* Subtitle */}
          <p className="font-montserrat font-medium text-[14px] xs:text-[16px] leading-[22px] xs:leading-[24px] text-white drop-shadow-lg">
            Unlock your best self through fun, effective dance workouts — no pressure, no extremes, just routines that help you feel stronger, more confident, and energized.
          </p>

          {/* Store Buttons */}
          <div className="flex gap-3 mt-2 w-full justify-center">
            <a href="https://play.google.com/store/apps/details?id=com.revolve_by_preethi.app" target="_blank" rel="noopener noreferrer" className="flex-1 max-w-[140px]">
              <Image
                src="/fitness/googlePlay.png"
                alt="Google Play"
                width={150}
                height={48}
                className="object-contain w-full h-auto"
              />
            </a>
            <a href="https://apps.apple.com/in/app/revolve-by-preethi/id6751812012" target="_blank" rel="noopener noreferrer" className="flex-1 max-w-[130px]">
              <Image
                src="/fitness/appStore.png"
                alt="App Store"
                width={140}
                height={48}
                className="object-contain w-full h-auto"
              />
            </a>
          </div>
        </div>
      </div>

      {/* ================= Desktop Heading ================= */}
      <p className="hidden lg:block font-montserrat font-bold text-[70px] leading-[75px] text-white drop-shadow-lg absolute top-38 left-[118px] w-[786px] whitespace-pre-line">
        Transform your<br />
        fitness journey with<br />
        preethi
      </p>

      {/* ================= Desktop Subtitle ================= */}
      <p className="hidden lg:block font-montserrat font-medium text-[20px] leading-7 text-white drop-shadow-lg absolute top-112 left-[120px] w-[650px]">
        Unlock your best self through fun, effective dance workouts — no pressure, no extremes, just routines that help you feel stronger, more confident, and energized.      
      </p>

      {/* ================= Desktop Store Buttons ================= */}
      <div className="hidden lg:flex absolute top-[580px] left-[120px] gap-4">
        <a href="https://play.google.com/store/apps/details?id=com.revolve_by_preethi.app" target="_blank" rel="noopener noreferrer">
          <Image
            src="/fitness/googlePlayd.png"
            alt="Google Play"
            width={196}
            height={58}
          />
        </a>
        <a href="https://apps.apple.com/in/app/revolve-by-preethi/id6751812012" target="_blank" rel="noopener noreferrer">
          <Image
            src="/fitness/appStore-Desktop.png"
            alt="App Store"
            width={175}
            height={58}
          />
        </a>
      </div>
    </div>
  );
}
