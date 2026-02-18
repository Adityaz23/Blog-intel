import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left Section */}
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-lg font-semibold tracking-tight">
              <span className="text-primary">Velora</span>
              <span className="text-zinc-400">Blog</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              © 2026 All rights reserved.
            </p>
          </div>

          {/* Center Section */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="https://x.com/AdityaS69610269"
              target="_blank"
              className="hover:text-primary transition-colors duration-200"
            >
              Twitter
            </Link>

            <Link
              href="https://www.linkedin.com/in/aditya-soni-83225a22b/"
              target="_blank"
              className="hover:text-primary transition-colors duration-200"
            >
              LinkedIn
            </Link>

            <Link
              href="mailto:soniadityakumar651@gmail.com"
              className="hover:text-primary transition-colors duration-200"
            >
              Email
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>by Aditya.</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
