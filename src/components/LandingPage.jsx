import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";

import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6" />
          <span className="text-xl font-bold">Searchlio</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="#" className="text-sm hover:text-gray-300">
            Product
          </Link>
          <Link href="#" className="text-sm hover:text-gray-300">
            Solutions
          </Link>
          <Link href="#" className="text-sm hover:text-gray-300">
            Resources
          </Link>
          <Link href="#" className="text-sm hover:text-gray-300">
            Company
          </Link>
          <Link href="#" className="text-sm hover:text-gray-300">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <a href="/search">
            <Button className="text-sm bg-white text-black hover:bg-gray-200">
              Get Started
            </Button>
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block bg-gray-800 rounded-full px-4 py-2 text-sm mb-6">
            We are Cooking for v2.0 →
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            One Tools For Doing it
            <br />
            All Together
          </h1>
          <p className="text-xl mb-8 text-gray-400">
            Ganttify enables you to achieve clarity and significant results on a
            large scale by linking tasks and workflows to the overarching
            objectives of the company.
          </p>
          <div className="flex justify-center space-x-4 mb-16">
            <a href="/search">
              <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3">
                Get Started
              </Button>
            </a>
            <Button variant="outline" className="bg-transparent">
              How it Works
            </Button>
          </div>
        </div>

        <div className="relative mt-16">
          <div className="absolute inset-0"></div>
          <img
            src="/banner.png"
            width={800}
            height={400}
            alt="Ganttify Interface"
            className="rounded-xl mx-auto"
          />
        </div>
      </main>
    </div>
  );
}
