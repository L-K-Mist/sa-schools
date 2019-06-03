import gql from "graphql-tag";

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
  query sa_schools($regions: sa_schools_bool_exp!) {
    sa_schools_aggregate(where: $regions) {
      aggregate {
        count
      }
    }
    sa_schools(where: $regions) {
      name
      lat
      lng
      nat_emis
    }
  }
`;
/**
 EXAMPLE Variables for KZN_SCHOOLS_GPS

 {
  "regions": {
    "_or": [
      {"region": {"_eq": "ETHEKWINI"}},
    ],
    "_and":
      {"_or":  [
        {"phase": {"_eq": "PRIMARY SCHOOL"}},
        {"phase": {"_eq": "PRE-PRIMARY SCHOOL"}}
      ]}

  }
}
 */

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
        _and: [
          { _not: { lat: { _eq: "0" } } }
          { region: { _eq: $region } }
          { name: { _eq: "SABUYAZE SECONDARY SCHOOL" } }
        ]
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
