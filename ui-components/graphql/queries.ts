/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTransportToHome = /* GraphQL */ `
  query GetTransportToHome($id: ID!) {
    getTransportToHome(id: $id) {
      createdAt
      dropoffLocation
      id
      owner
      paxNameId
      pickupLocation
      pickupTime
      updatedAt
      __typename
    }
  }
`;
export const getTransportToWork = /* GraphQL */ `
  query GetTransportToWork($id: ID!) {
    getTransportToWork(id: $id) {
      createdAt
      dropoffLocation
      id
      owner
      paxNameId
      pickupLocation
      pickupTime
      updatedAt
      __typename
    }
  }
`;
export const listTransportToHomes = /* GraphQL */ `
  query ListTransportToHomes(
    $filter: ModelTransportToHomeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransportToHomes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        createdAt
        dropoffLocation
        id
        owner
        paxNameId
        pickupLocation
        pickupTime
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listTransportToWorks = /* GraphQL */ `
  query ListTransportToWorks(
    $filter: ModelTransportToWorkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransportToWorks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        createdAt
        dropoffLocation
        id
        owner
        paxNameId
        pickupLocation
        pickupTime
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
