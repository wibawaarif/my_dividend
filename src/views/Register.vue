<template>
  <v-container
    style="background-color: #f4f4f4;"
    class="px-0 py-0 h-screen"
    fluid
  >
  <q-dialog v-model="errorDialog" position="top">
      <q-card style="width: 350px">
        <q-card-section>
          <div :class="[isError ? 'text-red' : 'text-green']" class="text-h6 text-bold">{{ isError ? 'Failed' : 'Success' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ messages }}
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="errorDialogLogin" position="top">
      <q-card style="width: 350px">
        <q-card-section>
          <div :class="[isErrorLogin ? 'text-red' : 'text-green']" class="text-h6 text-bold">{{ isErrorLogin ? 'Failed' : 'Success' }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ messagesLogin }}
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="d-flex flex-column justify-center align-center h-screen w-screen">
      <div>
        <b-btn
          @click="this.$router.push('/')"
          v-ripple="false"
          variant="plain"
          style="cursor: pointer"
          class="d-inline-flex align-center d-none d-xs-flex ml-lg-0 ml-14"
        >
          <v-img src="../assets/brand-logo.svg" width="75" height="45"></v-img>
          <span class="font-weight-medium text-h5">MyDividend</span>
        </b-btn>
      </div>
      <v-card
        class="mt-6 overflow-auto"
        style="border-radius: 20px"
        width="500"
        height="auto"
      >
      <q-tabs
        v-model="tab"
        style="color: #377dff;"
      >
        <q-tab name="signup" label="Sign Up" />
        <q-tab name="signin" label="Sign In" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="signup">
            <div class="d-flex flex-column align-center justify-center mt-4">
          <span style="font-weight: 600; font-size: 26px;" class="mb-6">Create your account</span>

          <div class="mb-6" style="width: 400px">
            <span>Full name</span>
            <div class="d-flex">
              <q-input
                class="mt-2 mr-4"
                v-model="form.firstName"
                outlined 
                color="indigo"
                type="text"
                placeholder="Enter first name"
              >
              </q-input>
              <q-input placeholder="Enter last name" class="mt-2" v-model="form.lastName" outlined color="indigo" type="text">
              </q-input>
            </div>
          </div>
          <div class="mb-6" style="width: 400px">
            <span>Phone Number</span>
            <div class="mt-2">
            <MazPhoneNumberInput color="primary" size="lg" @update="checkPhoneNumber" ></MazPhoneNumberInput>
          </div>
          </div>

          <div class="mb-5 mt-2" style="width: 400px">
            <v-btn
              class="py-8"
              :loading="loading"
              :disabled="buttonValidation"
              @click="createAccount()"
              style="background-color: #377dff; color: white"
              block
            >
              <span
                style="text-transform: none; font-size: 16px; font-weight: 600"
                >Create an Account</span
              >
            </v-btn>
          </div>
        </div>
          </q-tab-panel>

          <q-tab-panel name="signin">
            <div style="height: 373px;" v-if="!(isValidNumberLogin && validateOTP)" class="d-flex flex-column align-center justify-center mt-4">
          <span style="font-weight: 600; font-size: 26px;" class="mb-6">Sign In</span>
          <div class="mb-6" style="width: 400px">
            <span>Phone Number</span>
            <MazPhoneNumberInput color="primary" size="lg" @update="checkPhoneNumberLogin" ></MazPhoneNumberInput>
          </div>

          <div class="mb-5 mt-2" style="width: 400px; height: 200px;">
            <v-btn
              class="py-8 mt-4 mb-8"
              :disabled="buttonValidationLogin"
              @click="sendOTP()"
              :loading="loadingLogin"
              style="background-color: #377dff; color: white"
              block
            >
              <span
                style="text-transform: none; font-size: 16px; font-weight: 600"
                >Sign In</span
              >
            </v-btn>
          </div>
        </div>

        <div v-if="validateOTP && isValidNumberLogin" class="d-flex flex-column align-center justify-center">
          <span style="font-weight: 600; font-size: 26px;" class="mb-6">Sign In Verification</span>

          <qrcode-vue :value="QRValue" size="200" level="H" />
          <span class="text-h6 font-weight-medium mt-2">OR</span>
          <a class="text-h6" target="_blank" rel="noopener noreferrer" :href="QRValue">Whatsapp Web</a>

          <div class="text-center mt-4">
            <li style="list-style-type: none;" :key="step" v-for="step in steps">
              {{ step }}
            </li>

          </div>

          <div class="mb-5" style="width: 400px">
            <v-btn
              class="py-8 mt-4"
              @click="verifyLogin()"
              :loading="loadingLogin"
              style="background-color: #377dff; color: white"
              block
            >
              <span
                style="text-transform: none; font-size: 16px; font-weight: 600"
                >Verify</span
              >
            </v-btn>
          </div>

        </div>
          </q-tab-panel>
        </q-tab-panels>

      </v-card>
    </div>
  </v-container>
