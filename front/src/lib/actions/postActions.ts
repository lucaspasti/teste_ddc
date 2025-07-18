// src/lib/actions/postActions.ts
import { fetchGraphQL } from "@/lib/fetchGraphQL"; // <-- usar o correto
import { GET_POSTS } from "@/lib/queries";
import { Post } from "@/lib/types/modelTypes";
import { transformTakeSkip } from "@/lib/helpers";
import { print } from "graphql";

export const fetchPosts = async ({
  page = 1,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });

  const data = await fetchGraphQL(print(GET_POSTS), {
    data: { skip, take },
  });

  const pagination = data.getPosts?.data;

  return {
    posts: (pagination?.items ?? []) as Post[],
    totalPosts: pagination?.count ?? 0,
  };
};
