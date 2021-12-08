<template>
  <div class="container">
    <h1>Потрібна допомога? Напишіть нам!</h1>
    <form @submit.prevent="handleEmail" method="POST">
      <label for="email">Ваша електронна пошта</label>
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
     <label for="subject">Коротко опишіть, що сталося (Не менше 10 символів)</label>
      <input
        v-model="email_subject"
        v-validate="'required|min:10'"
        type="text"
        class="form-control"
        name="subject" />
        <div
          v-if="errors.has('subject')"
          class="alert alert-danger"
          role="alert"
        >Це поле є обов'язковим!</div>
     <label for="body">Детально опишіть, у чому полягає Ваша проблема (не менше 30 символів)</label>
      <textarea
        v-model="email_body"
        v-validate="'required|min:30'"
        type="text"
        class="form-control"
        name="body" />
        <div
          v-if="errors.has('body')"
          class="alert alert-danger"
          role="alert"
        >Це поле є обов'язковим!</div>
      <button type="submit" @submit.prevent="next" class="btn btn-primary btn-block" >Надіслати листа</button>
    </form>
  </div>
</template>

<script src="https://smtpjs.com/v3/smtp.js" />

<script>

export default {
  name: 'Email',
  data() {
    return {
      email_from: '',
      email_subject: '',
      email_body: '',
    };
  },
  methods: {
    handleEmail () {
      this.$validator.validate().then(isValid => {
        if (isValid) {
          Email.send({
            Host: "smtp.gmail.com",
              //Note: best to replace with environment values or SMTP token.
            Username: "edr.gov.ua@gmail.com",
            Password: "ItIsNewPassw0rdInEDR",
            To: "edr.gov.ua@gmail.com",
            From: this.email_from,
            Subject: this.email_subject,
            Body: this.email_body,
          }).then(
            alert("Лист було успішно надіслано!")
          ).catch(err =>
            alert(`На жаль, виникла помилка: ${err}. Спробуйте, будь ласка, пізніше`)
          )
        }
      })
    },
  },
  mounted() {
    let smtpScript = document.createElement('script');
    smtpScript.setAttribute('src', 'https://smtpjs.com/v3/smtp.js');
    document.head.appendChild(smtpScript);
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

label {
  display: block;
  margin-top: 30px;
  margin-bottom: 10px;
}

button {
  margin-top: 50px;
}
</style>