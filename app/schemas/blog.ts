// This is the file which will be used to define the schamas for the create route ->
import z from "zod";
export const postSchema = z.object({
  title: z.string().min(3).max(50),
  content: z.string().min(10),
  image: z.instanceof(File),
});
