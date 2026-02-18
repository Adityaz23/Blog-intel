"use client";
import { createBlogAction } from "@/app/actions";
import { postSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { ChevronDown, Upload } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function CreateBlog() {
  const [isPending, setIsPending] = useTransition();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm({
    // using zod version 3 because v4 is causing problem.
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

  // Now creating the fuction for the onSubmit ->
  function onSubmit(values: z.infer<typeof postSchema>) {
    setIsPending(async () => {
      // calling the server actions
      // Now this function will run in the server side and whole file runs on the client side.
      console.log("This run on the client side.");

      await createBlogAction(values);
    });
  }
  return (
    <div className="max-w-5xl mx-auto py-20 px-4 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="text-center mb-16 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-linear-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Create Post
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Share your thoughts with the world and inspire others through your
          writing.
        </p>
      </div>

      {/* Glass Card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-10 shadow-[0_0_50px_rgba(236,72,153,0.08)] max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-8 text-foreground">
          Create New Blog For People To Read
        </h2>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-y-6">
            {/* Title */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-muted-foreground">
                    Title
                  </FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Your blog title..."
                    aria-invalid={fieldState.invalid}
                    className="bg-white/5 border-white/10 focus-visible:ring-pink-500/40"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Content */}
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-muted-foreground">
                    Content
                  </FieldLabel>
                  <Textarea
                    {...field}
                    placeholder="Write your thoughts here..."
                    className="min-h-160px bg-white/5 border-white/10 focus-visible:ring-pink-500/40"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Image Upload */}
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-muted-foreground">
                    Upload cover image
                  </FieldLabel>

                  <label className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition cursor-pointer focus-within:ring-2 focus-within:ring-pink-500/40">
                    <div className="flex items-center gap-3 truncate">
                      <Upload className="w-4 h-4 text-pink-400 shrink-0" />
                      <span className="text-sm truncate">
                        {field.value?.name || "Choose file"}
                      </span>
                    </div>

                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);

                        if (file) {
                          const imageUrl = URL.createObjectURL(file);
                          setPreview(imageUrl);
                        }
                      }}
                    />
                  </label>

                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="mt-5 rounded-xl border border-white/10 max-h-60 object-cover shadow-lg"
                    />
                  )}

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Submit Button */}
            <Button
              disabled={isPending}
              className="w-full bg-linear-to-r from-pink-500 to-purple-600 hover:opacity-90 transition text-white"
            >
              {isPending ? (
                <>
                  <Loader2Icon className="size-4 animate-spin mr-2" />
                  Publishing...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
