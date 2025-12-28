import { Heart } from "lucide-react";
import { memo } from "react";

export default memo(function LikesBlock({ likes }: { likes: number }) {

    const maxLikes = 3;
    const currentLikes = likes;
    const unliked = maxLikes - likes;

    return (
        <div className="z-1 flex gap-1 py-1 px-2">
            {Array.from({ length: currentLikes }).map((_, index) => {
                return (
                    <Heart key={index} color="white" className="fill-khaki-beige" />
                )
            })}
            {Array.from({ length: unliked }).map((_, index) => {
                return (
                    <Heart key={index} color="white" />
                )
            })}
        </div>
    )
})