"use client";

import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPost } from "@/lib/actions/postActions";
import { useActionState } from "react";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";

interface CreatePostFormProps {
    id?: number;
}

const CreatePostForm = (props: CreatePostFormProps) => {
    const [state, action] = useActionState(createPost, undefined);


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
        />
      </div>
      <div>
        <Label className= 'mb-3 text-black' >Conteúdo</Label>
        <Textarea
          id="content"
          name="content"
          className="text-black"    
        />
        <input type="hidden" name="authorId" value={props.id} />
        
      </div>
      <SubmitButton className="bg-[var(--ddc-red)]">Enviar</SubmitButton>
    </form>
    </Card>
  );
};

export default CreatePostForm;
