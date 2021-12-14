<template>
<div>
  <div v-if="poa && access">
    <h1 style="text-align: center; margin: 30px 0 30px 0"><b>Довіреність №{{poa.id}}</b></h1>

    <h4 style="display: flex; justify-content: center; margin: 5px" > Діє до {{poa.expiry_date}}</h4>

    <table class="table table-striped table-hover">
      <tbody>
        <tr>
          <th scope="row">{{isPrincipal[0]}}</th>
          <td>{{poa.principal_name}}</td>
          <th scope="row">Код {{isPrincipal[1]}}</th>
          <td >{{poa.principal_code}}</td>
        </tr>
        <tr>
          <th scope="row">{{isConfident[0]}}</th>
          <td>{{poa.confident_name}}</td>
          <th scope="row">Код {{isConfident[1]}}</th>
          <td>{{poa.confident_code}}</td>
        </tr>
        <tr>
          <th scope="row">Серія бланка</th>
          <td>{{poa.blank_series}}</td>
          <th scope="row">Номер бланка</th>
          <td>{{poa.blank_number}}</td>
        </tr>
        <tr>
          <th scope="row">Дата посвідчення</th>
          <td>{{poa.certification_date}}</td>
          <th scope="row">Дата реєстрації</th>
          <td>{{poa.registration_date}}</td>
        </tr>
        <tr>
          <th scope="row">Майно</th>
          <td colspan="3"><textarea readonly v-model="poa.property" name="property" id="property" style="width:100%;" rows="4"></textarea></td>
        </tr>
      </tbody>
</table>
  <div style="display: flex; margin: 10px; justify-content: center">
       <button style="margin: 10px;" type="button" class="btn btn-outline-dark">Зробити Дублікат</button>
       <button style="margin: 10px;" type="button" class="btn btn-outline-dark">Редагувати</button>
       <button style="margin: 10px;" type="button" class="btn btn-outline-dark">Витяг</button>
  </div>
  </div>
</div>
  
</template>

<script>

export default {
  data() {
    return {
      access: false,
      poa: null,
      isPrincipal: ['Найменування довірителя', 'ЄДРПОУ довірителя'],
      isConfident: ['ПІБ довіреної особи', 'РНОКПП довіреної особи'],
    }
  },
  created() {
    this.$store.dispatch('poa/getById', this.$route.params.id)
      .then((data) => this.poa = data.data)
      .then(() => {
        if(this.poa.principal_code.split('').length === 10) this.isPrincipal = ['ПІБ довірителя', 'РНОКПП довірителя'];
        if(this.poa.confident_code.split('').length === 8) this.isConfident = ['Найменування довіреної особи', 'ЄДРПОУ довіреної особи'];
        const local = JSON.parse(localStorage.getItem('user'));
        this.access = local.rights.some((el) => el === 'RIGHT_MODERATOR' || el === 'RIGHT_ADMIN' || el === 'RIGHT_USER');
      })
      .catch(() => {alert('Довіреності не знайдено.'); setTimeout(this.$router.push('/find-poa'), 1500);})
  },
}
</script>
