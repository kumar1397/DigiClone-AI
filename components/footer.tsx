import Link from "next/link";
export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-muted">
    <div className="container max-w-6xl mx-auto">
      <div className="text-center">
        <h3 className="text-2xl font-serif font-bold mb-4 text-primary">DigiClone AI</h3>
        <p className="text-muted-foreground mb-6">
          Empowering experts to scale their impact through AI-powered digital clones
        </p>
        <div className="flex justify-center gap-8 text-sm text-muted-foreground">
          <Link href="/discover" className="hover:text-primary transition-colors">Discover</Link>
          <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Support</a>
        </div>
      </div>
    </div>
  </footer>
  );
}

