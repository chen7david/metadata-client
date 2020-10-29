<template>
  <v-container>
    <h1>Documentation</h1>
    <hr class="my-5">
    <p><v-chip>http://aox.hopto.org:7000</v-chip></p>
    <p><v-chip>http://aox.hopto.org:8000</v-chip></p>
    <p><v-chip>http://aox.hopto.org:9000/image/$size/$imgURL</v-chip></p>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Method
          </th>
          <th class="text-left">
            URL
          </th>
          <th class="text-left">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.method }}</td>
          <td>{{ item.path }}</td>
          <td>{{ item.description }}</td>
        </tr>
      </tbody>
      </template>
  </v-simple-table>
  </v-container>
</template>

<script>

export default {
  name: 'Documentation',

  data: () => ({
    items: [
      {
        name: 'search tmdb-movies',
        method: 'get',
        path: 'tmdb-movies?search=nemo&year=2017',
        description: ''
      },
      {
        name: 'search tmdb-show',
        method: 'get',
        path: 'tmdb-shows?search=pokemon&year=2016',
        description: ''
      },
      {
        name: 'search movies',
        method: 'get',
        path: 'movies?search=nemo&year=2017',
        description: ''
      },
      {
        name: 'search show',
        method: 'get',
        path: 'shows?search=pokemon&year=2016',
        description: ''
      },
      {
        name: 'getById Movie',
        method: 'get',
        path: 'movie/:id/id',
        description: ''
      },
      {
        name: 'getById show',
        method: 'get',
        path: 'show/:id/id',
        description: ''
      },
    ],
  }),
};
</script>
