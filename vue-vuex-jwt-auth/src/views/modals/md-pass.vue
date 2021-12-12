<template name="Modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            Зміна пароля
          </slot>
        </div>

        <div class="modal-body">
          <form name="form" @submit.prevent="handleRegister">
            <div v-if="!successful">
              <!-- Старий пароль -->
              <div class="form-group">
                <label for="organization_name">Старий пароль</label>
                <input
                  v-model="oldPassword"
                  v-validate="'required'"
                  type="password"
                  class="form-control"
                  name="organization_name"
                />
                <div
                  v-if="submitted && errors.has('organization_name')"
                  class="alert-danger"
                >{{errors.first('organization_name')}}</div>
              </div>
              <!-- email -->
              <div class="form-group">
                <label for="password">Пароль</label>
                <input
                  v-model="user.password"
                  v-validate="'required'"
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
                <label for="password_confirmation">Підтвердіть пароль</label>
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
          <button style="margin:15px 0 0 0" class="btn btn-primary btn-block" @click="$emit('close')">
            Закрити
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import User from '../../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', ''),
      submitted: false,
      successful: false,
      message: '',
      showModal: false,
      oldPassword: '',
    };
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('user/update', this.user).then(
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
  width: 445px;
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
</style>