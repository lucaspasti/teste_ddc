import PostsPageComponent from "@/components/postPage";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";



const PostsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const session = await getSession();
    const params = await searchParams;
    const page = typeof params.page === 'string' ? Number(params.page) : 1;

    return session ? (
        <PostsPageComponent page={page} id={session.user.id}/>
    ) : (
        redirect("/auth/signin")
    );
};

export default PostsPage;