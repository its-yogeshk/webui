"use client";

import Image from "next/image";

/* ── Feature chip data ── */
const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
        <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Dance Workouts",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Guided Sessions",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
      </svg>
    ),
    label: "Timer Tracking",
  },
];

/* ── Floating phone wrapper with glow ── */
function PhoneFrame({
  src,
  alt,
  rotate,
  className = "",
  glowColor = "rgba(239,65,142,0.45)",
}: {
  src: string;
  alt: string;
  rotate: number;
  className?: string;
  glowColor?: string;
}) {
  return (
    <div
      className={`relative rounded-[2.8rem] overflow-hidden ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        boxShadow: `0 24px 64px ${glowColor}, 0 8px 24px rgba(0,0,0,0.25)`,
        border: "5px solid rgba(255,255,255,0.15)",
      }}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="220px" />
    </div>
  );
}

export default function AppShowcase() {
  return (
    <>
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: rotate(-9deg) translateY(0px); }
          50%       { transform: rotate(-9deg) translateY(-14px); }
        }
        @keyframes floatB {
          0%, 100% { transform: rotate(9deg) translateY(-14px); }
          50%       { transform: rotate(9deg) translateY(0px); }
        }
        @keyframes floatC {
          0%, 100% { transform: rotate(-6deg) translateY(0px); }
          50%       { transform: rotate(-6deg) translateY(-10px); }
        }
        @keyframes floatD {
          0%, 100% { transform: rotate(6deg) translateY(-10px); }
          50%       { transform: rotate(6deg) translateY(0px); }
        }
        .float-a { animation: floatA 4s ease-in-out infinite; }
        .float-b { animation: floatB 4s ease-in-out infinite; }
        .float-c { animation: floatC 4.5s ease-in-out infinite; }
        .float-d { animation: floatD 4.5s ease-in-out infinite; }
      `}</style>

      <section className="w-full">

        {/* ══════════════════════════════════════════════
            HERO  — headline + 2 angled phones + logo
        ══════════════════════════════════════════════ */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #4a1fa8 0%, #7b2fbe 35%, #c2185b 70%, #ff4d8d 100%)",
          }}
        >
          {/* Radial glow blob top-right */}
          <div
            className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #ff4d8d 0%, transparent 70%)" }}
          />
          {/* Radial glow blob bottom-left */}
          <div
            className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #6a0dad 0%, transparent 70%)" }}
          />

          {/* ── Mobile hero ── */}
          <div className="lg:hidden relative flex flex-col px-6 pt-12 pb-16 gap-8">
            <h1 className="font-montserrat font-extrabold text-[26px] leading-[36px] text-white drop-shadow-md">
              Become the Best Version<br />
              of Yourself.<br />
              <span className="text-[#ffd6ea]">(Re)Start Your Fitness</span><br />
              Journey with Revolve.
            </h1>

            {/* Phones row */}
            <div className="flex justify-center items-end gap-5 mt-2 pt-10 pb-10">
              <div
                className="relative w-[163px] h-[335px] flex-shrink-0 float-a"
              >
                <Image src="/image/phone-screen-1.png" alt="App screen 1" fill className="object-contain" sizes="163px" />
              </div>

              <div
                className="relative w-[163px] h-[335px] flex-shrink-0 float-b"
              >
                <Image src="/image/phone-screen-2.png" alt="App screen 2" fill className="object-contain" sizes="163px" />
              </div>
            </div>
          </div>

          {/* ── Desktop hero ── */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:items-center lg:min-h-[640px] lg:px-20 lg:py-16 gap-10">
            {/* Left: headline */}
            <div className="flex flex-col gap-8 z-10">
              <h1 className="font-montserrat font-extrabold text-[48px] leading-[60px] text-white drop-shadow-md">
                Become the Best<br />
                Version of Yourself.<br />
                <span className="text-[#ffd6ea]">(Re)Start Your</span><br />
                Fitness Journey<br />
                with Revolve.
              </h1>
            </div>

            {/* Right: two phones angled */}
            <div className="relative flex justify-center items-center h-[680px] z-10">
              {/* Phone 1 — bottom-left, tilts left */}
              <div
                className="absolute bottom-8 left-10 float-a"
                style={{ width: 263, height: 538 }}
              >
                <Image src="/image/phone-screen-1.png" alt="App screen 1" fill className="object-contain" sizes="263px" />
              </div>

              {/* Phone 2 — top-right, tilts right */}
              <div
                className="absolute top-0 right-10 float-b"
                style={{ width: 263, height: 538 }}
              >
                <Image src="/image/phone-screen-2.png" alt="App screen 2" fill className="object-contain" sizes="263px" />
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            MID  — motivational text + heart watermark
        ══════════════════════════════════════════════ */}
        <div
          className="relative w-full px-6 py-16 lg:py-24 lg:px-20 flex flex-col items-center justify-center text-center overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #7b2fbe 0%, #b5296b 55%, #ff4d8d 100%)",
          }}
        >
          {/* Heart watermark */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10"
            aria-hidden
          >
            <svg viewBox="0 0 400 360" fill="none" className="w-[85%] max-w-[480px]" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M200 320 C120 265, 20 200, 20 110 C20 50, 70 10, 120 10 C150 10, 180 26, 200 50 C220 26, 250 10, 280 10 C330 10, 380 50, 380 110 C380 200, 280 265, 200 320Z"
                stroke="white"
                strokeWidth="8"
                fill="none"
              />
            </svg>
          </div>

          {/* Smaller decorative heart right */}
          <div
            className="pointer-events-none absolute -right-10 bottom-10 opacity-20"
            aria-hidden
          >
            <svg viewBox="0 0 200 180" fill="none" className="w-44" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 160 C60 130, 10 100, 10 55 C10 25, 35 5, 60 5 C75 5, 90 13, 100 25 C110 13, 125 5, 140 5 C165 5, 190 25, 190 55 C190 100, 140 130, 100 160Z"
                stroke="#FFB6C1"
                strokeWidth="5"
                fill="none"
              />
            </svg>
          </div>

          <Image
            src="/fitness/revolve.png"
            alt="Revolve by Preethi"
            width={180}
            height={70}
            className="relative z-10 object-contain drop-shadow-xl mb-6"
          />
          <p className="relative z-10 font-montserrat font-bold text-white text-[22px] lg:text-[34px] leading-[34px] lg:leading-[50px] max-w-[700px] drop-shadow-md">
            Because when workouts feel fun,<br className="hidden lg:block" />
            consistency becomes natural —<br className="hidden lg:block" />
            not forced.
          </p>
        </div>

        {/* ══════════════════════════════════════════════
            FEATURES  — phones + feature chips
        ══════════════════════════════════════════════ */}
        <div
          className="relative w-full px-6 py-16 lg:py-24 lg:px-20 overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #c2185b 0%, #d81b6a 40%, #e91e8c 100%)",
          }}
        >
          {/* Glow blob */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20 rounded-full"
            style={{ background: "radial-gradient(ellipse, #fff 0%, transparent 70%)" }}
          />

          {/* ── Mobile ── */}
          <div className="lg:hidden flex flex-col items-center gap-10">
            <div className="relative w-[90vw] float-c">
              <Image src="/image/phone-screen-3.png" alt="App features" width={680} height={680} className="w-full h-auto object-contain" />
            </div>

            {/* Feature chips */}
            <div className="flex flex-col gap-3 w-full max-w-[300px]">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 px-5 py-3 rounded-full text-white font-montserrat font-semibold text-[14px]"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <span className="opacity-90">{f.icon}</span>
                  {f.label}
                </div>
              ))}
            </div>
          </div>

          {/* ── Desktop ── */}
          <div className="hidden lg:flex lg:flex-row lg:items-center lg:gap-20 max-w-5xl mx-auto">
            {/* Phone */}
            <div className="flex-shrink-0 float-c">
              <Image src="/image/phone-screen-3.png" alt="App features" width={560} height={420} className="h-auto object-contain" />
            </div>

            {/* Text + chips */}
            <div className="flex flex-col gap-8">
              <h2 className="font-montserrat font-extrabold text-white text-[36px] leading-[48px] drop-shadow-md">
                Everything you need<br />
                to stay consistent.
              </h2>
              <div className="flex flex-col gap-4">
                {features.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-4 px-6 py-4 rounded-2xl text-white font-montserrat font-semibold text-[16px] w-fit"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                    }}
                  >
                    <span className="opacity-90">{f.icon}</span>
                    {f.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            BOTTOM  — closing text
        ══════════════════════════════════════════════ */}
        <div
          className="relative w-full px-6 py-16 lg:py-24 lg:px-20 flex items-center justify-center text-center overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #e91e8c 0%, #f06292 50%, #f8bbd0 100%)",
          }}
        >
          {/* Faint large heart */}
          <div
            className="pointer-events-none absolute inset-0 flex items-end justify-end opacity-15 pr-6 pb-6"
            aria-hidden
          >
            <svg viewBox="0 0 300 270" fill="none" className="w-64 lg:w-80" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M150 240 C90 195, 15 150, 15 82 C15 37, 52 7, 90 7 C112 7, 135 20, 150 38 C165 20, 188 7, 210 7 C248 7, 285 37, 285 82 C285 150, 210 195, 150 240Z"
                stroke="white"
                strokeWidth="6"
                fill="none"
              />
            </svg>
          </div>

          <p className="relative z-10 font-montserrat font-semibold text-white text-[17px] lg:text-[22px] leading-[30px] lg:leading-[38px] max-w-[680px] drop-shadow-sm">
            Where music meets movement and fitness meets dance — creating workouts that tone,
            strengthen, and sculpt your body while keeping you energized and inspired.
          </p>
        </div>

      </section>
    </>
  );
}
