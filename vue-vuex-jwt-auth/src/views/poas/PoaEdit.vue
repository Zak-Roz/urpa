<template>
  <div class="col-md-12">
    <div class="">
      <form v-if="!successful && access && editAccess" style="margin: 20px 0 0 0; padding: 0 15%" class="needs-validation" novalidate name="form" @submit.prevent="">
        <h1 style="text-align: center; margin: 0px 0 0px 0"><b>Довіреність №{{poa.id}}</b></h1>
        <h5 style="text-align: center; margin: 0px 0 20px 0">{{isActive}}</h5>
        <p v-if="this.poa.is_duplicate" style="text-align: center; margin: 0px 0 0 0"><b>Дублікат</b></p>
        <div >
          <!-- code&name -->
          <table width="100%" cellpadding="5">
            <tbody>
            <!-- Довіритель -->
            <tr>
              <td width="50%">
                <lable for="principal_code">{{this.isPrincipal[0]}}</lable>
              </td>
              <td>
                <lable for="principal_code">{{this.isPrincipal[1]}}</lable>
              </td>
            </tr>
            <tr>
              <td>
                <input 
                  v-model="poa.principal_name"
                  v-validate="{required: true, regex: /[А-ЯІЇ]{1}[а-яії]{1,23}\s[А-ЯІЇ]{1}[а-яії]{1,23}\s[А-ЯІЇ]{1}[а-яії]{1,23}/}"
                  type="text"
                  class="form-control" 
                  name="principal_name"
                  placeholder="Іванов Іван Іванович"
                />
                <div v-if="submitted && errors.has('principal_name')" class="alert-danger">
                  {{errors.first('principal_name')}}
                </div>
              </td>
              <td>
                <input 
                  v-model="poa.principal_code"
                  v-validate="{required: true, length: isLegalOrIndividualP()}"
                  type="number"
                  class="form-control" 
                  name="principal_code"
                  placeholder="1234567890"
                />
                <div v-if="submitted && errors.has('principal_code')" class="alert-danger">
                  {{errors.first('principal_code')}}
                </div>
              </td>
            </tr>
            <!-- Довірююча особа -->
            <tr>
              <td>
                <lable for="principal_code">{{this.isConfident[0]}}</lable>
              </td>
              <td>
                <label for="confident_code">{{this.isConfident[1]}}</label>
              </td>
            </tr>
            <tr>
              <td class="td-width">
                <input 
                  v-model="poa.confident_name"
                  v-validate="{required: true, regex: /[А-ЯІЇ]{1}[а-яії]{1,23}\s[А-ЯІЇ]{1}[а-яії]{1,23}\s[А-ЯІЇ]{1}[а-яії]{1,23}/, is_not: poa.principal_name}"
                  type="text"
                  class="form-control" 
                  name="confident_name"
                  placeholder="ТОВ 'ПРИВАТБАНК'"
                />
                <div v-if="submitted && errors.has('confident_name')" class="alert-danger">
                  {{errors.first('confident_name')}}
                </div>
              </td>
              <td>
                <input 
                  v-model="poa.confident_code"
                  v-validate="{required: true, length: isLegalOrIndividualC(), is_not: poa.principal_code}"
                  type="text"
                  class="form-control" 
                  name="confident_code"
                  placeholder="12345678"
                />
                <div v-if="submitted && errors.has('confident_code')" class="alert-danger">
                  {{errors.first('confident_code')}}
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <table width="100%" cellpadding="5">
            <tbody>
            <!-- dates -->
            <tr>
              <td width="50%">
                <lable for="certification_date">Дата посвідчення</lable>
              </td>
              <td width="50%">
                <lable for="expiry_date">Термін дії</lable>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  v-model="poa.certification_date"
                  v-validate="`required|date_format:yyyy-MM-dd|date_between:1991-08-24,${this.dateNow}`"
                  type="date"
                  
                  class="form-control"
                  name="certification_date"
                />
                <div v-if="submitted && errors.has('certification_date')" class="alert-danger">
                  {{errors.first('certification_date')}}
                </div>
              </td>
              <td>
                <input
                  v-model="poa.expiry_date"
                  v-validate="`required|date_format:yyyy-MM-dd|date_between:${this.dateNow},2200-01-01`"
                  type="date"
                  class="form-control"
                  name="expiry_date"
                />
                <div v-if="submitted && errors.has('expiry_date')" class="alert-danger">
                  {{errors.first('expiry_date')}}
                </div>
              </td>
            </tr>
            <!-- numbers and series -->
            <!-- <tr>
              <td width="50%">
                <lable for="blank_series">Серія</lable>
              </td>
              <td width="50%">
                <lable for="blank_number">Номер</lable>
              </td>
            </tr>
            <tr>
              <td class="td-width">
                <input
                  v-model="poa.blank_series"
                  v-validate="{ required: true, length: 3, regex: /^[А-ЯІЇ]+$/ }"
                  type="text"
                  class="form-control"
                  name="blank_series"
                />
                <div v-if="submitted && errors.has('blank_series')" class="alert-danger">
                  {{errors.first('blank_series')}}
                </div>
              </td>
              <td>
                <input
                  v-model="poa.blank_number"
                  v-validate="{ required: true, length: 6 }"
                  type="number"
                  class="form-control"
                  name="blank_number"
                />
                <div v-if="submitted && errors.has('blank_number')" class="alert-danger">
                  {{errors.first('blank_number')}}
                </div>
              </td>
            </tr> -->
            </tbody>
          </table>
          <!-- property -->
          <table width="100%" cellpadding="5">
            <tbody>
              <tr>
                <td>
                  <textarea
                  v-model="poa.property"
                  v-validate="'required'"
                  type="text"
                  class="form-control"
                  name="property" 
                  placeholder="property" 
                  rows="2"></textarea>
                  <div v-if="submitted && errors.has('property')" class="alert-danger">
                    {{errors.first('property')}}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- submit -->
          <table width="100%" cellpadding="5">
            <tbody>
              <tr>
                <td style="border-left: 20px solid white; border-right: 20px solid white; color: white; text-align: center;">
                  <button v-if="this.poa.is_active && !this.poa.is_duplicate" class="btn btn-secondary" style="margin: 0 15px 0 0" type="reset">Очистити</button>
                  <button v-if="this.poa.is_active && !this.poa.is_duplicate" class="btn btn-danger"  type="submit" @click="unActive" style="margin: 0 15px 0 0">Деактивувати</button>
                  <button v-if="this.poa.is_active && !this.poa.is_duplicate" class="btn btn-success"  type="submit" @click="handleRegister">Зберегти зміни</button>
                  <button v-if="!this.poa.is_active || this.poa.is_duplicate" class="btn btn-success"  type="submit" @click="$router.push(`/poa/${poa.id}`)">Повернутися до довіреності</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
      <div style="padding: 1% 35%; text-align: center;" >
        <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
          {{message}}
        </div>
      </div>
      <div style="padding: 0 38%" v-if="message && successful">
        <!-- <button class="btn btn-primary btn-block" @click="message='';successful=false">Продовжити редагувати</button> -->
        <button class="btn btn-primary btn-block" @click="$router.push(`/poa/${poa.id}`)">Повернутися до довіреності</button>
      </div>
    </div>
    <div style="padding: 0 30%">
    <div v-if="!access || !editAccess"
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
export default {
  name: 'NewPoa',
  data() {
    return {
      registrarOrganization: null,
      organizationCurrentUser: null,
      access: false,
      editAccess: false,
      isActive: '',
      poa: null,
      isPrincipal: ['Найменування довірителя', 'ЄДРПОУ довірителя'],
      isConfident: ['ПІБ довіреної особи', 'РНОКПП довіреної особи'],
      submitted: false,
      successful: false,
      message: '',
      currentMonth: (new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : `${(new Date().getMonth() + 1)}`,
      currentDay: new Date().getDate() < 10 ? `0${(new Date().getDate())}` : `${(new Date().getDate())}`,
      currentYear: new Date().getFullYear(),
      dateNow: '',
    };
  },
  async created() {
    try {
    const data = await this.$store.dispatch('poa/getById', this.$route.params.id)
    this.poa = data.data; 
    if(this.poa === null) throw '';
    this.isActive = this.poa.is_active ? 'Активна' : 'Не активна';
    const uid1 = await this.$store.dispatch('user/getById', this.poa.registrar_id)
    this.registrarOrganization = uid1.data.user.workplace_id;
    const uid2 = await this.$store.dispatch('user/getById', this.$store.state.auth.user.id)
    this.organizationCurrentUser = uid2.data.user.workplace_id;
    this.editAccess = this.registrarOrganization === this.organizationCurrentUser;
    if(this.poa.principal_code.split('').length === 10) this.isPrincipal = ['ПІБ довірителя', 'РНОКПП довірителя'];
    if(this.poa.confident_code.split('').length === 8) this.isConfident = ['Найменування довіреної особи', 'ЄДРПОУ довіреної особи'];
    const local = JSON.parse(localStorage.getItem('user'));
    this.access = local.rights.some((el) => el === 'RIGHT_MODERATOR');
    } catch(err) {
      alert('Довіреності не знайдено.'); 
      setTimeout(() => this.$router.push('/find-poa'), 2000);
    }
  },
  methods: {
    unActive() {
      this.message = '';
      this.poa.is_active = false;
      // alert(JSON.stringify(this.poa))
      this.$store.dispatch('poa/update', this.poa).then(
        data => {
          this.message = data.message;
          this.successful = true;
          setTimeout(() => {window.location.reload();}, 5000)
        },
        error => {
          this.message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('poa/update', this.poa).then(
            data => {
              this.message = data.message;
              this.successful = true;
              setTimeout(() => {window.location.reload();}, 5000)
            },
            error => {
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },
    isLegalOrIndividualP() {
      // alert(this.codePrincipal)
      if (this.isPrincipal[1] === 'ЄДРПОУ довірителя') {
        return 8;
      }
      return 10;
    },
    isLegalOrIndividualC() {
      if (this.isConfident[1] === 'ЄДРПОУ довіреної особи') {
        return 8;
      }
      return 10;
    }
  }
};
</script>

<style scoped>
</style>