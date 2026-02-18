// All the client functions will run in the client site but these actions like after clicking the client site the render needs to be done and then it will go back to the server funcitonality.
// remember always to mutate the data and not fetch it.
"use server";

import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { redirect } from "next/navigation";
import z from "zod";
import { postSchema } from "./schemas/blog";
import { revalidatePath, updateTag } from "next/cache";

export async function createBlogAction(values: z.infer<typeof postSchema>) {
  // getting the url for the image uploading :-
  try {
    const token = await getToken();
    const parsed = postSchema.safeParse(values);
    if (!parsed.success) {
      throw new Error("Something went wrong!");
    }
    const imageUrl = await fetchMutation(
      api.posts.generateImageUrl,
      {},
      { token },
    );

    // using fetch api to fetch the url of the image ->
    const uploadResult = await fetch(imageUrl, {
      method: "POST",
      headers: { "Content-Type": parsed.data.image.type },
      body: parsed.data.image,
    });
    if (!uploadResult.ok) {
      return {
        error: "Failed to upload image.",
      };
    }
    // getting the storage id ->
    const { storageId } = await uploadResult.json();
    await fetchMutation(
      api.posts.createPost,
      {
        body: parsed.data.content,
        title: parsed.data.title,
        imageStorageId: storageId,
      },
      { token },
    );
  } catch (error) {
    console.error(error);
  }

  updateTag("blogs")
  //   if you are in the server action and need to send the user to somewhere then always use the redirect .
  return redirect("/");
}
