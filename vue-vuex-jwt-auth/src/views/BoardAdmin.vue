<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
      <button v-if="!content.match(/No|found/g)" class="button">
        <router-link to="/register" class="but-link">
          <font-awesome-icon icon="user-plus" />Створити нового користувача системи
        </router-link>
      </button>
      <button v-if="!content.match(/No|found/g)" style="left: 10px" class="button">
        <router-link to="/add-poa" class="but-link">
          <font-awesome-icon icon="user-plus" />Створити довіреність
        </router-link>
      </button>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Admin',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getAdminBoard().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
<style scoped>
.container {
  margin-top: 1rem;
}
</style>