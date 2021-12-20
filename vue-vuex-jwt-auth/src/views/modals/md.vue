<template name="Modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            Додати нове місце роботи
          </slot>
          <button class="close" @click="$emit('close')">&times;</button>
        </div>

        <div class="modal-body">
          <!-- <slot name="body"> -->
            <!-- <div class="card card-container"> -->
      
          <form name="form" @submit.prevent="handleRegister">
            <div v-if="!successful">
              <!-- organization_name -->
              <div class="form-group">
                <label for="organization_name">Назва установи</label>
                <input
                  v-model="workplace.organization_name"
                  v-validate="'required|min:3|max:25'"
                  type="text"
                  class="form-control"
                  name="organization_name"
                  placeholder="ТОВ 'ПРИВАТБАНК'"
                />
                <div
                  v-if="submitted && errors.has('organization_name')"
                  class="alert-danger"
                >{{errors.first('organization_name')}}</div>
              </div>
              <!-- email -->
              <div class="form-group">
                <label for="email">Електронна пошта</label>
                <input
                  v-model="workplace.email"
                  v-validate="'required|email|max:50'"
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="privatbank@ukr.net"
                />
                <div
                  v-if="submitted && errors.has('email')"
                  class="alert-danger"
                >{{errors.first('email')}}</div>
              </div>
              <!-- btn Sign Up -->
              <div class="form-group">
                <button class="btn btn-primary btn-block">Створити</button>
              </div>
            </div>
          </form>

          <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >{{message}}</div>
          <div v-if="message && successful">
            <button class="btn btn-primary btn-block" @click="message='';successful=false">Нове місце роботи</button>
          </div>
          <!-- <button style="margin:15px 0 0 0" class="btn btn-primary btn-block" @click="$emit('close')">
            Закрити
          </button> -->
    <!-- </div> -->
          <!-- </slot> -->
        </div>

        <!-- <div class="modal-footer">
          <slot name="footer">
            default footer
            <button class="modal-default-button" @click="$emit('close')">
              OK
            </button>
          </slot>
        </div> -->
      </div>
    </div>
  </div>
</template>


<script>
import Workplace from '../../models/workplace';


export default {
  name: 'Register',
  data() {
    return {
      workplace: new Workplace('', ''),
      submitted: false,
      successful: false,
      message: '',
      showModal: false,
    };
  },
  computed: {
    // loggedIn() {
    //   return this.$store.state.auth.status.loggedIn;
    // }
  },
  mounted() {
    // if (this.loggedIn) {
    //   this.$router.push('/profile');
    // }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('work/new', this.workplace).then(
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
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 350px;
  margin: 0px auto;
  padding: 0px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 0px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.close {
  line-height: 32px;
  color: #5c4084;
}
</style>