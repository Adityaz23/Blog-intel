import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CommentSection from "@/components/web/CommentSection";
import { Metadata } from "next";
import { PostPresence } from "@/components/web/PostPresence";
import { getToken } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { Suspense } from "react"; // ← add this

// getting the params of the blogs ->
interface PostIdParams {
  params: Promise<{ postId: Id<"posts"> }>;
}

export async function generateMetadata({
  params,
}: PostIdParams): Promise<Metadata> {
  const { postId } = await params;
  const post = await fetchQuery(api.posts.getPostById, { postId });
  if (!post) {
    return { title: "Post not found!" };
  }
  return { title: post?.title, description: post?.body };
}

export default async function PostId({ params }: PostIdParams) {
  const { postId } = await params;

  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto py-12 px-4 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      }
    >
      <PostContent params={{ postId }} /> {/* Move suspending logic here */}
    </Suspense>
  );
}

// New async component that does all the awaiting
async function PostContent({ params }: { params: { postId: Id<"posts"> } }) {
  const { postId } = params;

  const token = await getToken();

  const [post, preloadedComments, userId] = await Promise.all([
    fetchQuery(api.posts.getPostById, { postId }),
    preloadQuery(api.comments.getCommentsByPosts, { postId }),
    fetchQuery(api.presence.getUserId, {}, { token }),
  ]);

  if (!userId) {
    redirect("/auth/login");
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <h1 className="text-6xl font-extrabold text-pink-700">No Post Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link
        href="/blogs"
        className={buttonVariants({ variant: "outline", className: "mb-4" })}
      >
        <ArrowLeftIcon className="size-4" />
        Back to blog
      </Link>

      <div className="relative w-full h-100 rounded-xl mb-8 overflow-hidden shadow-sm">
        <Image
          src={
            post.imageUrl ??
            "https://images.unsplash.com/photo-1770838917379-32208420ea9a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={post.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl font-bold tracking-tighter text-foreground">
          {post?.title}
        </h1>

        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Posted On: {new Date(post._creationTime).toLocaleDateString()}
          </p>
          {userId && <PostPresence roomId={post._id} userId={userId} />}
        </div>
      </div>

      <Separator className="my-8" />

      <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
        {post?.body}
      </p>

      <Separator className="my-8" />

      <CommentSection preLoadComments={preloadedComments} />
    </div>
  );
}