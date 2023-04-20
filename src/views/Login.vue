<template>
  <v-container
    style="background-color: #f4f4f4"
    class="px-0 py-0 h-screen"
    fluid
  >
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
          {{ form.Phone }}
          <div class="mb-6" style="width: 400px">
            <span>Phone Number</span>
            <MazPhoneNumberInput color="primary" size="lg" @update="checkPhoneNumber" ></MazPhoneNumberInput>
          </div>

          <div class="mb-5 mt-2" style="width: 400px">
            <v-btn
              class="py-8"
              :disabled="buttonValidation"
              @click="sendOTP()"
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
        height="500"
      >
        <div class="d-flex h-100 flex-column align-center justify-center">
          <span style="font-weight: 600; font-size: 26px;" class="mb-6">Sign In</span>

          <span
          class="mb-6"
            style="font-size: 18px; font-weight: 400; "
            >Don’t have account yet?
            <router-link id="link-login" to="/register">Sign up here</router-link></span
          >

          <span style="font-weight: 600; font-size: 20px;">OTP is sent to {{ form.Phone }}</span>

          <div class="mb-6 mt-6" style="width: 400px">
            <q-input
              class="mt-2 mb-2"
              v-model="form.otp"
              filled
              placeholder="Insert your OTP..."
            >
            </q-input>
          </div>

          <div class="mb-5" style="width: 400px">
            <v-btn
              class="py-8"
              :disabled="buttonValidation"
              @click="createAccount()"
              style="background-color: #377dff; color: white"
              block
            >
              <span
                style="text-transform: none; font-size: 16px; font-weight: 600"
                >Verify</span
              >
            </v-btn>
          </div>

          <span
          class="mb-6"
            style="font-size: 18px; font-weight: 400; "
            >Didn’t receive code?
            <router-link id="link-login" to="/register">Request again</router-link></span
          >

        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
export default {
  components: {
    MazPhoneNumberInput
  },
  data() {
    return {
      isPwd: true,
      validateOTP: false,
      isValidNumber: false,
      form: {
        Phone: "",
      },
    };
  },
  methods: {
    checkPhoneNumber(value) {
      this.form.Phone = `${value.countryCallingCode}${value.nationalNumber}`
      this.isValidNumber = value.isValid
    },
    sendOTP() {
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

