<template>
  <v-container
    style="background-color: #f4f4f4"
    class="px-0 py-0"
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
    <div class="d-flex flex-column justify-center align-center w-screen">
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
      v-if="!(isValidNumber && validateOTP)"
        class="mt-6"
        style="border-radius: 20px;"
        width="500"
        height="400"
      >
        <div class="d-flex h-100 flex-column align-center justify-center">
          <span style="font-weight: 600; font-size: 26px;" class="mb-6">Sign In</span>

          <span
          class="mb-6"
            style="font-size: 18px; font-weight: 400; "
            >Don’t have account yet?
            <router-link id="link-login" to="/register">Sign up here</router-link></span
          >
          <div class="mb-6" style="width: 400px">
            <span>Phone Number</span>
            <MazPhoneNumberInput color="primary" size="lg" @update="checkPhoneNumber" ></MazPhoneNumberInput>
          </div>

          <div class="mb-5 mt-2" style="width: 400px">
            <v-btn
              class="py-8"
              :disabled="buttonValidation"
              @click="sendOTP()"
              :loading="loading"
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
      </v-card>

      <v-card
        v-if="validateOTP && isValidNumber"
        class="mt-6"
        style="border-radius: 20px"
        width="500"
        height="800"
      >
        <div class="d-flex h-100 flex-column align-center justify-center">
          <span style="font-weight: 600; font-size: 26px;" class="mb-6">Sign In Verification</span>

          <span
          class="mb-6"
            style="font-size: 18px; font-weight: 400; "
            >Don’t have account yet?
            <router-link id="link-login" to="/register">Sign up here</router-link></span
          >

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
              class="py-8"
              @click="verifyLogin()"
              :loading="loading"
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
      validateOTP: false,
      isValidNumber: false,
      errorDialog: false,
      loading: false,
      QRValue: '',
      isError: false,
      steps: [],
      messages: '',
      form: {
        phone: "",
        otp: "",
      },
    };
  },
  methods: {
    checkPhoneNumber(value) {
      this.form.phone = `${value.countryCallingCode}${value.nationalNumber}`
      this.isValidNumber = value.isValid
    },
    async verifyLogin() {
      this.loading = true;
      const res = await store.verifyLoginUser(this.form);
      if (res.data.status === 'failed') {
        this.isError = true;
        this.errorDialog = true;
        this.messages = res.data.errMessage
        this.loading = false
        setTimeout(() => {
          this.errorDialog = false
        }, 3000)
        return
      }
      this.loading = false
      this.$router.push('/dashboard')
    },
    async sendOTP() {
      this.isError = false;
      this.QRValue = '';
      this.messages = '';
      this.loading = true;
      
      const res = await store.loginUser(this.form);
      if (res.data.status === 'failed') {
        this.isError = true;
        this.errorDialog = true;
        this.messages = res.data.errMessage
        this.loading = false
        setTimeout(() => {
          this.errorDialog = false
        }, 3000)
        return
      }
      this.loading = false

      this.QRValue = res.data.data.otpVerifyLink
      this.steps = res.data.data.veritySteps
      this.form.otp = res.data.data.otp
      this.validateOTP = true;

    },
  },
  computed: {
    buttonValidation() {
      if(!this.isValidNumber) {
        return true
      }

      return false
    }
  },
  mounted() {},
  created() {
    document.title = "Login| MyDividend";
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

.m-phone-number-input__select[data-v-b43ec161] .m-select-input .m-input-wrapper, .m-input.--has-label .m-input-input[data-v-c13c1d46] {
  background-color: #F2F2F2;
}

</style>

