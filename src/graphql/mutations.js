import { gql } from "@apollo/client"

export const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      user {
        username
      }
      repository {
        fullName
        ownerName
        url
        reviewCount
        watchersCount
      }
    }
  }
`
export const SIGN_UP = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
      createdAt
      reviewCount
    }
  }
`

export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
}
`


/*
Tämä toimii apollo serverissä!
samalla userilla ei voi olla kahta reviewiä samasta repositorystä

mutation CreateReview($review: CreateReviewInput) {
  createReview(review: {repositoryName: "swr", ownerName: "zeit", rating: 55, text: "testi testi testi"}) {
    id
    user {
      username
    }
    repository {
      fullName
      ownerName
      url
      reviewCount
      watchersCount
    }
  }
}
*/