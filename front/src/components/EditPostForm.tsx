"use client";

import { updatePost } from "@/lib/actions/postActions";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import SubmitButton from "./submitButton";
import { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditPostForm({ post }: { post: any }) {
  const [state, formAction] = useActionState(updatePost, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-black mb-4">Editar Post</h1>

      <input type="hidden" name="postId" value={post.id} />

      <div>
        <Label htmlFor="title" className="mb-3 text-black">Título</Label>
        <Input id="title" name="title" defaultValue={post.title} className="text-black" />
      </div>

      <div>
        <Label htmlFor="content" className="mb-3 text-black">Conteúdo</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={post.content || ""}
          className="text-black"
          rows={6}
        />
      </div>

      {state.message && (
        <p className={state.success ? "text-green-600" : "text-red-500"}>
          {state.message}
        </p>
      )}

      <div className="text-right">
        <SubmitButton className="bg-[var(--ddc-red)]">Atualizar</SubmitButton>
      </div>
    </form>
  );
}
