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
export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserDTO!) {
    createUser(data: $input) {
      data {
        items {
          id
          name
          email
        }
      }
    }
  }
`;


export const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      id
      name
      accessToken
    }
  }
`;


export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($data: CreatePostDTO!) {
    createPost(data: $data) {
      data {
        count
        items {
          id
          title
          content
          published
          authorId
          createdAt
          updatedAt
        }
      }
      error {
        internalServerError
        forbidden
        badRequest
        unauthorized
      }
    }
  }
`;


export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($data: DeletePostDTO!) {
    deletePost(data: $data) {
      data {
        count
        items {
          id
        }
      }
      error {
        badRequest
        forbidden
        notFound
        internalServerError
        unauthorized
        conflict
        blocked
        refreshSystemToken
        errors {
          message
          code
          path
        }
      }
    }
  }
`;