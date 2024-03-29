import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCard from "../cards/ThreadCard";

interface ThreadsTabProps {
    currentUserId: string;
    accountId: string;
    accountType: string;
}

async function ThreadsTab({
    accountId,
    accountType,
    currentUserId,
}: ThreadsTabProps) {
    let result = await fetchUserPosts(accountId);

    return (
        <section className="mt-9 flex flex-col gap-10">
            {result?.threads.map((thread: any) => (
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={currentUserId}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={
                        accountType === "User"
                            ? {
                                  name: result.name,
                                  image: result.image,
                                  id: result.id,
                              }
                            : {
                                  name: thread.author.name,
                                  image: thread.author.image,
                                  id: thread.author.id,
                              }
                    }
                    community={thread.community}
                    createdAt={thread.createdAt}
                    updateAt={thread.children}
                ></ThreadCard>
            ))}
        </section>
    );
}

export default ThreadsTab;
