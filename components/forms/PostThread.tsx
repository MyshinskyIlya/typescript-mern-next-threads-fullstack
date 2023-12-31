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
import { threadValidation } from "@/lib/validations/thread";
import { Textarea } from "../ui/textarea";
import { createThread } from "@/lib/actions/thread.actions";

interface PostThreadProps {
    userId: string;
}

function PostThread({ userId }: PostThreadProps) {
    console.log(userId);

    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(threadValidation),
        defaultValues: {
            thread: "",
            accountId: userId,
        },
    });

    const onSubmit = async (values: z.infer<typeof threadValidation>) => {
        await createThread({
            text: values.thread,
            author: userId,
            communityId: null,
            path: pathname,
        });

        router.push("/");
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-10 flex flex-col justify-start gap-10"
            >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                                Content
                            </FormLabel>
                            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                                <Textarea
                                    rows={15}
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-primary-500">
                    Post Thread
                </Button>
            </form>
        </Form>
    );
}

export default PostThread;
