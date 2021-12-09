<template>
  <div class="container">
    <div class="card border-0 mt-5" align="center">
      <div class="row align-items-center">
        <div class="col" align="right">
          <img src="logo.png" width="80%">
        </div>
        <div class="col" align="left">
          <h2 class="mt-5">Єдиний реєстр довіреностей</h2>
          <h3 class="mt-5">Єдиний реєстр довіреностей (ЄРД) – електронна база даних, що містить інформацію про довіреності
            (у тому числі їх дублікати), а також відомості про припинення їх дії</h3>
        </div>
        <footer class="mt-5">Інформація надана у відповідності із
          <a href="https://zakon.rada.gov.ua/laws/show/z1378-06">Законом України "Про запровадження Єдиного реєстру довіреностей
          та внесення змін і доповнень до деяких нормативно-правових актів Міністерства юстиції України"</a></footer>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
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