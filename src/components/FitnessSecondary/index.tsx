"use client";

import Image from "next/image";
import Link from "next/link";

export default function FitnessSecondary() {
  return (
    <div className="w-full h-[371px] lg:max-w-full lg:h-[414px] mx-auto bg-[#5528C8] relative overflow-hidden flex items-center justify-center">
      {/* MOBILE / TABLET FOOTER */}
      <div className="w-full lg:hidden px-4">
        <div className="flex flex-row gap-8 -mt-10">
          {/* Left: Social */}
          <div className="flex flex-col gap-4">
            <p className="font-[var(--font-dm-sans)] font-bold text-[13px] leading-[100%] tracking-[0px] text-white">
              Social
            </p>

            {/* Row 1 */}
            <div className="flex gap-3">
              {/* Instagram */}
              <a href="https://www.instagram.com/preethipadaki?igsh=MWpveGt2eG8yaHBrYg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
              <div className="w-[54.09px] h-[54.09px] rounded-[5.78px] bg-[linear-gradient(90deg,#EC4899_0%,#9333EA_100%)] flex flex-col items-center justify-center gap-1">
                <Image
                  src="/fitness/instagram.png"
                  alt="Instagram"
                  width={15.17}
                  height={17.33}
                />
                <span className="font-['Inter'] font-semibold text-[7.7px] leading-[11.56px] text-white text-center">
                  Instagram
                </span>
              </div>
              </a>

              {/* Facebook */}
              <a href="https://www.facebook.com/share/1CNXJwqgSw/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
              <div className="w-[54.09px] h-[54.09px] rounded-[5.78px] bg-[linear-gradient(90deg,#2563EB_0%,#1D4ED8_100%)] flex flex-col items-center justify-center gap-1">
                <Image
                  src="/fitness/facebook.png"
                  alt="Facebook"
                  width={17.33}
                  height={17.33}
                />
                <span className="font-['Inter'] font-semibold text-[7.7px] leading-[11.56px] text-white text-center">
                  Facebook
                </span>
              </div>
              </a>
            </div>

            {/* Row 2 */}
            <div className="flex gap-3">
              {/* YouTube */}
              <a href="https://www.youtube.com/@revolvebypreethi" target="_blank" rel="noopener noreferrer">
              <div className="w-[54.09px] h-[54.09px] rounded-[5.78px] bg-[#FF0000] flex flex-col items-center justify-center gap-1">
                <Image
                  src="/fitness/youtube.png"
                  alt="YouTube"
                  width={16.02}
                  height={10.47}
                />
                <span className="font-['Inter'] font-semibold text-[7.7px] leading-[11.56px] text-white text-center">
                  YouTube
                </span>
              </div>
              </a>

              {/* WhatsApp */}
              <a href="https://chat.whatsapp.com/HqEyAMWOPdsKRkKpKjpz0N?mode=gi_t" target="_blank" rel="noopener noreferrer">
              <div className="w-[54.09px] h-[54.09px] rounded-[5.78px] bg-[linear-gradient(90deg,#22C55E_0%,#16A34A_100%)] flex flex-col items-center justify-center gap-1">
                <Image
                  src="/fitness/whatsapp.png"
                  alt="WhatsApp"
                  width={15.17}
                  height={17.33}
                />
                <span className="font-['Inter'] font-semibold text-[7.7px] leading-[11.56px] text-white text-center">
                  WhatsApp
                </span>
              </div>
              </a>
            </div>

            {/* Revolve below row 2 */}
            <div className="mt-3 flex justify-center">
              <Image
                src="/fitness/revolve.png"
                alt="Revolve"
                width={123}
                height={55.04}
              />
            </div>
          </div>

          {/* Right: Contact + Learn More (mobile) */}
          <div className="flex flex-col gap-2 ml-2">
            <p className="font-[var(--font-dm-sans)] font-bold text-[13px] leading-[100%] tracking-[0px] text-white">
              Contact Us
            </p>

            {/* Phone line */}
            <div className="flex items-center mt-2 gap-1">
              <span className="font-[var(--font-dm-sans)] font-normal text-[12px] leading-[100%] tracking-[0px] text-white opacity-[0.7]">
                Phone no:
              </span>
              <span className="font-[var(--font-dm-sans)] font-bold text-[12px] leading-[100%] tracking-[0px] text-white">
              +91 98867 84904
              </span>
            </div>

            {/* Email line */}
            <div className="flex items-center mt-2 gap-1">
              <span className="font-[var(--font-dm-sans)] font-normal text-[12px] leading-[100%] tracking-[0px] text-white opacity-[0.7]">
                Email:
              </span>
              <a
                href="mailto:example@gmail.com"
                className="font-[var(--font-dm-sans)] font-bold text-[12px] leading-[100%] tracking-[0px] text-white"
              >
                revolvebypreethi@gmail.com
              </a>
            </div>

            {/* Learn More + links */}
            <div className="mt-8 flex flex-col gap-[2px]">
              <p className="font-[var(--font-dm-sans)] font-bold text-[13px] leading-[100%] tracking-[0px] text-white">
                Learn More
              </p>

              <Link
                href="/aboutus"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[var(--font-dm-sans)] font-normal text-[12px] leading-[26.03px] tracking-[0px] text-white opacity-[0.8]"
              >
                About Us
              </Link>
              {/* <Link
                href="/plan"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[var(--font-dm-sans)] font-normal text-[12px] leading-[26.03px] tracking-[0px] text-white opacity-[0.8]"
              >
                Subscription plans
              </Link>
              <Link
                href="/refundpolicy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[var(--font-dm-sans)] font-normal text-[12px] leading-[26.03px] tracking-[0px] text-white opacity-[0.8]"
              >
                Refund policy
              </Link> */}
              <Link
                href="/terms-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[var(--font-dm-sans)] font-normal text-[12px] leading-[26.03px] tracking-[0px] text-white opacity-[0.8]"
              >
                Terms and conditions
              </Link>
              <Link
                href="/privacypolicy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[var(--font-dm-sans)] font-normal text-[12px] leading-[26.03px] tracking-[0px] text-white opacity-[0.8]"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP FOOTER */}
      <div className="hidden lg:flex w-full max-w-[1280px] flex-col px-10">
        {/* Top row: logo + three columns */}
        <div className="flex w-full items-start justify-between">
          {/* Left: Revolve logo */}
          <Image
            src="/fitness/revolve.png"
            alt="Revolve"
            width={181}
            height={81}
          />

          {/* Right: three columns grouped so they can shift left as needed */}
          <div className="flex gap-16">
            {/* Learn More column */}
            <div className="flex flex-col gap-[2px]">
              <p className="font-['DM_Sans'] font-bold text-[16px] leading-[100%] tracking-[0px] text-white">
                Learn More
              </p>
              <Link
                href="/aboutus"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['DM_Sans'] font-normal text-[14px] leading-[30px] tracking-[0px] text-white opacity-[0.8]"
              >
                About Us
              </Link>
              {/* <Link
                href="/plan"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['DM_Sans'] font-normal text-[14px] leading-[30px] tracking-[0px] text-white opacity-[0.8]"
              >
                Subscription plans
              </Link>
              <Link
                href="/refundpolicy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['DM_Sans'] font-normal text-[14px] leading-[30px] tracking-[0px] text-white opacity-[0.8]"
              >
                Refund policy
              </Link> */}
              <Link
                href="/terms-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['DM_Sans'] font-normal text-[14px] leading-[30px] tracking-[0px] text-white opacity-[0.8]"
              >
                Terms and conditions
              </Link>
              <Link
                href="/privacypolicy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['DM_Sans'] font-normal text-[14px] leading-[30px] tracking-[0px] text-white opacity-[0.8]"
              >
                Privacy Policy
              </Link>
            </div>

            {/* Contact Us column */}
            <div className="flex flex-col gap-2">
              <p className="font-['DM_Sans'] font-bold text-[16px] leading-[100%] tracking-[0px] text-white">
                Contact Us
              </p>

              {/* Phone line */}
              <div className="flex items-center gap-1">
                <span className="font-['DM_Sans'] font-normal text-[14px] leading-[100%] tracking-[0px] text-white opacity-[0.7]">
                  Phone no:
                </span>
                <span className="font-['DM_Sans'] font-bold text-[14px] leading-[100%] tracking-[0px] text-white">
                +91 98867 84904
                </span>
              </div>

              {/* Email line */}
              <div className="flex items-center gap-1">
                <span className="font-['DM_Sans'] font-normal text-[14px] leading-[100%] tracking-[0px] text-white opacity-[0.7]">
                  Email:
                </span>
                <a
                  href="mailto:example@gmail.com"
                  className="font-['DM_Sans'] font-bold text-[14px] leading-[100%] tracking-[0px] text-white"
                >
                   revolvebypreethi@gmail.com
                </a>
              </div>
            </div>

            {/* Social column + big cards below */}
            <div className="flex flex-col gap-3">
              <p className="font-['DM_Sans'] font-bold text-[16px] leading-[100%] tracking-[0px] text-white">
                Social
              </p>

              {/* Big social cards row directly below Social */}
              <div className="flex gap-3">
                {/* Instagram */}
                <a href="https://www.instagram.com/preethipadaki?igsh=MWpveGt2eG8yaHBrYg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                <div className="w-[96.34px] h-[96.34px] rounded-[10.29px] bg-[linear-gradient(90deg,#EC4899_0%,#9333EA_100%)] flex flex-col items-center justify-center gap-1">
                  <Image
                    src="/fitness/instagram.png"
                    alt="Instagram"
                    width={27.01}
                    height={30.87}
                  />
                  <span className="font-['Inter'] font-semibold text-[13.72px] leading-[20.58px] text-white text-center">
                    Instagram
                  </span>
                </div>
                </a>

                {/* Facebook */}
                <a href="https://www.facebook.com/share/1CNXJwqgSw/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                <div className="w-[96.34px] h-[96.34px] rounded-[10.29px] bg-[linear-gradient(90deg,#2563EB_0%,#1D4ED8_100%)] flex flex-col items-center justify-center gap-1">
                  <Image
                    src="/fitness/facebook.png"
                    alt="Facebook"
                    width={30.87}
                    height={30.87}
                  />
                  <span className="font-['Inter'] font-semibold text-[13.72px] leading-[20.58px] text-white text-center">
                    Facebook
                  </span>
                </div>
                </a>

                {/* YouTube */}
                <a href="https://www.youtube.com/@revolvebypreethi" target="_blank" rel="noopener noreferrer">
                <div className="w-[96.34px] h-[96.34px] rounded-[10.29px] bg-[#FF0000] flex flex-col items-center justify-center gap-1">
                  <Image
                    src="/fitness/youtube.png"
                    alt="YouTube"
                    width={28.54}
                    height={18.65}
                  />
                  <span className="font-['Inter'] font-semibold text-[13.72px] leading-[20.58px] text-white text-center">
                    YouTube
                  </span>
                </div>
                </a>

                {/* WhatsApp */}
                <a href="https://chat.whatsapp.com/HqEyAMWOPdsKRkKpKjpz0N?mode=gi_t" target="_blank" rel="noopener noreferrer">
                <div className="w-[96.34px] h-[96.34px] rounded-[10.29px] bg-[linear-gradient(90deg,#22C55E_0%,#16A34A_100%)] flex flex-col items-center justify-center gap-1">
                  <Image
                    src="/fitness/whatsapp.png"
                    alt="WhatsApp"
                    width={27.01}
                    height={30.87}
                  />
                  <span className="font-['Inter'] font-semibold text-[13.72px] leading-[20.58px] text-white text-center">
                    WhatsApp
                  </span>
                </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SMALL-DEVICE divider + copyright (HIDDEN ON DESKTOP) */}
      <div className="lg:hidden absolute bottom-10 left-1/2 -translate-x-1/2 w-[278px] border-t-[0.67px] border-white opacity-[0.2]" />
      <p className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 w-[300px] text-[8px] font-[var(--font-dm-sans)] font-normal leading-[100%] tracking-[0px] text-white opacity-[0.65] text-center whitespace-nowrap">
        © 2025 RevolveByPreethi | All Rights Reserved
      </p>

      {/* Desktop-only bottom divider */}
      <div className="hidden lg:block absolute bottom-[40px] left-1/2 -translate-x-1/2 w-[90%] max-w-[1073px] border-t border-white opacity-[0.2]" />

      {/* Desktop-only copyright text */}
      <p className="hidden lg:block absolute bottom-[12px] left-1/2 -translate-x-1/2 font-['DM_Sans'] font-normal text-[14px] leading-[100%] tracking-[0px] text-white opacity-[0.65] text-center">
        © {new Date().getFullYear()} Revolve By Preethi | All Rights Reserved
      </p>
    </div>
  );
}
