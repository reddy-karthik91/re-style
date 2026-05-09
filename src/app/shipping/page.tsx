export default function ShippingPage() {
    return (
      <div className="container mx-auto px-6 py-24 max-w-3xl space-y-12">
        <h1 className="text-5xl font-black uppercase tracking-tighter">Shipping & Returns</h1>
        <div className="space-y-8 text-sm uppercase tracking-widest leading-relaxed text-neutral-600">
          <section className="space-y-4">
            <h2 className="font-black text-black">Domestic Shipping</h2>
            <p>Complimentary standard shipping on all orders within the country. Delivery typically takes 3-5 business days.</p>
          </section>
          <section className="space-y-4 border-t pt-8">
            <h2 className="font-black text-black">Returns Policy</h2>
            <p>We accept returns within 14 days of delivery. Items must be in original condition with all tags attached.</p>
          </section>
        </div>
      </div>
    );
  }