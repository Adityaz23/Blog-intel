import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Sparkles, PenTool, MessageCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-pink-600/20 via-purple-600/10 to-transparent blur-3xl" />

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-32 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
          Write. Share. Connect.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          VeloraBlog is your space to publish thoughts, explore ideas,
          and engage with a growing community of creators.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/blogs"
            className={buttonVariants({ size: "lg" })}
          >
            Explore Blogs
            <ArrowRight className="ml-2 size-4" />
          </Link>

          <Link
            href="/create"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
            })}
          >
            Start Writing
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<PenTool className="size-6" />}
            title="Powerful Editor"
            description="Craft beautiful blog posts with an intuitive and distraction-free writing experience."
          />

          <FeatureCard
            icon={<MessageCircle className="size-6" />}
            title="Live Comments"
            description="Engage with your audience instantly using real-time comments powered by Convex."
          />

          <FeatureCard
            icon={<Sparkles className="size-6" />}
            title="Presence System"
            description="See who’s reading your post live and build a connected writing experience."
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border py-16 text-center">
        <h2 className="text-3xl font-bold">
          Ready to start your writing journey?
        </h2>

        <div className="mt-6">
          <Link
            href="/create"
            className={buttonVariants({ size: "lg" })}
          >
            Create Your First Blog
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}
