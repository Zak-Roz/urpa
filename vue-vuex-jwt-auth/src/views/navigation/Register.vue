<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div v-if="!successful && access">
      <form name="form" @submit.prevent="handleRegister">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
          <!-- fullname -->
          <div class="form-group">
            <label for="fullname">ПІБ</label>
            <input
              v-model="user.fullname"
              v-validate="{required: true, regex: /[А-ЯІЇ]{1}[а-яії]{1,23}\s[А-ЯІЇ]{1}[а-яії]{1,23}\s[А-ЯІЇ]{1}[а-яії]{1,23}/}"
              type="text"
              class="form-control"
              name="fullname"
            />
            <div
              v-if="submitted && errors.has('fullname')"
              class="alert-danger"
            >{{errors.first('fullname')}}</div>
          </div>
          <!-- login -->
          <div class="form-group">
            <label for="email">Електронна пошта</label>
            <input
              v-model="user.login"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
            />
            <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >{{errors.first('email')}}</div>
          </div>
          <!-- Day of birthday -->
          <div class="form-group">
            <label for="day of birthday">Дата народження</label>
            <input
              v-model="user.dob"
              v-validate="'required'"
              type="date"
              class="form-control"
              name="day of birthday"
            />
            <div
              v-if="submitted && errors.has('day of birthday')"
              class="alert-danger"
            >{{errors.first('day of birthday')}}</div>
          </div>
          <!-- organization_name -->
          <div class="form-group">
            <label for="organization_name">Назва установи</label>
            <!-- <input
              v-model="user.organization_name"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="organization_name"
            />
            <v-select 
              :options="rights" 
              label="right"
            ></v-select> -->
            <v-select 
              v-model="user.organization_name"
              v-validate="'required'"
              name="organization_name"
              :options="works" 
              label="organization_name"
            ></v-select>
            <div
              v-if="submitted && errors.has('organization_name')"
              class="alert-danger"
            >{{errors.first('organization_name')}}</div>
            <input type="button" style="margin:15px 0 0 0" class="btn btn-primary btn-block" id="show-modal" @click="showModal = true" value="Добавити нову установу"/>
            <Modal v-if="showModal" @close="showModal = false;uploadWorkSelect()">
              <h3 slot="header">Добавити нову установу</h3>
            </Modal>
            <!-- <button class="button">
              <router-link to="/modal" class="but-link">
                <font-awesome-icon icon="user-plus" />Додати місце роботи
              </router-link>
            </button> -->
          </div>
          <!-- passport series -->
          <div class="form-group">
            <label for="passport series">Серія паспорту (за наявності)</label>
            <input
              v-model="user.passportSeries"
              v-validate="{ length: 2, alpha: true, regex: /ЕС|АР|АА|АВ|АТ|АС|АЮ|АЕ|АК|АМ|АО|АН|ВА|ВВ|ВЕ|ВН|ВС|ВТ|СЕ|СС|ВО|СА|СВ|СЮ|МЕ|СИ|СН|СО|ТТ|СК|СМ|СТ|ЕА|ЕМ|ЕН|КА|КВ|ЕО|ЕР|КЕ|КК|КМ|КН|СР|МЮ|МА|МС|КС|МК|МН|МО|НА|НЕ|НС|НК|КР/ }"
              type="text"
              class="form-control"
              name="passport series"
            />
            <!-- ЕС|АР|АА|АВ|АТ|АС|АЮ|АЕ|АК|АМ|АО|АН|ВА|ВВ|ВЕ|ВН|ВС|ВТ|СЕ|СС|ВО|СА|СВ|СЮ|МЕ|СИ|СН|СО|ТТ|СК|СМ|СТ|ЕА|ЕМ|ЕН|КА|КВ|ЕО|ЕР|КЕ|КК|КМ|КН|СР|МЮ|МА|МС|КС|МК|МН|МО|НА|НЕ|НС|НК|КР -->
            <div
              v-if="submitted && errors.has('passport series')"
              class="alert-danger"
            >{{errors.first('passport series')}}</div>
          </div>
          <!-- passport number -->
          <div class="form-group">
            <label for="passport number">Номер паспорту</label>
            <input
              v-model="user.passportNumber"
              v-validate="{ required: true, length: isBookNum(), regex: isBookRegex() }"
              type="number"
              class="form-control"
              name="passport number"
            />
            <div
              v-if="submitted && errors.has('passport number')"
              class="alert-danger"
            >{{errors.first('passport number')}}</div>
          </div>
          <!-- passport issue date -->
          <div class="form-group">
            <label for="passport issue date">Дата видачі паспорту</label>
            <input
              v-model="user.passportIssueDate"
              v-validate="`required|date_format:yyyy-MM-dd|date_between:1991-08-24,${this.dateNow}`"
              type="date"
              class="form-control"
              name="passport issue date"
            />
            <div
              v-if="submitted && errors.has('passport issue date')"
              class="alert-danger"
            >{{errors.first('passport issue date')}}</div>
          </div>
          <!-- passport authority -->
          <div class="form-group">
            <label for="passport authority">Орган, що видав паспорт</label>
            <input
              v-model="user.passportAuthority"
              v-validate="{ required: true, min: 4, max: isBookNumAuthority(), regex: isBookRegexAuthority() }"
              type="text"
              class="form-control"
              name="passport authority"
            />
            <div
              v-if="submitted && errors.has('passport authority')"
              class="alert-danger"
            >{{errors.first('passport authority')}}</div>
          </div>
          <!-- rntrc -->
          <div class="form-group">
            <label for="rntrc">РНОКПП</label>
            <input
              v-model="user.rntrc"
              v-validate="'required|length:10'"
              type="number"
              class="form-control"
              name="rntrc"
            />
            <div
              v-if="submitted && errors.has('rntrc')"
              class="alert-danger"
            >{{errors.first('rntrc')}}</div>
          </div>
          <!-- rights -->
          <div class="form-group">
            <label for="rights" style="margin: 0 0 15px 0">Рівні доступу</label>
            <div class="form-check form-check-inline" style="margin: 0 0px 0 10px" >
              <input class="checkmark" style="left: 32px" type="checkbox" id="user" v-model="user.rights" value="user">
              <label style="margin: 25px 0 0 0" for="user">Користувач</label>
            </div>
            <div class="form-check form-check-inline" style="margin: 0 0px 0 10px" >
              <input class="checkmark" style="left: 28px" type="checkbox" id="moderator" v-model="user.rights" value="moderator">
              <label for="moderator" style="margin: 25px 0px 0 0" >Реєстратор</label>
            </div>
            <div class="form-check form-check-inline" style="margin: 0 0px 0 10px" >
              <input class="checkmark" style="left: 7px" type="checkbox" id="admin" v-model="user.rights" value="admin">
              <label for="admin" style="margin: 25px 0 0 0" >Адмін</label>
            </div>
            <!-- <input
              v-model="user.rights"
              v-validate="'required|length:10'"
              type="text"
              class="form-control"
              name="rights"
            /> -->
            <div
              v-if="submitted && errors.has('rights')"
              class="alert-danger"
            >{{errors.first('rights')}}</div>
          </div>
          <!-- Password -->
          <!-- <div class="form-group">
            <label for="password">Пароль</label>
            <input
              v-model="user.password"
              v-validate="'required|min:1|max:20'"
              type="password"
              class="form-control"
              name="password"
              placeholder="Введіть пароль"
              ref="password"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >{{errors.first('password')}}</div>
          </div>
          <div class="form-group">
            <label for="password_confirmation">Пароль</label>
            <input
              v-validate="'required|confirmed:password'"
              type="password"
              class="form-control"
              name="password_confirmation"
              placeholder="Ще раз введіть пароль"
              data-vv-as="password"
            />
            <div
              v-if="submitted && errors.has('password_confirmation')"
              class="alert-danger"
            >{{errors.first('password_confirmation')}}</div>
          </div> -->

          <!-- btn Sign Up -->
          <div class="form-group">
            <button type="submit" @submit.prevent="next" class="btn btn-primary btn-block" >Зареєструвати</button>
          </div>
      </form>
      </div>
      <div v-if="!access"
      class="alert"
      style="text-align: center;"
      :class="'alert-danger'"
      >
        Сторінка за даним запитом не доступна

      </div>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
      <div v-if="message && successful">
        <button class="btn btn-primary btn-block" @click="message='';successful=false">Новий користувач системи</button>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../../models/user';
