"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { updateUser } from "@/lib/actions/user.actions";
import { userValidation } from "@/lib/validations/user";
import { commentValidation } from "@/lib/validations/thread";
import { Input } from "../ui/input";
import { addCommentToThread, createThread } from "@/lib/actions/thread.actions";
import Image from "next/image";

interface CommentProps {
    threadId: string;
    currentUserImage: string;
    currentUserId: string;
}

function Comment({ threadId, currentUserImage, currentUserId }: CommentProps) {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            thread: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof commentValidation>) => {
        await addCommentToThread(
            threadId,
            values.thread,
            JSON.parse(currentUserId),
            pathname
        );

        form.reset();
    };
    return (
        <div>
            <h1 className="text-white">Comment Form</h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="comment-form"
                >
                    <FormField
                        control={form.control}
                        name="thread"
                        render={({ field }) => (
                            <FormItem className="flex items-center gap-3 w-full">
                                <FormLabel>
                                    <Image
                                        src={currentUserImage}
                                        alt="Current User"
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover"
                                    ></Image>
                                </FormLabel>
                                <FormControl className="border-none bg-transparent">
                                    <Input
                                        type="text"
                                        placeholder="Comment ..."
                                        className="text-light-1 outline-none no-focus"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="bg-primary-500 rounded-2xl max-xs:w-full"
                    >
                        Comment
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default Comment;
