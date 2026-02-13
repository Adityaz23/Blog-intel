// All the client functions will run in the client site but these actions like after clicking the client site the render needs to be done and then it will go back to the server funcitonality.
// remember always to mutate the data and not fetch it.
"use server";
export async function createBlogAction(){
    console.log("Hello from the server")
}