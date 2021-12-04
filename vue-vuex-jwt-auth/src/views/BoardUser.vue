<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
      <button v-if="!content.match(/No|found/g)" class="button">
        <router-link to="/find-poa" class="but-link">
          <font-awesome-icon icon="user-plus" />Знайти довіреність
        </router-link>
      </button>
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'User',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getUserBoard().then(
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