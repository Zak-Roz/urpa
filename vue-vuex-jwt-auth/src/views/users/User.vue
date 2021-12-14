<template>
<div>
  <div style="margin: 30px 0 0 0" v-if="user">
    <div style="display:flex; justify-content:center; margin-bottom: 8px;">
          <h4>ПІБ: {{user.fullname}}</h4>
    </div>
    <table style="display: flex; justify-content:center;" class="table table-striped table-hover">
      <thead>
      </thead>
      <tbody>
        <tr>
          <th scope="col">Логін</th>
          <th scope="col">РНОПКК</th>

        </tr>
          <tr>
           <td>{{user.login}}</td>
          <td scope="row">{{user.rntrc}}</td>
        </tr>

           <tr>
          <th scope="row">Дата народження</th>
          <th scope="row">Серія паспорту</th>
        </tr>

        <tr>
          <td>{{user.dob}}</td> 
           <td>{{user.passport_serias}}</td>
        </tr>

        <tr>
            <th scope="row">Дата посвідчення паспорту</th>
            <th scope="row">Орган що видав паспорт</th>
        </tr>
        <tr>
          <td>{{user.passport_issue_date}}</td>
          <td>{{user.passport_authority}}</td>
        </tr>

        <tr>
          <th colspan="2" scope="row">Наявні права</th>
        </tr>
        <tr>
          <td colspan="2" >{{authorities}}</td>
        </tr>

      </tbody>
</table>

<div style="display: flex; margin: 10px; justify-content: center">
       <button style="margin: 10px;" type="button" class="btn btn-outline-dark">Редагувати</button>
</div>
    
  </div>
</div>

</template>

<script>

export default {
  data() {
    return {
      user: null,
      authorities: '',
    }
  },
  created() {
    this.$store.dispatch('user/getById', this.$route.params.id)
      .then(
        data => {
          // alert(JSON.stringify(data.data))
          if(data.data.user === null || data.data === null) {
            throw '';
          }
          this.user = data.data.user;
          this.user.passport_serias	 = this.user.passport_serias || 'Немає.';
          data.data.authorities.sort();
          data.data.authorities.forEach((el) => {
            this.authorities += `${el.toUpperCase()}, `
          });
          this.authorities = this.authorities.slice(0, this.authorities.length - 2)
          // alert(JSON.stringify(this.user))
        },
        error => {
          this.message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
        })
      .catch(() => {alert('Користувача не знайдено.'); setTimeout(this.$router.push('/find-user'), 1500);})
  },
}
</script>
