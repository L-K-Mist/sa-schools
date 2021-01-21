import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const apollo = new ApolloClient({
  link: createHttpLink({
    uri: "https://sa-schools-data.dev.welink.net.za/v1/graphql",
  }),
  cache: new InMemoryCache(),
});

export default apollo;
