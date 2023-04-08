<template>
  <v-container
    style="background-color: #f4f4f4"
    class="px-0 py-0 h-screen"
    fluid
  >
    <div class="d-flex flex-column align-center">
      <div class="mt-10">
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
        class="mt-6"
        style="border-radius: 20px"
        width="500"
        height="700"
      >
        <div class="d-flex h-100 flex-column align-center justify-center">
          <span style="font-weight: 600; font-size: 26px;" class="mb-6">Create your account</span>

          <span
          class="mb-6"
            style="font-size: 18px; font-weight: 400; "
            >Already have an account?
            <router-link id="link-login" to="/login">Sign in here</router-link></span
          >

          <div class="mb-6" style="width: 400px">
            <span>Full name</span>
            <div class="d-flex">
              <q-input
                class="mt-2 mr-4"
                v-model="form.firstName"
                filled
                type="text"
                placeholder="Enter first name"
              >
              </q-input>
              <q-input placeholder="Enter last name" class="mt-2" v-model="form.lastName" filled type="text">
              </q-input>
            </div>
          </div>

          <div class="mb-6" style="width: 400px">
            <span>Phone Number</span>
            <div class="mt-2">
            <MazPhoneNumberInput color="primary" size="lg" v-model="form.phoneNumber" @update:model-value="form.phoneNumber" @update="checkPhoneNumber" ></MazPhoneNumberInput>
          </div>
          </div>

          <div class="mb-6" style="width: 400px">
            <span>Password</span>
            <q-input
              class="mt-2"
              v-model="form.password"
              filled
              placeholder="Enter password"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>

          <div class="mb-6" style="width: 400px">
            <span>Confirm Password</span>
            <q-input
              class="mt-2"
              v-model="form.confirmPassword"
              filled
              placeholder="Enter confirm password"
              :type="isConfirmPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isConfirmPwd  ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isConfirmPwd  = !isConfirmPwd "
                />
              </template>
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
                >Create an Account</span
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
export default {
  components: {
    MazPhoneNumberInput
  },
  data() {
    return {
      isPwd: true,
      isConfirmPwd: true,
      isValidNumber: false,
      form: {
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      },
    };
  },
  methods: {
    checkPhoneNumber(value) {
      this.isValidNumber = value.isValid
    },
    createAccount() {
      console.log(this.form.firstName, this.form.lastName, this.form.password, this.form.confirmPassword, this.form.phoneNumber)
    }
  },
  computed: {
    buttonValidation() {
      if(this.form.password === '') {
        return true
      }

      if(this.form.confirmPassword === '') {
        return true
      }

      if(!this.isValidNumber) {
        return true
      }

      if(this.form.firstName=== '' || this.form.lastName=== '') {
        return true
      }

      if(this.form.password !== this.form.confirmPassword) {
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

.m-phone-number-input__select[data-v-b43ec161] .m-select-input .m-input-wrapper, .m-input.--has-label .m-input-input[data-v-c13c1d46] {
  background-color: #F2F2F2;
}

</style>

