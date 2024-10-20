import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">ZKP Auth Platform</h1>
        <nav className="space-x-4">
          <Link href="/about">About</Link>
          <Link href="/pricing">Pricing</Link>
          <SignedOut>
            <Button asChild variant="default">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </SignedOut>
        </nav>
      </header>

      <main className="flex-1">
        <section className="py-20 px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Secure Authentication with Zero-Knowledge Proofs
          </h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Protect your identity while proving authenticity. No sensitive data
            exposed.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/sign-up">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
