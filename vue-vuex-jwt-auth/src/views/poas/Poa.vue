<template>
<div>
  <div v-if="poa && access">
    <h1 style="text-align: center; margin: 30px 0 0px 0"><b>Довіреність №{{poa.id}}</b></h1>
    <h5 style="text-align: center; margin: 0px 0 20px 0">{{isActive}}</h5>
    <p v-if="is_duplicate" style="text-align: center; margin: 0px 0 0px 0">Дублікат</p>
    <h4 v-if="this.poa.is_active" style="display: flex; justify-content: center; margin: 5px" > Діє до {{poa.expiry_date}}</h4>

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
      <button v-if="this.poa.is_active && editAccess && !is_duplicate" style="margin: 10px;" @click="dublicate" type="button" class="btn btn-outline-dark">Дублікат</button>
      <button v-if="this.poa.is_active && editAccess && !is_duplicate" style="margin: 10px;" @click="$router.push(`/edit-poa/${poa.id}`)" type="button" class="btn btn-outline-dark">Редагувати</button>
      <button style="margin: 10px;" @click="pdf" type="button" class="btn btn-outline-dark">Витяг</button>
    </div>
  </div>
</div>
  
</template>

<script>
import Axios from 'axios'

export default {
  data() {
    return {
      registrarOrganization: null,
      organizationCurrentUser: null,
      access: false,
      editAccess: false,
      is_duplicate: false,
      isActive: '',
      poa: null,
      isPrincipal: ['Найменування довірителя', 'ЄДРПОУ довірителя'],
      isConfident: ['ПІБ довіреної особи', 'РНОКПП довіреної особи'],
    }
  },
  async created() {
    try {
    const data = await this.$store.dispatch('poa/getById', this.$route.params.id)
    this.poa = data.data;
    this.poa.registration_date = this.poa.registration_date.split('-').reverse().join('-');
    this.poa.certification_date = this.poa.certification_date.split('-').reverse().join('-');
    this.poa.expiry_date = this.poa.expiry_date.split('-').reverse().join('-');
    if(this.poa === null) throw '';
    this.isActive = this.poa.is_active ? 'Активна' : 'Не активна';
    const uid1 = await this.$store.dispatch('user/getById', this.poa.registrar_id)
    this.registrarOrganization = uid1.data.user.workplace_id;
    const uid2 = await this.$store.dispatch('user/getById', this.$store.state.auth.user.id)
    this.organizationCurrentUser = uid2.data.user.workplace_id;
    this.is_duplicate = this.poa.is_duplicate;
    this.editAccess = this.registrarOrganization === this.organizationCurrentUser;
    if(this.poa.principal_code.split('').length === 10) this.isPrincipal = ['ПІБ довірителя', 'РНОКПП довірителя'];
    if(this.poa.confident_code.split('').length === 8) this.isConfident = ['Найменування довіреної особи', 'ЄДРПОУ довіреної особи'];
    const local = JSON.parse(localStorage.getItem('user'));
    this.access = local.rights.some((el) => el === 'RIGHT_MODERATOR' || el === 'RIGHT_ADMIN' || el === 'RIGHT_USER');
    } catch(err) {
      alert('Довіреності не знайдено.'); 
      setTimeout(() => this.$router.push('/find-poa'), 2000);
    }
  },
  methods: {
    async dublicate() {
      this.poa.is_duplicate = true;
      // alert(JSON.stringify(this.poa))
      const data = await this.$store.dispatch('poa/update', this.poa);
      alert(data.message);
      setTimeout(() => {window.location.reload();}, 1000)
    },
    
    async pdf() {
      const response = await Axios.post('http://localhost:8080/api/pdf/addNewPdf', this.poa, { responseType: 'arraybuffer', headers: { 'Accept': 'application/pdf' } });
      if (response.data.error) {
        // console.error(response.data.error)
      }

      const fileURL = window.URL.createObjectURL(new Blob([response.data], {
      type: 'application/pdf',
    }));
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      const fileName = response.headers['content-disposition'].substring(22, 52);
      fileLink.setAttribute('download', fileName);
      document.body.appendChild(fileLink);
      fileLink.click();
      fileLink.remove();
      // this.$store.dispatch('poa/getPDF', this.poa)
      //   .then((data) => alert(JSON.stringify(data.data)))
    },
  }
}
</script>