</template>

<script>
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import QrcodeVue from 'qrcode.vue'
import { useUserStore } from "../stores/users";
const store = useUserStore();
export default {
  components: {
    MazPhoneNumberInput,
    QrcodeVue,
  },
  data() {
    return {
      isPwd: true,
      isConfirmPwd: true,
      isValidNumber: false,
      errorDialog: false,
      loading: false,
      isError: false,
      tab: 'signup',
      messages: '',
      isPwdLogin: true,
      validateOTP: false,
      isValidNumberLogin: false,
      errorDialogLogin: false,
      loadingLogin: false,
      QRValue: '',
      isErrorLogin: false,
      steps: [],
      messagesLogin: '',
      formLogin: {
        phone: "",
        otp: "",
      },
      form: {
        firstName: "",
        lastName: "",
        phone: "",
      },
    };
  },
  methods: {
    checkPhoneNumber(value) {
      this.form.phone = `${value.countryCallingCode}-${value.nationalNumber}`
      this.isValidNumber = value.isValid
    },
    checkPhoneNumberLogin(value) {
      this.formLogin.phone = `${value.countryCallingCode}${value.nationalNumber}`
      this.isValidNumberLogin = value.isValid
    },
    async createAccount() {
      this.isError = false;
      this.messages = '';
      this.loading = true;
      const res = await store.registerUser(this.form);
      if (res.data.status === 'failed') {
        this.isError = true;
        this.errorDialog = true;
        this.messages = res.data.errMessage
        this.loading = false
        setTimeout(() => {
          this.errorDialog = false
          this.form.phone = ''
        }, 3000)
        return
      }
      this.messages = 'Account Created'
      this.errorDialog = true;
      this.loading = false
      setTimeout(() => {
        this.errorDialog = false
        }, 3000)
      setTimeout(() => {
        this.tab = "signin"
        }, 4000)
    },
    async verifyLogin() {
      this.loadingLogin = true;
      const res = await store.verifyLoginUser(this.formLogin);
      if (res.data.status === 'failed') {
        this.isErrorLogin = true;
        this.errorDialogLogin = true;
        this.messagesLogin = res.data.errMessage
        this.loadingLogin = false
        setTimeout(() => {
          this.errorDialogLogin = false
        }, 3000)
        return
      }
      this.loadingLogin = false
      localStorage.setItem('token', res.data.data.sessionToken)
      this.$router.push('/dashboard')
    },
    async sendOTP() {
      this.isErrorLogin = false;
      this.QRValue = '';
      this.messagesLogin = '';
      this.loadingLogin = true;
      
      const res = await store.loginUser(this.formLogin);
      if (res.data.status === 'failed') {
        this.isErrorLogin = true;
        this.errorDialogLogin = true;
        this.messagesLogin = res.data.errMessage
        this.loadingLogin = false
        setTimeout(() => {
          this.errorDialogLogin = false
        }, 3000)
        return
      }
      this.loadingLogin = false
      this.QRValue = res.data.data.otpVerifyLink
      this.steps = res.data.data.veritySteps
      this.formLogin.otp = res.data.data.otp
      this.validateOTP = true;

    },
  },
  computed: {
    buttonValidation() {
      if(!this.isValidNumber) {
        return true
      }

      if(this.form.firstName=== '' || this.form.lastName=== '') {
        return true
      }

      return false
    },
    buttonValidationLogin() {
      if(!this.isValidNumberLogin) {
        return true
      }

      return false
    }
  },
  mounted() {},
  created() {
    document.title = "Register | MyDividend";
  },
};
</script>

<style>

#link-login {
  text-decoration: none;
}

#link-login:hover {
  text-decoration: underline;
}


</style>

