<template>
  <div class="col-md-12">
    <div>
      <form style="margin: 50px 0 0 0; padding: 0 20%" class="needs-validation" novalidate name="form" @submit.prevent="handleRegister">
        <div v-if="!successful && access">
          <!-- dates&numbers and series -->
          <table width="100%" cellpadding="5">
            <tbody>
            <!-- dates -->
            <tr>
              <td width="33%">
                <lable for="registration_date">Дата реєстрації</lable>
              </td>
              <td width="33%">
                <lable for="register_number">Номер в реєстрі</lable>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  v-model="poa.registration_date"
                  v-validate="{ required: isRequiredDate(), date_format: 'yyyy-MM-dd', date_between:['1991-08-24', this.dateNow] }"
                  type="date"
                  class="form-control"
                  name="registration_date"
                />
                <div v-if="submitted && errors.has('registration_date')" class="alert-danger">
                  {{errors.first('registration_date')}}
                </div>
              </td>
              <td>
                <input
                  v-model="poa.register_number"
                  v-validate="{ required: isRequiredNumRe() }"
                  type="number"
                  class="form-control"
                  name="register_number"
                />
                <div v-if="submitted && errors.has('register_number')" class="alert-danger">
                  {{errors.first('register_number')}}
                </div>
              </td>
            </tr>
            <tr>
              <td width="100%" colspan="2" style="text-align: center; padding: 20px 0;"><b>АБО</b></td>
            </tr>
            <!-- numbers and series -->
            <tr>
              <td width="50%">
                <lable for="blank_series">Серія бланка</lable>
              </td>
              <td width="50%">
                <lable for="blank_number">Номер бланка</lable>
              </td>
            </tr>
            <tr>
              <td class="td-width">
                <input
                  v-model="poa.blank_series"
                  v-validate="{ required: isRequiredSer(), length: 3, regex: /^[А-ЯІЇ]+$/ }"
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
                  v-validate="{ required: isRequiredNum(), length: 6 }"
                  type="number"
                  class="form-control"
                  name="blank_number"
                />
                <div v-if="submitted && errors.has('blank_number')" class="alert-danger">
                  {{errors.first('blank_number')}}
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
                  <button class="btn btn-secondary" style="margin: 0 15px" type="reset">Відмінити</button>
                  <button class="btn btn-success" type="submit">Знайти довіреність</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
      <div style="padding: 0 35%; text-align: center;" >
      <div
        v-if="message"
        
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div></div>
      <div style="padding: 0 42%" v-if="message && successful">
        <button class="btn btn-primary btn-block" @click="message='';successful=false">Нова довіреність</button>
      </div>
    </div>
    <div v-if="!access"
    class="alert"
    style="text-align: center;"
    :class="'alert-danger'"
    >
      У вас немає доступа!
    </div>
  </div>
</template>

<script>
import Poa from '../../models/poa';

export default {
  name: 'FindPoa',
  data() {
    return {
      access: false,
      poa: new Poa('', '', '', '', '', '', '', '', '', '', '', ''),
      submitted: false,
      successful: false,
      message: '',
      currentMonth: (new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : `${(new Date().getMonth() + 1)}`,
      currentDay: new Date().getDate() < 10 ? `0${(new Date().getDate())}` : `${(new Date().getDate())}`,
      currentYear: new Date().getFullYear(),
      dateNow: '',
    };
  },
  mounted() {
    this.dateNow = `${this.currentYear}-${this.currentMonth}-${this.currentDay}`;
    this.poa.registration_date = '2021-12-05';
    this.poa.blank_number = '111222';
    this.poa.blank_series = 'ААА';
    this.poa.register_number = '1';
    const local = JSON.parse(localStorage.getItem('user'));
    this.access = local.rights.some((el) => el === 'RIGHT_MODERATOR' || el === 'RIGHT_ADMIN' || el === 'RIGHT_USER');
  },
  methods: {
    handleRegister() {
      // alert(JSON.stringify(this.poa));
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          // alert(JSON.stringify(this.poa));
          this.$store.dispatch('poa/getByParam', this.poa).then(
            data => {
              this.message = data.data;
              if (this.message === null) {
                this.successful = false;
                alert('Довіреності не знайдено')
              } else {
                this.successful = true;
                // alert(JSON.stringify(this.message))
                this.$router.push({ path: `/poa/${data.data.id}` })
              }
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
      if (this.codePrincipal === 'Код ЄДРПОУ довірителя') {
        return 8;
      }
      return 10;
    },
    isLegalOrIndividualC() {
      if (this.codeConfident === 'Код ЄДРПОУ довірителя') {
        return 8;
      }
      return 10;
    },
    checkPrincipal(event) {
      if (event.target.value === 'UrP') {
        this.codePrincipal = 'Код ЄДРПОУ довірителя';
      }
      if (event.target.value === 'FullP') {
        this.codePrincipal = 'РНОКПП';
      }
    },
    checkConfident(event) {
      if (event.target.value === 'UrC') {
        this.codeConfident = 'Код ЄДРПОУ довірителя';
      }
      if (event.target.value === 'FullC') {
        this.codeConfident = 'РНОКПП';
      }
    },
    isSeriesRegex(event) {
      if (event.target.value === 'UrC') {
        this.codeConfident = 'Код ЄДРПОУ довірителя';
      }
      if (event.target.value === 'FullC') {
        this.codeConfident = 'РНОКПП';
      }
    },
    isRequiredDate() {
      if (this.poa.register_number) {
        if (this.poa.blank_number && this.poa.blank_series) return false;
        return true;
      }
      if (this.poa.blank_number || this.poa.blank_series) return false;
      return true;
    },
    isRequiredNumRe() {
      if (this.poa.registration_date) {
        if (this.poa.blank_number && this.poa.blank_series) return false;
        return true;
      }
      if (this.poa.blank_number || this.poa.blank_series) return false;
      return true;
    },
    isRequiredSer() {
      if (this.poa.blank_number) {
        if (this.poa.registration_date && this.poa.register_number) return false;
        return true;
      }
      if (this.poa.registration_date || this.poa.register_number) return false;
      return true;
    },
    isRequiredNum() {
      if (this.poa.blank_series) {
        if (this.poa.registration_date && this.poa.register_number) return false;
        return true;
      }
      if (this.poa.registration_date || this.poa.register_number) return false;
      return true;
    },
  }
};
</script>

<style scoped>
</style>