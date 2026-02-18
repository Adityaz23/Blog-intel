"use client";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SearchInput } from "./SearchInput";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  return (
    <nav className="w-full py-5 flex items-center justify-between text-primary">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">Velora</span>
            <span className="text-zinc-400">Blog</span>
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <Link className={buttonVariants({ variant: "outline" })} href={"/"}>
            {/* Home Link */}
            Home
          </Link>
          {/* Blog Link */}
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={"/blogs"}
          >
            Blogs
          </Link>
          {/* Create Link */}
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={"/create"}
          >
            Create
          </Link>
        </div>
      </div>

      <div className="flex item-center gap-2 ">
        <div className="hidden md:block mr-2">
          <SearchInput />
        </div>
        {isLoading ? null : isAuthenticated ? (
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Logged out successfully!");
                    router.push("/");
                  },
                  onError: (error) => {
                    toast.error(error.error.message);
                  },
                },
              })
            }
          >
            Logout
          </Button>
        ) : (
          <>
            <Link className={buttonVariants()} href={"/auth/signup"}>
              Sign Up
            </Link>
            <Link className={buttonVariants()} href={"/auth/login"}>
              Login
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
