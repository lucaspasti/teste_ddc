import gql from "graphql-tag";

export const GET_POSTS = gql`
 query GetPosts($data: GetPostsDTO!) {
  getPosts(data: $data) {
    data {
      items {
        id
        title
        content
        published
        authorId
        createdAt
        updatedAt
      }
      count
    }
  }
}

`;
