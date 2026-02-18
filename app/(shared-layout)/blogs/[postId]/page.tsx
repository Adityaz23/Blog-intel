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
    <div className="max-w-4xl mx-auto py-16 px-4 relative animate-in fade-in duration-500">
      {/* Back Button */}
      <Link
        href="/blogs"
        className={buttonVariants({
          variant: "outline",
          className:
            "mb-8 border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition",
        })}
      >
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Blogs
      </Link>

      {/* Glass Card Wrapper */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10 shadow-[0_0_40px_rgba(236,72,153,0.08)]">
        {/* Image */}
        <div className="relative w-full h-100 rounded-xl mb-10 overflow-hidden group">
          <Image
            src={
              post.imageUrl ??
              "https://images.unsplash.com/photo-1770838917379-32208420ea9a?q=80&w=987&auto=format&fit=crop"
            }
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Title Section */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-linear-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>
              Posted on {new Date(post._creationTime).toLocaleDateString()}
            </span>

            {userId && <PostPresence roomId={post._id} userId={userId} />}
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        {/* Content */}
        <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {post.body}
        </p>

        <Separator className="my-10 bg-white/10" />

        {/* Comments Section */}
        <div className="pt-4">
          <CommentSection preLoadComments={preloadedComments} />
        </div>
      </div>
    </div>
  );
}
