import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CommentSection from "@/components/web/CommentSection";

// getting the params of the blogs ->
interface PostIdParams {
  params: Promise<{ postId: Id<"posts"> }>;
}

export default async function PostId({ params }: PostIdParams) {
  const { postId } = await params;

  const [post, preloadedComments] = await Promise.all([
  fetchQuery(api.posts.getPostById, { postId }),
  preloadQuery(api.comments.getCommentsByPosts, { postId }),
]);

 

  if (!post) {
    return (
      <div>
        <h1 className="text-6xl font-extrabold text-pink-700">No Post Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link
        href={"/blogs"}
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

        <p className="text-sm text-muted-foreground">
          Posted On: {new Date(post._creationTime).toLocaleDateString()}
        </p>
      </div>
      <Separator className="my-8" />
      <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
        {post?.body}
      </p>
      <Separator className="my-8" />
      {/* getting the comment section component */}
      <CommentSection preLoadComments={preloadedComments} />
    </div>
  );
}
