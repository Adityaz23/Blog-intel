import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar(){
    return(
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href="/">
                <h1 className="text-3xl font-bold">
                    <span className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Velora</span>
                    <span className="text-zinc-400">Blog</span>
                </h1>
                </Link>
                <div className="flex items-center gap-2">
                <Link className={buttonVariants({variant:"outline"})} href={"/"}>
                {/* Home Link */}
                Home
                </Link>
                {/* Blog Link */}
                <Link className={buttonVariants({variant:"outline"})} href={"/blog"}>Blog</Link>
                {/* Create Link */}
                <Link className={buttonVariants({variant:"outline"})}  href={"/create"}>Create</Link>
                </div>
            </div>
            <div className="flex item-center gap-2 ">
                <Link className={buttonVariants()}href={"/auth/signup"}>
                Sign Up
                </Link >
                <Link className={buttonVariants()} href={"/auth/login"}>Login</Link>
                <ThemeToggle />
                </div>
        </nav>
    )
}