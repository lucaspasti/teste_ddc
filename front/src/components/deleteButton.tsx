'use client';
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/actions/postActions";


export default function DeleteButton({ post }: { post: { id: number } }) {
  return (
        <Button
            className="mt-2 bg-[var(--ddc-red)] text-white hover:bg-red-600"
            onClick={() => {deletePost(Number(post.id))}}
            >
            Deletar 
        </Button>
  );
}