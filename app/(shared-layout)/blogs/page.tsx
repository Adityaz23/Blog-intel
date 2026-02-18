import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";

// Doing the caching for the dynamic routes ->
// export const dynamic = "force-static";
// export const revalidate = 30;

export const metadata: Metadata = {
  title: "VeloraBlog",
  description: "Read our latest articles and insights!",
  authors: [{ name: "Aditya Kumar Soni" }],
};
export default function AllBlogs() {
  return (
    <div className="relative py-16">
      {/* Gradient Background Glow (matches homepage vibe) */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-transparent to-transparent" />

      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Explore Our Blogs
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
          Insights, stories, and ideas crafted for curious minds.
        </p>
      </div>

      <LoaderBlog />
    </div>
  );
}

export async function LoaderBlog() {
  // Added this conenction() from the next/server
  // await connection();

  // the cache will revalidate every 15 min by default. Now, we will change it to the hours.
  "use cache";
  cacheLife("hours");
  cacheTag("blogs");
  // The below line was just to check the skeleton.
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const data = await fetchQuery(api.posts.getPosts);
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((posts) => (
        <Card
          key={posts._id}
          className="group overflow-hidden border bg-background/60 backdrop-blur-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Image Section */}
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src={
                posts.imageUrl ??
                "https://images.unsplash.com/photo-1770838917379-32208420ea9a?q=80&w=987&auto=format&fit=crop"
              }
              fill
              alt={posts.title}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <CardContent className="pt-6 space-y-3">
            <Link href={`/blogs/${posts._id}`}>
              <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {posts.title}
              </h2>
            </Link>

            <p className="text-muted-foreground line-clamp-3 text-sm">
              {posts.body}
            </p>
          </CardContent>

          <CardFooter className="pb-6">
            <Link
              href={`/blogs/${posts._id}`}
              className={buttonVariants({
                variant: "secondary",
                className:
                  "w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all",
              })}
            >
              Read Article →
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
