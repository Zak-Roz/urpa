<template>
  <div class="col-md-12">
    <div class="">
      <form style="margin: 50px 0 0 0; padding: 0 10%" class="needs-validation" novalidate name="form" @submit.prevent="handleRegister">
        <div v-if="!successful && access">
          <table width="100%" cellpadding="5">
            <tbody>
            <tr>
              <td width="33%">
                <lable for="fullname">ПІБ користувача</lable>
              </td>
              <td width="33%">
                <lable for="login">Логін користувача</lable>
              </td>
              <td width="33%">
                <lable for="rntrc">РНОКПП</lable>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  v-model="user.fullname"
                  v-validate="{required: false}"
                  type="text"
                  class="form-control"
                  name="fullname"
                />
                <div v-if="submitted && errors.has('fullname')" class="alert-danger">
                  {{errors.first('fullname')}}
                </div>
              </td>
              <td>
                <input
                  v-model="user.login"
                  v-validate="'email|max:50'"
                  type="email"
                  class="form-control"
                  name="email"
                />
                <div v-if="submitted && errors.has('login')" class="alert-danger">
                  {{errors.first('login')}}
                </div>
              </td>
              <td>
                <input
                  v-model="user.rntrc"
                  v-validate="'length:10'"
                  type="number"
                  class="form-control"
                  name="rntrc"
                />
                <div v-if="submitted && errors.has('rntrc')" class="alert-danger">
                  {{errors.first('rntrc')}}
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <table width="100%" cellpadding="5">
            <tbody>
            <!-- numbers and series -->
            <tr>
              <td width="50%">
                <lable for="passport series">Серія паспорту (за наявності)</lable>
              </td>
              <td width="50%">
                <lable for="passport number">Номер паспорту</lable>
              </td>
            </tr>
            <tr>
              <td class="td-width">
                <input
                  v-model="user.passportSeries"
                  v-validate="{ length: 2, alpha: true, regex: /ЕС|АР|АА|АВ|АТ|АС|АЮ|АЕ|АК|АМ|АО|АН|ВА|ВВ|ВЕ|ВН|ВС|ВТ|СЕ|СС|ВО|СА|СВ|СЮ|МЕ|СИ|СН|СО|ТТ|СК|СМ|СТ|ЕА|ЕМ|ЕН|КА|КВ|ЕО|ЕР|КЕ|КК|КМ|КН|СР|МЮ|МА|МС|КС|МК|МН|МО|НА|НЕ|НС|НК|КР/ }"
                  type="text"
                  class="form-control"
                  name="passport series"
                />
                <div v-if="submitted && errors.has('passport series')" class="alert-danger">
                  {{errors.first('passport series')}}
                </div>
              </td>
              <td>
                <input
                  v-model="user.passportNumber"
                  v-validate="{ required: false, length: isBookNum(), regex: isBookRegex() }"
                  type="number"
                  class="form-control"
                  name="passport number"
                />
                <div v-if="submitted && errors.has('passport number')" class="alert-danger">
                  {{errors.first('passport number')}}
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
import User from '../../models/user';

export default {
  name: 'UserFind',
  data() {
    return {
      user: new User('', '', '', '', '', '', '', '', '', '', ''),
      submitted: false,
      successful: false,
      message: '',
      access: false,
    };
  },
  mounted() {
    this.user.fullname = 'Ааа Ббб Ввв';
    this.user.login = 'aqws@cc.oo';
    this.user.passportNumber = '145236987';
    this.user.rntrc = '4785124369';
    // this.user.passportSeries = 'ЕС';
    const local = JSON.parse(localStorage.getItem('user'));
    this.access = local.rights.some((el) => el === 'RIGHT_ADMIN');
  },
  methods: {
    async handleRegister() {
      // alert(JSON.stringify(this.user));
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
      if (isValid) {
        // alert(JSON.stringify(this.user));
        this.$store.dispatch('user/findUserInDb', this.user).then(
          data => {
            // alert(JSON.stringify(data))
            this.message = data.data;
            if (this.message === null) {
              this.successful = false;
              alert('Користувача не знайдено')
            } else {
              this.successful = true;
              // alert(JSON.stringify(this.message))
              this.$router.push({ path: `/user/${data.data.id}` })
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
    isBookNum() {
      if (this.user.passportSeries) {
        return 6;
      }
      return 9;
    },
    isBookRegex() {
      if (this.user.passportSeries) {
        return /[0-9]{6}/;
      }
      return /[0-9]{9}/;
    },
  }
};
</script>

<style scoped>
</style>