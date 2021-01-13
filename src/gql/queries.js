import gql from "graphql-tag";

export const SCHOOL_BY_ID = gql`
  query schools($id: String!) {
    rsa_schools_by_pk(NatEMIS: $id) {
      name
      phase
      nat_emis
      Learners_2019
      NoFeeSchool
      Status
      Telephone
      Province
      DistrictMunicipalityName
      Suburb
      StreetAddress
      PostalAddress
      NewLat
      NewLong
      OldNATEMIS
    }
  }
`;

export const ALL_SCHOOLS = gql`
  query schools_filter($searchLogic: rsa_schools_bool_exp!) {
    rsa_schools_aggregate(where: $searchLogic) {
      aggregate {
        count
      }
    }
    rsa_schools(where: $searchLogic) {
      name
      lat
      lng
      nat_emis
    }
  }
`;

export const PROJECT_SCHOOLS = gql`
  query {
    sa_schools(
      where: {
        _or: [
          { name: { _ilike: "%Nkabini%" } }
          { name: { _ilike: "%Hemu%" } }
          { name: { _ilike: "%Songozima%" } }
          { name: { _ilike: "%Thulasizwe%" } }
          { name: { _ilike: "%Zweliyazuza%" } }
          { name: { _ilike: "%Sombongangani%" } }
          { name: { _ilike: "%KwaMadlala%" } }
          { name: { _ilike: "%Emaswazini%" } }
          { name: { _ilike: "%Nkhokhwane%" } }
          { name: { _ilike: "%Nhlambamasoka%" } }
          { name: { _ilike: "%Lutho Primary%" } }
        ]
        _and: { region: { _eq: "UMGUNGUNDLOVU" } }
      }
      order_by: { name: asc }
    ) {
      name
      location
      phase
      region
      street_address
      lat
      lng
      nat_emis
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

/**
query schools_around_pt($distance: Float!, $geo: geometry!)
{
  sa_schools(where: {location: {_st_d_within: {
    distance: $distance,
    from: $geo
  }}}){
    name
    lat
    lng
  }
}


.. and the variables field
{
  "distance": 0.01,
  "geo": {
      "type": "Point",
      "coordinates": [
        18.489704,
        -33.940894
      ],
      "crs": {
        "type": "name",
        "properties": {
          "name": "EPSG:4326"
        }
      }
    }
}

 */
