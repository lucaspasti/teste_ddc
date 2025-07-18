export type Post = {
    id: number;
    title: string;
    content?: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
  };
  
  export type PostPagination = {
    items: Post[];
    count: number;
  };
  
  export type PostResponse = {
    data?: PostPagination;
  };
  