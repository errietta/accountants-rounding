<template>
  <div class="login">
    <info-box
      type="error"
      v-if="error"
      :body="error"
      title="Error"
    />
    <div>
      <form class='form'>
        <p>
          Enter your email and password to retrieve your API key. If you are a new user, a new account will be created.
        </p>
        <label for='email'>
          Email:
        </label>

        <input class='input' id='email' type='email' v-model="email" />
        <label for='password'>
          Password:
        </label>
        <input class='input' id='password' type='password' v-model="password" />

        <input value="submit" :disabled="buttonDisabled" type='button' class='submitBtn' @click="doGetKey" />

        <loading-box v-if="loading" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Infobox from './Infobox';
import Loadingbox from './Loadingbox';

export default {
  name: 'Form',
  components: {
    'info-box': Infobox,
    'loading-box': Loadingbox,
  },
  data() {
    return {
      email: null,
      password: null,
      loading: false,
      error: null,
    }
  },
  computed: {
    buttonDisabled() {
      return !this.email || !this.password;
    }
  },
  methods: {
    async doGetKey() {
      this.error = null;
      const client = axios.create();

      try {
        this.loading = true;

        const response = await client.post(
          'https://api.accountants-rounding.com/api/get-key',
          {
            email: this.email,
            password: this.password
          }
        );

        this.$emit('key-updated', response.data.apiKey);
      } catch (e) {
        this.error = (e.response ? e.response.data.error : 'An error occurred');
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>


.form label {
  font-weight: bold;
}

.input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.submitBtn {
  width: 100%;
  text-transform: uppercase;
  background-color: #3E85C1;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submitBtn:hover {
  background-color: rgb(52, 105, 148);
}

.form {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 80%;
  margin: 10px;
  box-shadow: 2px 2px 5px 1px;
}

.submitBtn:disabled {
  background-color: rgb(148, 155, 161);
  color: #ccc;
}

</style>
