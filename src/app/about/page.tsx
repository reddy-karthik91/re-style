import Image from "next/image";
import { Metadata } from "next";
import ContactForm from "@/components/about/ContactForm";

export const metadata: Metadata = {
  title: "About Our Story",
  description: "Learn about the RE-STYLE philosophy—redefining modern essentials through sustainable materials and ethical production.",
  openGraph: {
    title: "About RE-STYLE | Our Story",
    description: "Ethical production and timeless design.",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-16 lg:py-24 space-y-32">
      
      {/* SECTION 1: HERO / STORY */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400">Our Story</h2>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Redefining <br /> Modern <br /> Essentials.
          </h1>
          <p className="text-neutral-600 leading-relaxed max-w-md text-sm uppercase tracking-wide font-medium">
            RE-STYLE was born from a desire to strip away the noise. We believe in high-quality materials, ethical production, and a color palette that never goes out of style.
          </p>
        </div>
        <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden group">
          <Image 
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80" 
            alt="Minimalist Fashion Editorial" 
            fill 
            priority
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
          />
        </div>
      </section>

      {/* SECTION 2: VALUES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-neutral-100 pt-16 text-center">
        {[
          { title: "Sustainably Sourced", desc: "100% Organic Materials" },
          { title: "Ethical Labor", desc: "Fair Trade Certified" },
          { title: "Timeless Design", desc: "Built to last decades" },
        ].map((value, i) => (
          <div key={i} className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">{value.title}</h3>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{value.desc}</p>
          </div>
        ))}
      </section>

      {/* SECTION 3: CONTACT FORM & INFO */}
      <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-neutral-100 pt-32 scroll-mt-32">
        <div className="lg:col-span-5 space-y-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Get in Touch</h2>
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">Customer Service</p>
              <p className="text-sm font-bold uppercase tracking-widest hover:text-neutral-500 transition-colors">
                <a href="mailto:support@re-style.com">support@re-style.com</a>
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">Social</p>
              <div className="flex gap-6 text-sm font-bold uppercase tracking-widest">
                <a href="#" className="hover:line-through">Instagram</a>
                <a href="#" className="hover:line-through">X</a>
              </div>
            </div>
          </div>
        </div>

        {/* REFACTORED CLIENT COMPONENT */}
        <ContactForm />
      </section>
    </div>
  );
}