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
      <div class="form-group">
        <label>Confirm Password</label>
        <input type="password" v-model="password2" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary btn-block mt-2">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "LoginPage",
  data() {
    return {
      email: '',
      password: '',
      password2: ''
    }
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      try {
        const res = await axios.post('/api/register', {
            email: this.email,
            password: this.password
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>