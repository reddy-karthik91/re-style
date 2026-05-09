"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // Capture the form element
    setStatus("sending");

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // SUCCESS ACTIONS
    setStatus("success");
    form.reset(); // This clears all input fields immediately
    
    // Reset button state after 5 seconds
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <input 
          required
          name="user_name"
          type="text" 
          placeholder="Your Name" 
          className="border-b py-3 text-sm outline-none focus:border-black transition-colors bg-transparent placeholder:text-neutral-300" 
        />
        <input 
          required
          name="user_email"
          type="email" 
          placeholder="Email Address" 
          className="border-b py-3 text-sm outline-none focus:border-black transition-colors bg-transparent placeholder:text-neutral-300" 
        />
      </div>
      <textarea 
        required
        name="user_message"
        rows={4} 
        placeholder="Your Message" 
        className="w-full border-b py-3 text-sm outline-none focus:border-black transition-colors bg-transparent resize-none placeholder:text-neutral-300"
      ></textarea>
      
      <div className="flex flex-col items-start gap-4">
        <button 
          type="submit"
          disabled={status !== "idle"}
          className={cn(
            "px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500 w-full md:w-auto",
            status === "success" 
              ? "bg-green-600 text-white" 
              : "bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-400"
          )}
        >
          {status === "sending" ? "Sending..." : status === "success" ? "Message Sent" : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-green-600 animate-in fade-in slide-in-from-top-1">
            Thank you. We will get back to you shortly.
          </p>
        )}
      </div>
    </form>
  );
}