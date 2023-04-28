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
        class="mt-6"
        style="border-radius: 20px"
        width="500"
        height="500"
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
      </v-card>
    </div>
  </v-container>
</template>

<script>
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import { useUserStore } from "../stores/users";
const store = useUserStore();
export default {
  components: {
    MazPhoneNumberInput
  },
  data() {
    return {
      isPwd: true,
      isConfirmPwd: true,
      isValidNumber: false,
      errorDialog: false,
      loading: false,
      isError: false,
      messages: '',
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
        this.$router.push('/login')
        }, 4000)
    }
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

