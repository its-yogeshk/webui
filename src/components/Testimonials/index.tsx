"use client";

import { useState } from "react";

const testimonials = [
  {
    name: "Monika",
    review:
      "What I liked most about your classes is that your energy is always up and that makes us to give all our energy. Thanks for making it a bit more personalized and taking everyone's priority into consideration. You create the perfect blend of dance, bollywood, fitness, fun. Thanks for creating a dynamic and engaging environment during workout. Let's get it.",
  },
  {
    name: "Sangeetha",
    review:
      "I have been attending your Zumba classes for last few months and I can see significant change in my body, I feel lighter post workouts and more toned. I really admire your way of working as you make sure to ask everyone about their goals and work accordingly. You add your own elements to make Zumba more fun.",
  },
  {
    name: "Thannvi",
    review:
      "Thank you so much. Done with my first day of workout from Preethi's app and it is such a friendly app to use. Anything and from anywhere. I wish to continue my workout journey without any breaks.",
  },
];

const CARDS_PER_PAGE = 3;

function Avatar() {
  return (
    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
      <svg viewBox="0 0 36 36" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="18" fill="#d1d5db" />
        <circle cx="18" cy="14" r="6" fill="#9ca3af" />
        <path d="M4 34c0-7.732 6.268-14 14-14s14 6.268 14 14" fill="#9ca3af" />
      </svg>
    </div>
  );
}

function TestimonialCard({ name, review }: { name: string; review: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-col gap-3 h-full">
      <div className="flex items-center gap-3">
        <Avatar />
        <span className="font-montserrat font-semibold text-[14px] text-gray-900">{name}</span>
      </div>
      <p className="font-montserrat text-[12.5px] leading-[21px] text-gray-500">{review}</p>
    </div>
  );
}

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(testimonials.length / CARDS_PER_PAGE);
  const hasPrev = page > 0;
  const hasNext = page < totalPages - 1;

  // Mobile single-card state
  const [current, setCurrent] = useState(0);
  const prevCard = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const nextCard = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const visibleCards = testimonials.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  return (
    <section className="w-full bg-white py-14 px-6 lg:px-16">
      {/* Heading */}
      <h2 className="font-montserrat font-bold text-[26px] lg:text-[32px] text-[#1a1a2e] text-center mb-10 underline decoration-[#5528C8] decoration-2 underline-offset-4">
        Testimonials
      </h2>

      {/* ── Desktop: 3 cards + right arrow ── */}
      <div className="hidden lg:flex lg:items-center lg:gap-4 max-w-5xl mx-auto">
        {/* Left arrow — only when not on first page */}
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={!hasPrev}
          className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-colors ${
            hasPrev
              ? "border-gray-300 text-gray-500 hover:border-[#5528C8] hover:text-[#5528C8]"
              : "border-transparent text-transparent pointer-events-none"
          }`}
          aria-label="Previous"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Cards */}
        <div className="flex-1 grid grid-cols-3 gap-5">
          {visibleCards.map((t) => (
            <TestimonialCard key={t.name} name={t.name} review={t.review} />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNext}
          className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-colors ${
            hasNext
              ? "border-gray-300 text-gray-500 hover:border-[#5528C8] hover:text-[#5528C8]"
              : "border-gray-200 text-gray-300 cursor-default"
          }`}
          aria-label="Next"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Mobile: single card + arrows ── */}
      <div className="lg:hidden flex items-center gap-3">
        <button
          onClick={prevCard}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-[#5528C8] hover:text-[#5528C8] transition-colors"
          aria-label="Previous"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex-1">
          <TestimonialCard name={testimonials[current].name} review={testimonials[current].review} />
        </div>

        <button
          onClick={nextCard}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-[#5528C8] hover:text-[#5528C8] transition-colors"
          aria-label="Next"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Mobile dots */}
      <div className="lg:hidden flex justify-center gap-2 mt-5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? "bg-[#5528C8]" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
