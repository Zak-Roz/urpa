<template>
  <div class="col-md-12">
    <div class="">
      <form style="margin: 10px 0 0 0; padding: 0 15%" class="needs-validation" novalidate name="form" @submit.prevent="">
        <div v-if="!successful && access">
        <h2 style="text-align: center; margin: 15px 0 10px 0"><b>Редагування користувача</b></h2>
          <!--  -->
          <table width="100%" cellpadding="5">
            <tbody>
            <!-- name&login -->
            <tr>
              <td width="50%">
                <label for="fullname">ПІБ</label>
              </td>
              <td>
                <label for="login">Логін</label>
              </td>
            </tr>
            <tr>
              <td>
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
              </td>
              <td>
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
              </td>
            </tr>
            <!-- name&login -->
            <tr>
              <td width="50%">
                <label for="day of birthday">Дата народження</label>
              </td>
              <td>
                <label for="rntrc">РНОКПП</label>
              </td>
            </tr>
            <tr>
              <td>
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
              </td>
              <td>
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
              </td>
            </tr>
            <!-- passport -->
            <tr>
              <td>
                <label for="passport series">Серія паспорту (за наявності)</label>
              </td>
              <td>
                <label for="passport number">Номер паспорту</label>
              </td>
            </tr>
            <tr>
              <td class="td-width">
                <input
                  v-model="user.passport_serias"
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
              </td>
              <td>
                <input
                  v-model="user.passport_number"
                  v-validate="{ required: true, length: isBookNum(), regex: isBookRegex() }"
                  type="number"
                  class="form-control"
                  name="passport number"
                />
                <div
                  v-if="submitted && errors.has('passport number')"
                  class="alert-danger"
                >{{errors.first('passport number')}}</div>
              </td>
            </tr>
            </tbody>
          </table>
          <!--  -->
          <table width="100%" cellpadding="5">
            <tbody>
            <!-- passport -->
            <tr>
              <td width="50%">
                <label for="passport issue date">Дата видачі паспорту</label>
              </td>
              <td width="50%">
                <label for="passport authority">Орган, що видав паспорт</label>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  v-model="user.passport_issue_date"
                  v-validate="`required|date_format:yyyy-MM-dd|date_between:1991-08-24,${this.dateNow}`"
                  type="date"
                  class="form-control"
                  name="passport issue date"
                />
                <div
                  v-if="submitted && errors.has('passport issue date')"
                  class="alert-danger"
                >{{errors.first('passport issue date')}}</div>
              </td>
              <td>
                <input
                  v-model="user.passport_authority"
                  v-validate="{ required: true, min: 4, max: isBookNumAuthority(), regex: isBookRegexAuthority() }"
                  type="text"
                  class="form-control"
                  name="passport authority"
                />
                <div
                  v-if="submitted && errors.has('passport authority')"
                  class="alert-danger"
                >{{errors.first('passport authority')}}</div>
              </td>
            </tr>
            <!--  -->
            <tr>
              <td width="50%">
                <label for="organization_name">Назва установи</label>
              </td>
              <td width="50%">
                <label for="rights" style="margin: 0 0 15px 0">Рівні доступу</label>
              </td>
            </tr>
            <tr>
              <td class="td-width">
                <v-select 
                  v-model="user.organization_name"
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
              </td>
              <td>
                <div class="form-check form-check-inline" style="margin: 0 0px 0 10px" >
                  <input class="checkmark" @change="onChange($event)" style="left: 32px" type="checkbox" id="user" v-model="isUsr" value="user">
                  <label style="margin: 25px 0 0 0" for="user">Користувач</label>
                </div>
                <div class="form-check form-check-inline" style="margin: 0 0px 0 10px" >
                  <input class="checkmark"  @change="onChange($event)" style="left: 28px" type="checkbox" id="moderator" v-model="isMod" value="moderator">
                  <label for="moderator" style="margin: 25px 0px 0 0" >Реєстратор</label>
                </div>
                <div class="form-check form-check-inline" style="margin: 0 0px 0 10px" >
                  <input class="checkmark"  @change="onChange($event)" style="left: 7px" type="checkbox" id="admin" v-model="isAdm" value="admin">
                  <label for="admin" style="margin: 25px 0 0 0" >Адмін</label>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <!--  -->
          <!-- <table width="100%" cellpadding="5">
            <tbody>
              <tr>
                <td>
                  <label for="organization_name">Назва установи</label>
                </td>
              </tr>
            </tbody>
          </table> -->
          <!-- submit -->
          <table width="100%" cellpadding="5" style="margin-top: 10px">
            <tbody>
              <tr>
                <td style="border-left: 20px solid white; border-right: 20px solid white; color: white; text-align: center;">
                  <button v-if="this.user.status_id === 1 || this.user.status_id === 2" class="btn btn-secondary" style="margin: 0 15px 0 0" type="reset">Очистити</button>
                  <button v-if="this.user.status_id === 1 || this.user.status_id === 2" class="btn btn-danger"  type="submit" @click="unActive" style="margin: 0 15px 0 0">Деактивувати</button>
                  <button v-if="this.user.status_id === 3" class="btn btn-warning"  type="submit" @click="active" style="margin: 0 15px 0 0">Активувати</button>
                  <button v-if="this.user.status_id === 1 || this.user.status_id === 2" class="btn btn-success"  type="submit" @click="handleRegister">Зберегти зміни</button>
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
      <div style="padding: 0 38%" v-if="message && successful">
        <!-- <button class="btn btn-primary btn-block" @click="message='';successful=false">Продовжити редагувати</button> -->
        <button class="btn btn-primary btn-block" @click="$router.push(`/user/${user.id}`)">Повернутися до користувача</button>
      </div>
    </div>
    <div style="padding: 0 30%">
    <div v-if="!access"
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
import User from '../../models/user';
import Work from '../../models/workplace';
import Modal from '../modals/md.vue';

