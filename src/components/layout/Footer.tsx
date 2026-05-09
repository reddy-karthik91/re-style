import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Brand Identity */}
          <div className="space-y-2">
            <h2 className="text-xl font-black tracking-tighter">RE-STYLE</h2>
            <p className="text-sm text-gray-500 max-w-xs">
              Elevating essentials through sustainable design.
            </p>
          </div>

          {/* Essential Links Only */}
          <nav>
            <ul className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium uppercase tracking-widest text-gray-600">
              <li>
                <Link href="/about" className="hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-black transition-colors">
                  Shipping
                </Link>
              </li>
            </ul>
          </nav>

          {/* Newsletter / Social Minimalist */}
          <div className="flex items-center space-x-6">
             <Link href="#" className="text-xs text-gray-400 hover:text-black uppercase tracking-tighter">Instagram</Link>
             <Link href="#" className="text-xs text-gray-400 hover:text-black uppercase tracking-tighter">Twitter</Link>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            © {currentYear} RE-STYLE Storefront. All rights reserved.
          </p>
          <div className="flex space-x-4 text-[10px] text-gray-400 uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-black">Privacy</Link>
            <Link href="/terms" className="hover:text-black">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;