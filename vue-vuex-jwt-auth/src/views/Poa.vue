<template>
<div>
  <div style="margin: 30px 0 0 0" v-if="poa">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Номер в реєстрі</th>
          <th scope="col">{{poa.id}}</th>
          <th scope="col">Термін дії</th>
          <th scope="col">{{poa.expiry_date}}</th>
        </tr>
      </thead>
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
    
  </div>
</div>
  
</template>

<script>

export default {
  data() {
    return {
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
        })
  },
}
</script>
