import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ThreadCardProps {
    id: string;
    currentUserId?: string;
    parentId: string | null;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    };
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    updateAt: string;
    comments?: {
        author: {
            image: string;
        };
    }[];
    isComment?: boolean;
}

function ThreadCard({
    id,
    parentId,
    currentUserId,
    author,
    content,
    community,
    createdAt,
    updateAt,
}: ThreadCardProps) {
    return (
        <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link
                            href={`/profile/${author.id}`}
                            className="relative h-11 w-11"
                        >
                            <Image
                                src={author.image}
                                alt="Author Image"
                                fill
                                className="cursor-pointer rounded-full"
                            ></Image>
                        </Link>
                        <div className="thread-card_bar"></div>
                    </div>
                </div>
            </div>
            <h2 className="text-small-regular text-light-2">{content}</h2>
        </article>
    );
}

export default ThreadCard;
