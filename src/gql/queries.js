import gql from "graphql-tag";

export const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      name
      email
    }
  }
`;

export const SCHOOL_BY_ID = gql`
  query sa_schools($id: String!) {
    sa_schools(where: { nat_emis: { _eq: $id } }) {
      name
      phase
      nat_emis
      students_count
      is_no_fees
      phone
      province
      region
      suburb
      street_address
      postal_address
      lat
      lng
      old_nat_emis
    }
  }
`;

export const KZN_SCHOOLS_GPS = gql`
  query sa_schools {
    sa_schools(
      where: {
        _and: [{ _not: { lat: { _eq: 0 } } }, { province: { _eq: "KZN" } }]
      }
    ) {
      lat
      lng
      name
      nat_emis
    }
  }
`;

export const SCHOOLS_BY_REGION = gql`
  query sa_schools($region: String!) {
    sa_schools_aggregate(
      where: {
        _and: [{ _not: { lat: { _eq: "0" } } }, { region: { _eq: $region } }]
      }
    ) {
      aggregate {
        count
      }
    }

    sa_schools(
      where: {
        _and: [{ _not: { lat: { _eq: "0" } } }, { region: { _eq: $region } }]
      }
    ) {
      region
      name
      lat
      students_count
      nat_emis
      suburb
    }
  }
`;

// Saving this for now. It works in GraphiQL
export const LAT_LNG_FILTER = gql`
  query sa_schools_aggregate($lat: Float!, $lng: Float!) {
    sa_schools_aggregate(
      where: { _and: [{ lat: { _gt: $lat } }, { lng: { _lt: $lng } }] }
    ) {
      aggregate {
        count
      }
    }
  }
`;
