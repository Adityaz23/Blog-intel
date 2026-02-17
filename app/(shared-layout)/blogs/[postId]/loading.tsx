import { Skeleton } from "@/components/ui/skeleton";

// This is the file which will be rendered in the page.tsx which renders the blogs as the route.
export default function LoadingPage(){
    return(
        <div className="max-w-3xl mx-auto py-8 px-4">
            <Skeleton className="h-10 w-24 mb-6"/>
            <Skeleton className="w-full h-100 mb-8 rounded-xl "/>
            <div className="space-y-4">
                <Skeleton className="h-12 w-3/4"/>

                <Skeleton className="h-4 "/>
            </div>
            <div className="mt-8 space-y-2">
                <Skeleton className="w-full h-4"/>
                <Skeleton className="w-full h-4"/>
                <Skeleton className="w-2/3 h-4"/>
            </div>
        </div>
    )
}