import { Skeleton } from "../skeleton";

export default function LoadingCard() {
    return (
        <div className="border border-ebony rounded-xl overflow-hidden">
            <Skeleton className="w-full h-75" />
            <div className="px-5 py-2.5 pb-5">
                <Skeleton className="mt-2.5 w-full h-8" />
                <Skeleton className="mt-2.5 w-full h-8" />
                <div className="flex gap-5">
                    <Skeleton className="mt-2.5 w-2/4 h-8" />
                    <Skeleton className="mt-2.5 w-2/4 h-8" />
                </div>
            </div>
        </div>
    )
}