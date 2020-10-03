<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <router-link class="navbar-brand" to="/">Blog Post</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav" v-if="isLoggedIn">
        <li class="nav-item active">
          <router-link class="nav-link" to="/"
            >Home <span class="sr-only">(current)</span></router-link
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" to="/search">Search</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" to="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" to="#" tabindex="-1" aria-disabled="true"
            >Disabled</a
          >
        </li>
      </ul>
    </div>
    <ul class="navbar-nav" v-if="isLoggedIn">
      <li class="nav-item">
        <button class="btn btn-primary" @click="logout" >Logout</button>
      </li>
    </ul>
    <ul class="navbar-nav" v-else>
      <li class="nav-item">
        <router-link class="nav-link" to="/">Login</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/register">Register</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  computed: mapGetters(["isLoggedIn"]),
  methods: {
    ...mapActions(['logout'])
  }
};
</script>