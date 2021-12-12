<template>
  <div class="container">
    <header class="jumbotron">
    <div v-if="access">
      <h3>{{content}}</h3>
      <button v-if="!content.match(/No|found/g)" class="button">
        <router-link to="/find-poa" class="but-link">
          <font-awesome-icon icon="user-plus" />Знайти довіреність
        </router-link>
      </button>
    </div>
    <div v-if="!access"
    class="alert"
    style="text-align: center;"
    :class="'alert-danger'"
    >
      У вас немає доступа!
    </div>
    </header>
  </div>
</template>

<script>
import UserService from '../../services/user.service';

export default {
  name: 'User',
  data() {
    return {
      access: false,
      content: ''
    };
  },
  mounted() {
    const local = JSON.parse(localStorage.getItem('user'));
    this.access = local.rights.some((el) => el === 'RIGHT_MODERATOR' || el === 'RIGHT_ADMIN' || el === 'RIGHT_USER');
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