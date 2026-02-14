import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function AllBlogs() {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="text-2xl pt-4 max-w-2xl text-muted-foreground mx-auto">
          Inside, thoughts and trends from our team!
        </p>
      </div>
      {/* <h1>Blogs</h1>
      {/* even the onClick function wil also render in the server side or the server part. */}
      {/* <p>{data?.[0].title}</p>
      <p>{data?.[1].title}</p> */}
      <Suspense fallback={<SkeletonLoading />}>
        <LoaderBlog />
      </Suspense>
    </div>
  );
}

export async function LoaderBlog() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const data = await fetchQuery(api.posts.getPosts);
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
      {data?.map((posts) => (
        // <p key={posts._id}>{posts.title}</p>
        <Card key={posts._id} className="pt-0">
          <div className="relative h-48 w-full overflow-hidden">
            {/* To use the next/images we need to pass the image flag to the next.config.ts  */}
            <Image
              className="rounded-t-lg object-center"
              src={
                posts.imageUrl ??
                "https://images.unsplash.com/photo-1770838917379-32208420ea9a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              fill
              alt="person walking"
            />
          </div>
          <CardContent>
            <Link href={`/blogs/${posts._id}`}>
              <h1 className="text-2xl font-bold hover:text-primary">
                {posts.title}
              </h1>
            </Link>
            <p className="text-muted-foreground line-clamp-5">{posts.body}</p>
          </CardContent>
          <CardFooter>
            <Link
              className={buttonVariants({ className: "w-full" })}
              href={`/blogs/${posts._id}`}
            >
              Read More...
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
      {[...Array(3)].map((_, i) => (
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