import Work from '../../models/workplace';
import Modal from './../modals/md.vue';

export default {
  components: {
    Modal,
  },
  name: 'Register',
  data() {
    return {
      access: false,
      user: new User('', '', '', '', '', '', '', '', '', '', ''),
      work: new Work('', ''),
      submitted: false,
      successful: false,
      message: '',
      showModal: false,
      currentMonth: (new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : `${(new Date().getMonth() + 1)}`,
      currentDay: new Date().getDate() < 10 ? `0${(new Date().getDate())}` : `${(new Date().getDate())}`,
      currentYear: new Date().getFullYear(),
      dateNow: '',
      // rights: ["admin", "moderator", "user"],
      works: [],
    };
  },
  computed: {
    // loggedIn() {
    //   return this.$store.state.auth.status.loggedIn;
    // }
  },
  async mounted() {
    // if (this.loggedIn) {
    //   this.$router.push('/profile');
    // }
    this.dateNow = `${this.currentYear}-${this.currentMonth}-${this.currentDay}`;
    this.user.rights = [];
    this.user.fullname = 'Ааа Ббб Ввв';
    this.user.dob = '1995-10-21';
    this.user.login = 'aqws@cc.oo';
    this.user.passportNumber = '145236987';
    this.user.passportIssueDate = '2015-10-21';
    this.user.passportAuthority = '1111';
    this.user.organization_name = 'a';
    this.user.rntrc = '4785124369';
    this.uploadWorkSelect()
    const local = JSON.parse(localStorage.getItem('user'));
    this.access = local.rights.some((el) => el === 'RIGHT_ADMIN');
    // this.works = (await this.$store.dispatch('work/getAll')).data;
// eslint-disable-next-line no-debugger
    // debugger;
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          // alert(JSON.stringify(this.user));
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
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
    reloadPage() {
      window.location.reload();
    },
    async uploadWorkSelect() {
        this.works = (await this.$store.dispatch('work/getAll')).data;
// eslint-disable-next-line no-debugger
      // debugger;
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
    isBookNumAuthority() {
      if (this.user.passportSeries) {
        return 70;
      }
      return 4;
    },
    isBookRegexAuthority() {
      if (this.user.passportSeries) {
        return /[А-Яа-я]/;
      }
      return /[0-9]{4}/;
    },
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>