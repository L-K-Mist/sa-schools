import gql from "graphql-tag";

export const SCHOOL_BY_ID = gql`
  query schools($id: String!) {
    rsa_schools_by_pk(nat_emis: $id) {
      name
      phase
      nat_emis
      Learners_2019
      Educator_2019
      NoFeeSchool
      Status
      Telephone
      province
      DistrictMunicipalityName
      Suburb
      StreetAddress
      PostalAddress
      lat
      lng
    }
  }
`;
export const ALL_SCHOOLS = gql`
  {
    rsa_schools {
      name
      lat
      lng
      nat_emis
    }
  }
`;

export const SCHOOLS_FILTER = gql`
  query schools_filter($searchLogic: rsa_schools_bool_exp!) {
    rsa_schools(where: $searchLogic) {
      name
      lat
      lng
      nat_emis
    }
  }
`;

export const SCHOOLS_NEARBY = gql`
  query MyQuery($var: rsa_schools_bool_exp!) {
    rsa_schools_aggregate(where: $var) {
      aggregate {
        count
      }
    }
    rsa_schools(
      where: {
        _and: [
          { lat: { _gte: -29.44493684210245 } }
          { lat: { _lte: -27.44493684210245 } }
          { lng: { _gte: 29.71090698242188 } }
          { lng: { _lte: 31.71090698242188 } }
        ]
      }
    ) {
      name
      lat
      lng
    }
  }
`;

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
