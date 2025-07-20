'use client';
import { Button } from "@/components/ui/button";

interface EditButtonProps {
  postId: number;
  onEdit: (postId: number) => void;
}

export default function EditButton({ postId, onEdit }: EditButtonProps) {
  return (
    <Button
      className="mt-2 bg-blue-500 text-white hover:bg-blue-600"
      onClick={() => onEdit(postId)}
    >
      Editar
    </Button>
  );
}
