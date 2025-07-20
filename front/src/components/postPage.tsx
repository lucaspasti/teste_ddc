import { Card } from "@/components/ui/card";
import {fetchPosts } from "@/lib/actions/postActions";
import PaginationControls from "@/components/paginationControls";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteButton from "./deleteButton";
import EditButton from "./editButton";

interface CardProps{
    page?: number, 
    pageSize?: number,
    id?: number
}

const PostsPageComponent = async ({ page = 1, pageSize = 10,id }:CardProps) => {
    const { posts, totalPosts } = await fetchPosts({ page, pageSize });
    const hasNextPage = (page * pageSize) < totalPosts;
    const hasPrevPage = page > 1;

    return (
    <Card className="mt-20 w-5xl mx-auto">
            <div className="flex w-full justify-between items-center">
            <div className="flex-1 flex items-center justify-center">
                <h1 className="text-2xl font-bold text-center">Página de Posts</h1>
            </div>
            <Link href={`/posts/create/`} className="flex items-center ">
                <Button className="text-white">
                Novo Post
                </Button>
            </Link>
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-4xl">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition"
                    >
                        <h2 className="text-2xl font-semibold">{post.title}</h2>
                        <p className="text-gray-600">{post.content}</p>
                        <div className="text-sm text-gray-500 mt-2">
                            <p>Author ID: {post.authorId}</p>
                            <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
                        </div>
                        {id === Number(post.authorId) && (
                        <div className="mt-4 flex flex-col justify-end items-end">
                            <EditButton post={{ id: post.id }} />
                            <DeleteButton post={{ id: post.id }} />
                        </div>
                        
                        )}        
                    </div>
                ))}
            </div>
            <PaginationControls hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} />
        </div>
    </Card>
    );
};

export default PostsPageComponent;