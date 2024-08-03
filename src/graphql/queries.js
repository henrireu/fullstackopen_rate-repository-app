import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
    totalCount
    edges {
      node {
        fullName
        description
        language
        ownerAvatarUrl
        stargazersCount
        forksCount
        reviewCount
        ratingAverage
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
}
`

/*export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
    edges {
        node {
          fullName
          description
          language
          ownerAvatarUrl
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
  }
}
`*/

export const ME = gql`
  query getMe($includeReviews: Boolean = false){
    me {
      id 
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`

export const REPOSITORY_BY_ID = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      ownerName
      ownerAvatarUrl
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
    }
  }
`

export const GET_REVIEWS = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      url
      reviews (first: $first, after: $after){
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`