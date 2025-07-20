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