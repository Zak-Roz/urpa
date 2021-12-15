<template>
  <div class="col-md-12">
    <div class="">
      <form style="margin: 50px 0 0 0; padding: 0 15%" class="needs-validation" novalidate name="form" @submit.prevent="handleRegister">
        <div v-if="!successful && access">
          <!-- code&name -->
          <table width="100%" cellpadding="5">
            <tbody>
            <!-- Довіритель -->
            <tr>
              <td width="50%">
                <select @change="checkPrincipal($event)" class="form-control form-control-sm" for="principal_name" style="margin: 0 0 7px 0">
                  <option value="FullP">ПІБ (для фіз. осіб) довірителя</option>
                  <option value="UrP">Найменування (для юр. осіб) довірителя</option>
                </select>
              </td>
              <td>
                <lable for="principal_code">{{this.codePrincipal}}</lable>
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
                />
                <div v-if="submitted && errors.has('principal_code')" class="alert-danger">
                  {{errors.first('principal_code')}}
                </div>
              </td>
            </tr>
            <!-- Довірююча особа -->
            <tr>
              <td>
                <select @change="checkConfident($event)" class="form-control form-control-sm" for="confident_name" style="margin: 0 0 7px 0">
                  <option value="FullC">ПІБ (для фіз. осіб) довіреної особи</option>
                  <option value="UrC">Найменування (для юр. осіб) довіреної особи</option>
                </select>
              </td>
              <td>
                <label for="confident_code">{{this.codeConfident}}</label>
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
                />
                <div v-if="submitted && errors.has('confident_code')" class="alert-danger">
                  {{errors.first('confident_code')}}
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <!-- dates&numbers and series -->
          <table width="100%" cellpadding="5">
            <tbody>
            <!-- dates -->
            <tr>
              <td width="50%">
                <lable for="certification_date">Дата посвідчення</lable>
              </td>
              <!-- <td width="33%">
                <lable for="registration_date">Дата реєстрації</lable>
              </td> -->
              <td width="50%">
                <lable for="expiry_date">Термін дії</lable>
              </td>
            </tr>
            <tr>
              <td>
                <!-- |date_format:yyyy-MM-dd|date_between:1991-08-24,${this.dateNow} -->
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
              <!-- <td>
                <input
                  v-model="poa.registration_date"
                  v-validate="'required'"
                  type="date"
                  class="form-control"
                  name="registration_date"
                />
                <div v-if="submitted && errors.has('registration_date')" class="alert-danger">
                  {{errors.first('registration_date')}}
                </div>
              </td> -->
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
            <tr>
              <td width="50%">
                <lable for="blank_series">Серія</lable>
              </td>
              <td width="50%">
                <lable for="blank_number">Номер</lable>
              </td>
              <!-- <td width="33%">
                <lable for="register_number">Номер в реєстрі</lable>
              </td> -->
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
              <!-- <td>
                <input
                  v-model="poa.register_number"
                  v-validate="'required'"
                  type="text"
                  class="form-control"
                  name="register_number"
                />
                <div v-if="submitted && errors.has('register_number')" class="alert-danger">
                  {{errors.first('register_number')}}
                </div>
              </td> -->
            </tr>
            </tbody>
          </table>
          <!-- property -->
          <table width="100%" cellpadding="5">
            <tbody>
              <tr>
                <td>
                  <textarea style="height: pe"
                  v-model="poa.property"
                  v-validate="'required'"
                  type="text"
                  class="form-control"
                  name="property" 
                  placeholder="Автомобіль 'Suzuki Lancer 3' тип автомобіля: легоквий, номер державної реєстрації: АА1234ВВ, серійний номер: 1HGBH41JXMN109186" 
                  rows="3"></textarea>
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
                  <button class="btn btn-secondary" style="margin: 0 15px" type="reset">Очистити</button>
                  <button class="btn btn-success" type="submit">Створити форму</button>
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
      <!-- <div style="padding: 0 42%" v-if="message && successful">
        <button class="btn btn-primary btn-block" @click="message='';successful=false">Перейти на довіреність</button>
      </div> -->
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
import Poa from '../../models/poa';
// import Work from '../models/workplace';
// import Modal from '@/views/md';

