'use client';

import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPost, updatePost } from "@/lib/actions/postActions";
import { useActionState } from "react";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";

interface PostFormProps {
    authorId?: number;
    post?: { // Optional post object for editing
        id: number;
        title: string;
        content?: string;
    };
    onSuccess?: () => void; // Callback for successful submission
}

const PostForm = ({ authorId, post, onSuccess }: PostFormProps) => {
    const isEditing = !!post;
    const actionFunction = isEditing ? updatePost : createPost;

    const [state, action] = useActionState(actionFunction, undefined);

    // Handle success callback
    if (state?.success && onSuccess) {
        onSuccess();
    }

  return (
    <Card className="mt-50 w-5xl mx-auto p-6 bg-white">
    <form action={action} className="flex flex-col gap-5 ">
      {!!state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
      <div>
        <Label className= 'mb-3 text-black' >Título</Label>
        <Input
          id="title"
          name="title"
          className="text-black"    
          defaultValue={post?.title || ''}
        />
      </div>
      <div>
        <Label className= 'mb-3 text-black' >Conteúdo</Label>
        <Textarea
          id="content"
          name="content"
          className="text-black"    
          defaultValue={post?.content || ''}
        />
        <input type="hidden" name="authorId" value={authorId} />
        {isEditing && <input type="hidden" name="postId" value={post.id} />}
      </div>
      <SubmitButton className="bg-[var(--ddc-red)]">{isEditing ? 'Atualizar' : 'Enviar'}</SubmitButton>
    </form>
    </Card>
  );
};

export default PostForm;
