import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Image - Optimized with next/image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
          alt="RE-STYLE Premium Fashion Collection"
          fill
          priority
          className="object-cover opacity-60"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase">
          Re-Define <br /> Your Style
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-medium">
          Discover the new standard in sustainable, high-performance apparel for the modern era.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/products?category=men" 
            className="bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
          >
            Shop Men
          </Link>
          <Link 
            href="/products?category=women"
            className="border-2 border-white text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Shop Women
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;