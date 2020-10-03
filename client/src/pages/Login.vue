<template>
  <div class="w-50 m-auto">
    <div class="mt-5"></div>
    <h3>Login</h3>
    <form @submit="handleSubmit">
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" class="form-control">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary btn-block mt-2">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
export default {
  name: "LoginPage",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleSubmit(e) {
      e.preventDefault();
      try {
        const res = await axios.post('/api/login', {
          email: this.email,
          password: this.password
        });
        const { token, user } = res.data;
        this.login({ token, user });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>