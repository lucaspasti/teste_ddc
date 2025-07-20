/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { authFetchGraphQL } from "@/lib/fetchGraphQL";
import { CREATE_POST_MUTATION, DELETE_POST_MUTATION, GET_POSTS } from "@/lib/queries";
import { transformTakeSkip } from "@/lib/helpers";
import { print } from "graphql";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { PostSchema } from "@/lib/zodSchemas/postFormSchema";



export const fetchPosts = async ({
  page = 1,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });

  const data = await authFetchGraphQL(print(GET_POSTS), {
    data: { skip, take },
  });

  const pagination = data.getPosts?.data;

  return {
    posts: (pagination?.items ?? []) as any[],
    totalPosts: pagination?.count ?? 0,
  };
};

export async function createPost(
  prevState: any,
  formData: FormData
) {
  const session = await getSession();

  if (!session?.user?.id) {
    console.log("session.user.id is missing or invalid:", session?.user?.id);
    return {
      message: "Você precisa estar logado para criar um post.",
      success: false,
    };
  }

  console.log("session.user.id before validation:", session.user.id);
  const validatedFields = PostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    authorId: session.user.id,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: `Erro de validação: ${JSON.stringify(validatedFields.error.flatten().fieldErrors)}`,
      success: false,
      data: Object.fromEntries(formData.entries()),
    };
  }

  // Extrai e adapta o formato para o CreatePostDTO esperado pela API
  const { authorId, ...rest } = validatedFields.data;

  

  const postInput = {
    ...rest,
    author: { connect: { id: Number(authorId) } },
    published: true, // opcional, já que o default do DTO é false
  };

  try {
    const result = await authFetchGraphQL(print(CREATE_POST_MUTATION), {
      data: postInput, // <- corresponde à variável $data na mutation
    });

    if (result.errors || result.createPost?.error) {
      const gqlError = result.errors?.[0]?.message;
      const customError = result.createPost?.error;
      const errorMessage =
        gqlError ||
        customError?.badRequest ||
        customError?.forbidden ||
        customError?.internalServerError ||
        customError?.notFound ||
        "Ocorreu um erro ao criar o post.";

      return {
        message: errorMessage,
        success: false,
        data: Object.fromEntries(formData.entries()),
      };
    }

    const createdPost = result.createPost?.data?.items?.[0];


    revalidatePath("/posts"); // Ensure the path "/posts" is valid and matches your application's routing
    return {
      message: "Post criado com sucesso!",
      success: true,
      data: createdPost,
    };
  } catch (error) {
    console.error("Erro na ação createPost:", error);
    return {
      message: "Falha ao conectar com o servidor ou erro inesperado.",
      success: false,
      data: Object.fromEntries(formData.entries()),
    };
  }
}

export async function deletePost(
  postId: number
): Promise<{ success: boolean; message: string }> {
  const session = await getSession();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Você precisa estar logado para deletar um post.",
    };
  }

  try {
    const result = await authFetchGraphQL(print(DELETE_POST_MUTATION), {
      data: { id: postId },
    });

    if (result.errors || result.deletePost?.error) {
      const gqlError = result.errors?.[0]?.message;
      const customError = result.deletePost?.error;
      const errorMessage =
        gqlError ||
        customError?.badRequest ||
        customError?.forbidden ||
        customError?.internalServerError ||
        customError?.notFound ||
        "Ocorreu um erro ao deletar o post.";

      return { success: false, message: errorMessage };
    }

    revalidatePath("/posts");
    return { success: true, message: "Post deletado com sucesso!" };
  } catch (error) {
    console.error("Erro na ação deletePost:", error);
    return {
      success: false,
      message: "Falha ao conectar com o servidor ou erro inesperado.",
    };
  }
}