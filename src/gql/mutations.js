import gql from "graphql-tag";

export const AUTHORIZE = gql`
  mutation upsert_user($objects: [users_insert_input!]!) {
    insert_users(
      objects: $objects
      on_conflict: { constraint: users_pkey, update_columns: [name, email] }
    ) {
      affected_rows
      returning {
        name
        email
      }
    }
    # insert_Session(objects: [{ start: $now, user_id: $user }]) {
    #   affected_rows
    #   returning {
    #     id
    #     user_id
    #     start
    #   }
    # }
  }
`;

export const UPDATE_USER = gql`
  mutation upsert_user_combo($user_deets: [Users_insert_input!]!) {
    insert_Users(
      objects: $user_deets
      on_conflict: {
        constraint: Users_pkey
        update_columns: [
          first_name
          email
          picture_src
          cell
          landline
          address_id
          activities_id
        ]
      }
    ) {
      returning {
        first_name
        auth0_id
      }
    }
  }
`;
// Note the test of "[sa_schools_insert_input!]!" is a very specific pattern, you can't just name it anything you like
export const CREATE_SCHOOLS = gql`
  mutation insert_sa_schools($schools: [sa_schools_insert_input!]!) {
    insert_sa_schools(objects: $schools) {
      affected_rows
    }
  }
`;
