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
    comments,
    community,
    createdAt,
    updateAt,
    isComment,
}: ThreadCardProps) {
    return (
        <article
            className={`flex w-full flex-col rounded-xl  ${
                isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
            }`}
        >
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

                    <div className="flex w-full flex-col gap-1">
                        <Link href={`/profile/${author.id}`} className="w-fit">
                            <h4 className="cursor-pointer text-base-semibold text-light-1">
                                {author.name}
                            </h4>
                        </Link>

                        <p className="text-small-regular text-light-2">
                            {content}
                        </p>

                        <div
                            className={`${
                                isComment && "mb-10"
                            } mt-5 flex flex-col gap-3`}
                        >
                            <div className="flex gap-3.5">
                                <Image
                                    src={"/assets/heart-gray.svg"}
                                    alt="Like"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer object-contain"
                                ></Image>
                                <Link href={`/thread/${id}`}>
                                    <Image
                                        src={"/assets/reply.svg"}
                                        alt="Reply"
                                        width={24}
                                        height={24}
                                        className="cursor-pointer object-contain"
                                    ></Image>
                                </Link>
                                <Image
                                    src={"/assets/repost.svg"}
                                    alt="Repost"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer object-contain"
                                ></Image>
                                <Image
                                    src={"/assets/share.svg"}
                                    alt="Share"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer object-contain"
                                ></Image>
                            </div>
                            {isComment && comments?.length! > 0 && (
                                <Link href={`thread/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">
                                        {comments?.length} replies
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default ThreadCard;
