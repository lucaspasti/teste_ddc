// app/components/EditPost.tsx
import { fetchPosts } from "@/lib/actions/postActions";
import EditPostForm from "./EditPostForm";
import { Card } from "./ui/card";

interface EditProps {
  page?: number;
  pageSize?: number;
  postId?: string;
}

const EditPost = async ({ page = 1, pageSize = 10, postId }: EditProps) => {
  const { posts } = await fetchPosts({ page, pageSize });
  const post = posts.find((p) => String(p.id) === postId);

  if (!post) {
    return <div className="mt-35 text-center text-red-500">Post não encontrado</div>;
  }

  return (
    <Card className="mt-50 w-5xl mx-auto p-6 bg-white">
      <EditPostForm post={post} />
    </Card>
  );
};

export default EditPost;
