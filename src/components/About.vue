<template>
  <div>
    <h1 class="headline">
      What you're seeing
    </h1>
    <br />
    <v-flex xs12>
      <p>
        This map uses publicly available data from
        <a
          href="https://www.education.gov.za/Programmes/EMIS/EMISDownloads.aspx"
          target="_blank"
          >the Department of Basic Education</a
        >. The data has been uploaded to a postgreSQL database, with
        <a href="https://hasura.io/" target="_blank">Hasura</a>
        autogenerating a GraphQL api. This statically-hosted, VueJs frontend
        that you see before you; consumes that public api. JAMStack-Style!! :)
      </p>
      <p>
        To play with this School Data in a GraphiQL sandbox, copy this api's
        endpoint
        <strong>https://sa-schools-data.dev.welink.net.za/v1/graphql</strong>
        and paste that into
        <a
          href="https://graphiql-online.com/"
          target="_blank"
          rel="noopener noreferrer"
          >GraphiQL-Online</a
        >. While getting your bearings with the data, CTRL + SPACE for
        auto-suggest is your friend.
      </p>
      <p>
        My hope is that by making this data more publicly available we can make
        the existing data both:
      </p>
      <ol>
        <li>More usefull</li>
        <li>More accurate</li>
      </ol>
    </v-flex>
    <br />
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
