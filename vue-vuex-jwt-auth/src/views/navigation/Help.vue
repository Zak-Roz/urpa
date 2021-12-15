<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 align="center" class="mt-5">Служба підтримки</h1>
        <form @submit.prevent="handleEmail" method="POST" class="text-center">
          <label for="email" class="mt-3 mb-2">Ваша електронна пошта</label>
          <input
            v-model="email_from"
            v-validate="'required|email|max:50'"
            type="email"
            class="form-control"
            name="email" />
            <div
              v-if="errors.has('email')"
              class="alert alert-danger"
              role="alert"
            >Електронна пошта є обов'язковою!</div>
        <label for="subject" class="mt-3 mb-2">Оберіть категорію проблеми</label>
          <v-select 
            v-model="email_subject"
            v-validate="'required'"
            name="subject"
            :options="subjects"
            label="subject"
          ></v-select>
            <div
              v-if="errors.has('subject')"
              class="alert alert-danger"
              role="alert"
            >Це поле є обов'язковим!</div>
        <label for="body" class="mt-3 mb-2">Детально опишіть, у чому полягає Ваша проблема (не менше 10 символів)</label>
          <textarea
            v-model="email_body"
            v-validate="'required|min:10'"
            type="text"
            class="form-control"
            name="body" />
            <div
              v-if="errors.has('body')"
              class="alert alert-danger"
              role="alert"
            >Це поле є обов'язковим!</div>
          <div class="col text-center">
            <button type="submit" @submit.prevent="next" class="btn btn-primary mt-5" >Надіслати листа</button>
          </div>
        </form>
      </div>
      <div class="col ml-5">
        <h1 align="center" class="mt-5">Контакти</h1>
        <div class="card border-0" align="center">
          <h5 class="card-title mt-3 mb-2">Адреса</h5>
          <p class="card-text">Вул. Бульварно-Кудрявська, 4, м. Київ, 04053</p>
          <h5 class="card-title mt-3 mb-2">Call-центр</h5>
          <p class="card-text">0-800-508-584</p>
          <h5 class="card-title mt-3 mb-2">Технічна підтримка</h5>
          <a class="card-text" href="mailto:edr.gov.ua@gmail.com">edr.gov.ua@gmail.com</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://smtpjs.com/v3/smtp.js" />

<script>

export default {
  name: 'Help',
  data() {
    return {
      email_from: '',
      email_subject: '',
      email_body: '',
      subjects: ["Проблеми з пошуком довіреності", "Проблеми з редагуванням довіреності",
        "Проблеми зі створенням витягу", "Проблеми з реєстрацією у системі", "Проблеми з авторизацією у системі", "Інше"]
    };
  },
  methods: {
    handleEmail () {
      this.$validator.validate().then(isValid => {
        if (isValid) {
          const bodyToSent = {
            Host: "smtp.gmail.com",
            Username: `${process.env.VUE_APP_EMAIL_NAME}`, 
            Password: `${process.env.VUE_APP_EMAIL_PASSWORD}`,
            To: `${process.env.VUE_APP_EMAIL_NAME}`,
            From: this.email_from,
            Subject: this.email_subject,
            Body: this.email_body,
          }
          Email.send(bodyToSent).then(
            alert("Лист було успішно надіслано!")
          ).catch(err =>
            alert(`На жаль, виникла помилка: ${err}. Спробуйте, будь ласка, пізніше`)
          )
        }
      })
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.email_from = user.login;
    let smtpScript = document.createElement('script');
    smtpScript.setAttribute('src', 'https://smtpjs.com/v3/smtp.js');
    document.head.appendChild(smtpScript);
  }
}
</script>