<template>
  <div class="container">
    <div v-if="access">
      <header class="jumbotron">
        <div>
          <h3>{{content}}</h3>
        </div>
      </header>
      <router-link to="/register" class="but-link">
        <button v-if="!content.match(/No|found/g)" class="btn btn-success">
            Створити користувача
        </button>
      </router-link>
      <router-link to="/find-user" class="but-link">
        <button v-if="!content.match(/No|found/g)" style="margin: 10px;" class="btn btn-success">
              Знайти користувача
        </button>
      </router-link>
      <router-link to="/find-poa" class="but-link">
        <button v-if="!content.match(/No|found/g)" class="btn btn-success">
            Знайти довіреність
        </button>
      </router-link>
    </div>
    <div style="padding: 0 30%">
      <div v-if="!access"
      class="alert"
      style="text-align: center;"
      :class="'alert-danger'"
      >
        Сторінка за даним запитом не доступна

      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../../services/user.service';

export default {
  name: 'Admin',
  data() {
    return {
      content: '',
      access: false,
    };
  },
  mounted() {
    const local = JSON.parse(localStorage.getItem('user'));
    this.access = local.rights.some((el) => el === 'RIGHT_ADMIN');
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