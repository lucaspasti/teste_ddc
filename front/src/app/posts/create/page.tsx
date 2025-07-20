'use server';
import { getSession } from "@/lib/session";
import CreatePostForm from "@/components/createPostForm";


export default async function CreatePostPage () {
  const session = await getSession();
  
  return (
    <CreatePostForm id={Number(session?.user.id)}/>
  );
};

