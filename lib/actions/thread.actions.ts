"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface createThreadParams {
    text: string;
    author: string;
    communityId: string | null;
    path: string;
}

interface fetchThreadsParams {}

export async function createThread({
    text,
    author,
    communityId,
    path,
}: createThreadParams) {
    try {
        connectToDB();

        const createdThread = await Thread.create({
            text,
            author,
            community: null,
        });

        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id },
        });

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
    try {
        connectToDB();

        // Calculate the number of posts to skip based on the page number and page size.
        const skipAmount = (pageNumber - 1) * pageSize;

        // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
        const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
            .sort({ createdAt: "desc" })
            .skip(skipAmount)
            .limit(pageSize)
            .populate({
                path: "author",
                model: User,
            })
            .populate({
                path: "children", // Populate the children field
                populate: {
                    path: "author", // Populate the author field within children
                    model: User,
                    select: "_id name parentId image", // Select only _id and username fields of the author
                },
            });

        // Count the total number of top-level posts (threads) i.e., threads that are not comments.
        const totalPostsCount = await Thread.countDocuments({
            parentId: { $in: [null, undefined] },
        }); // Get the total count of posts

        const threads = await postsQuery.exec();

        const isNext = totalPostsCount > skipAmount + threads.length;

        return { threads, isNext };
    } catch (error: any) {
        throw new Error(`Failed to fetch Threads: ${error.message}`);
    }
}

export async function fetchThreadById(id: string) {
    connectToDB();
    try {
        // TODO: Populate the community
        const thread = await Thread.findById(id)
            .populate({
                path: "author",
                model: User,
                select: "_id id name image",
            })
            .populate({
                path: "children",
                populate: [
                    {
                        path: "author",
                        model: User,
                        select: "_id id name parentId image",
                    },
                    {
                        path: "children",
                        model: Thread,
                        populate: {
                            path: "author",
                            model: User,
                            select: "_id id name parentId image",
                        },
                    },
                ],
            })
            .exec();

        return thread;
    } catch (error: any) {
        throw new Error(`Error fethching thread: ${error.message}`);
    }
}

export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string
) {
    connectToDB();

    try {
        const originalThread = await Thread.findById(threadId);

        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parent: threadId,
        });

        // Save the new thread
        const savedCommentThread = await commentThread.save();

        // Update the original Thread to include the new comment
        originalThread.children.push(savedCommentThread._id);

        // Save the original Thread
        await originalThread.save();

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Failed to create the comment: ${error.message}`);
    }
}
