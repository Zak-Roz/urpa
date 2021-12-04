<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.fullname}}</strong> Обліковий запис
      </h3>
    </header>
    <p>
      <strong>Токен:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Ідентифікатор:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Логін:</strong>
      {{currentUser.login}}
    </p>
    <p>
      <strong>Повна інформація:</strong>
      {{currentUser}}
    </p>
    <strong>Рівні доступу:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.rights" :key="index">{{role}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
<style scoped>
.container {
  margin-top: 1rem;
}
</style>