export default {
  components: {
    Modal,
  },
  name: 'UserEdit',
  data() {
    return {
      isUsr: '',
      isMod: '',
      isAdm: '',
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
      works: [],
    };
  },
  async created() {
    try {
      const data = await this.$store.dispatch('user/getById', this.$route.params.id)
      if(data.data.user === null || data.data === null) {
        throw '';
      }
      this.user = data.data.user;
      // this.user.statusId = 0;
      this.$set(this.user, 'organization_name', '')
      this.$set(this.user, 'statusId', '0')
      this.user.rights = data.data.authorities.sort();
      await this.uploadWorkSelect();
      await this.currentWorkSpace();
      this.dateNow = `${this.currentYear}-${this.currentMonth}-${this.currentDay}`;
      const local = JSON.parse(localStorage.getItem('user'));
      this.access = local.rights.some((el) => el === 'RIGHT_ADMIN');
      // alert(JSON.stringify(this.user))
      data.data.authorities.forEach((el) => {
        if(el === 'admin') this.isAdm = 'admin';
        if(el === 'moderator') this.isMod = 'moderator';
        if(el === 'user') this.isUsr = 'user';
      });
    } catch (err) {
      alert('Користувача не знайдено.');
      setTimeout(this.$router.push('/find-user'), 1500);
    }
  },
  methods: {
    onChange(event) {
      const index = this.user.rights.indexOf(event.target.id);
      if (index === -1) {
        this.user.rights.push(event.target.id);
      }
      else {
        this.user.rights.splice(index, 1)
      }
      this.user.rights = this.user.rights.sort();
    },
    unActive() {
      this.message = '';
      this.user.statusId = 3;
      // alert('unActive');
      // alert(JSON.stringify(this.user))
      this.$store.dispatch('user/update', this.user).then(
        data => {
          this.message = data.message;
          this.successful = true;
          setTimeout(() => {window.location.reload();}, 5000)
        },
        error => {
          this.message =
            (error.response && error.response.data && error.response.data.message || error.response.data.reject) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
    active() {
      this.message = '';
      this.user.statusId = 1;
      // alert('active');
      // alert(JSON.stringify(this.user))
      this.$store.dispatch('user/update', this.user).then(
        data => {
          this.message = data.message;
          this.successful = true;
          setTimeout(() => {window.location.reload();}, 5000)
        },
        error => {
          this.message =
            (error.response && error.response.data && error.response.data.message || error.response.data.reject) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.user.organization_name = this.user.organization_name.organization_name || this.user.organization_name;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          // alert('handleRegister');
          this.$store.dispatch('user/update', this.user).then(
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
    reloadPage() {
      window.location.reload();
    },
    async uploadWorkSelect() {
        this.works = (await this.$store.dispatch('work/getAll')).data;
    },
    async currentWorkSpace() {
      // alert('currentWorkSpace')
      this.user.organization_name = (await this.$store.dispatch('work/getById', this.user.workplace_id)).data.organization_name;
      // alert(JSON.stringify(this.user.organization_name))
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