<template>
<div>
  <div style="margin: 17px 0 0 0" v-if="user">
    <div style="display:flex; justify-content:center; margin-bottom: 6px;">
          <h1>{{user.fullname}}</h1>
    </div>
    <div style="padding: 0 15%">
      <table class="table table-striped table-hover">
        <tbody>
          <tr>
            <th scope="col">Логін</th>
            <td>{{user.login}}</td>
          </tr>
          <tr>
            <th scope="row">Дата народження</th>
            <td>{{user.dob}}</td> 
          </tr>
          <tr>
            <th scope="row">РНОКПП (ІПН)</th>
            <td >{{user.rntrc}}</td>
          </tr>
          <tr>
            <th scope="row">Серія паспорту</th>
            <td>{{user.passport_serias}}</td>
          </tr>
          <tr>
            <th scope="row">Номер паспорта</th>
            <td>{{user.passport_number}}</td>
          </tr>
          <tr>
            <th scope="row">Орган що видав паспорт</th>
            <td>{{user.passport_authority}}</td>
          </tr>
          <tr>
            <th scope="row">Дата посвідчення паспорту</th>
            <td>{{user.passport_issue_date}}</td>
          </tr>
          <tr>
            <th scope="row">Наявні права</th>
            <td>{{authorities}}</td>
          </tr>
          <tr>
            <th scope="row">Статус аккаунта</th>
            <td>{{status}}</td>
          </tr>
          <tr>
            <th scope="row">Установа, в якій працює</th>
            <td>"{{organization_name}}"</td>
          </tr>
          <tr>
            <th scope="row">Дата створення</th>
            <td>{{user.createdAt}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="display: flex; margin: 10px; justify-content: center">
      <button style="margin: 10px;" @click="$router.push(`/edit-user/${user.id}`)" type="button" class="btn btn-outline-dark">Редагувати</button>
    </div>
    
  </div>
</div>

</template>

<script>

export default {
  data() {
    return {
      user: null,
      status: '',
      organization_name: '',
      authorities: '',
    }
  },
  created() {
    this.$store.dispatch('user/getById', this.$route.params.id)
      .then(
        data => {
          // alert(JSON.stringify(data.data))
          if (data.data.user === null || data.data === null) {
            throw '';
          }
          this.user = data.data.user;
          this.user.dob = this.user.dob.split('-').reverse().join('-');
          this.status = this.user.status_id === 1 ? 'Ще не входив в систему' : this.user.status_id === 2 ? 'Користувач активний' : this.user.status_id === 3 ? 'Користувача деактивовано' : '';
          this.$store.dispatch('work/getById', this.user.workplace_id).then((data) => this.organization_name = data.data.organization_name);
          this.user.passport_issue_date = this.user.passport_issue_date.split('-').reverse().join('-');
          this.user.createdAt = new Date(this.user.createdAt).toUTCString()
          this.user.passport_serias = this.user.passport_serias || 'Немає.';
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
      .catch(() => { alert('Користувача не знайдено.'); setTimeout(this.$router.push('/find-user'), 1500); })
  },
}
</script>
