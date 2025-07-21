import EditPost from "@/components/editPost";

const editPage = async ({ params }: { params: { id: string } }) => {    
    const postId = params.id;
    return (
        <div>
            <EditPost postId={postId} />
        </div>
    );
}
export default editPage;