export default {
  // components: {
  //   Modal,
  // },
  name: 'NewPoa',
  data() {
    return {
      access: false,
      poa: new Poa('', '', '', '', '', '', '', '', '', '', '', ''),
      codePrincipal: 'РНОКПП довірителя',
      codeConfident: 'РНОКПП довіреної особи',
      // work: new Work('', ''),
      submitted: false,
      successful: false,
      message: '',
      currentMonth: (new Date().getMonth() + 1) < 10 ? `0${(new Date().getMonth() + 1)}` : `${(new Date().getMonth() + 1)}`,
      currentDay: new Date().getDate() < 10 ? `0${(new Date().getDate())}` : `${(new Date().getDate())}`,
      currentYear: new Date().getFullYear(),
      dateNow: '',
      // showModal: false,
      // fullname: 'asdasd',
      // rights: ["admin", "moderator", "user"],
      // works: [],
    };
  },
  computed: {
    // loggedIn() {
    //   return this.$store.state.auth.status.loggedIn;
    // }
  },
  async mounted() {
    this.dateNow = `${this.currentYear}-${this.currentMonth}-${this.currentDay}`;
    // alert(this.dateNow);
    // if (this.loggedIn) {
    //   this.$router.push('/profile');
    // }
    this.poa.confident_code = 1112223334;
    this.poa.confident_name = 'Ааа Ббб Ввв';
    this.poa.principal_code = 1112223324;
    this.poa.principal_name = 'Ввв Ббб Ааа';
    this.poa.expiry_date = '2025-10-21';
    this.poa.certification_date = '2015-10-21';
    this.poa.blank_number = '111222';
    this.poa.blank_series = 'ААА';
    this.poa.property = 'Тут має бути текс під інпутом';
    const local = JSON.parse(localStorage.getItem('user'));
    this.access = local.rights.some((el) => el === 'RIGHT_MODERATOR');
    // this.uploadWorkSelect()
    // this.works = (await this.$store.dispatch('work/getAll')).data;
// eslint-disable-next-line no-debugger
    // debugger;
  },
  methods: {
    handleRegister() {
      // alert(this.poa.certification_date)
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          // alert(JSON.stringify(this.poa));
          this.$store.dispatch('poa/new', this.poa).then(
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
//     reloadPage() {
//       window.location.reload();
//     },
//     async uploadWorkSelect() {
//         this.works = (await this.$store.dispatch('work/getAll')).data;
// // eslint-disable-next-line no-debugger
//       // debugger;
//     },
//     isBookNum() {
//       if (this.user.passportSeries) {
//         return 6;
//       }
//       return 9;
//     },
//     isBookRegex() {
//       if (this.user.passportSeries) {
//         return /[0-9]{6}/;
//       }
//       return /[0-9]{9}/;
//     },
//     isBookNumAuthority() {
//       if (this.user.passportSeries) {
//         return 70;
//       }
//       return 4;
//     },
    isLegalOrIndividualP() {
      // alert(this.codePrincipal)
      if (this.codePrincipal === 'Код ЄДРПОУ довірителя') {
        return 8;
      }
      return 10;
    },
    isLegalOrIndividualC() {
      if (this.codeConfident === 'Код ЄДРПОУ довіреної особи') {
        return 8;
      }
      return 10;
    },
    checkPrincipal(event) {
      if (event.target.value === 'UrP') {
        this.codePrincipal = 'Код ЄДРПОУ довірителя';
      }
      if (event.target.value === 'FullP') {
        this.codePrincipal = 'РНОКПП довірителя';
      }
    },
    checkConfident(event) {
      if (event.target.value === 'UrC') {
        this.codeConfident = 'Код ЄДРПОУ довіреної особи';
      }
      if (event.target.value === 'FullC') {
        this.codeConfident = 'РНОКПП довіреної особи';
      }
    },
  }
};
</script>

<style scoped>
/* label {
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
} */
</style>