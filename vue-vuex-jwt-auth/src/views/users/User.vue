<template>
<div>
  <div style="margin: 30px 0 0 0" v-if="user">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">{{user.id}}</th>
          <th scope="col">fullname</th>
          <th scope="col">{{user.fullname}}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">login</th>
          <td>{{user.login}}</td>
          <th scope="row">rntrc</th>
          <td >{{user.rntrc}}</td>
        </tr>
        <tr>
          <th scope="row">password</th>
          <td>f</td>
          <th scope="row">dob</th>
          <td>{{user.dob}}</td>
        </tr>
        <tr>
          <th scope="row">passport_serias</th>
          <td>{{user.passport_serias}}</td>
          <th scope="row">passport_number</th>
          <td>{{user.passport_number}}</td>
        </tr>
        <tr>
          <th scope="row">passport_issue_date</th>
          <td>{{user.passport_issue_date}}</td>
          <th scope="row">passport_authority</th>
          <td>{{user.passport_authority}}</td>
        </tr>
        <tr>
          <th scope="row">authorities</th>
          <td>{{user.authorities}}</td>
        </tr>
      </tbody>
</table>
    
  </div>
</div>
  
</template>

<script>

export default {
  data() {
    return {
      user: null,
      authorities: [],
    }
  },
  created() {
    this.$store.dispatch('user/getById', this.$route.params.id)
      .then((data) => {
        if(data.data === null) {
          throw '';
        }
        this.user = data.data;
      })
      .catch(() => {alert('Користувача не знайдено.'); setTimeout(this.$router.push('/find-user'), 1500);})
  },
}
</script>
