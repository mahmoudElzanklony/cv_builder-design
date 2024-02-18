<template>
  <section class="auth current_page">
    <div class="auth-content" v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
      <div class="container-fluid">
        <div class="row h-100">

          <div class="col-md-5 mb-2">
            <div class="form-data mt-3">
              <form class="p-3"
                    method="post"
                    @submit.prevent="register">
                <div class="social_media_apps_auth">
                  <p class="text-center mb-2 mt-3">{{ $parent.$attrs.words.register.register_with }}</p>
                  <div class="text-center mb-2">
                    <a href="#" class="facebook mrl-1">
                      <span><i class="bi bi-facebook"></i></span>
                    </a>
                    <a href="#" class="google">
                      <span><i class="bi bi-google"></i></span>
                    </a>
                  </div>
                  <p>
                    <span></span>
                    <span>{{ $parent.$attrs.words.register.or }}</span>
                    <span></span>
                  </p>
                </div>
                <div class="form-group mb-2 input-icon flex-wrap">
                  <label>{{ $parent.$attrs.words.register.username }}</label>
                  <input class="form-control" name="username" >
                  <span><i class="bi bi-person"></i></span>
                  <p class="alert alert-danger"></p>
                </div>
                <div class="form-group mb-2 input-icon flex-wrap">
                  <label>{{ $parent.$attrs.words.register.email }}</label>
                  <input class="form-control" name="email" >
                  <span><i class="bi bi-envelope"></i></span>
                  <p class="alert alert-danger"></p>
                </div>
                <div class="form-group mb-3 input-icon flex-wrap">
                  <label>{{ $parent.$attrs.words.register.password }}</label>
                  <input class="form-control" name="password" type="password" >
                  <p class="alert alert-danger"></p>
                  <span><i class="bi bi-eye-slash eye-password"></i></span>
                </div>
                <div class="form-group mb-3 input-icon flex-wrap">
                  <label>{{ $parent.$attrs.words.register.phone }}</label>
                  <input class="form-control" name="phone" type="number" >
                  <p class="alert alert-danger"></p>
                  <span><i class="bi bi-phone"></i></span>
                </div>
                <div class="form-group mb-3 input-icon flex-wrap">
                  <label>{{ $parent.$attrs.words.register.country }}</label>
                  <select class="form-control" name="country_id"
                          required>
                    <option value="">{{ $parent.$attrs.words.register.select_best_choice }}</option>
                    <option  v-for="(i,index) in getCountriesGetter" :key="index" :value="i['id']">{{ i['name'] }}</option>
                  </select>
                  <p class="alert alert-danger"></p>
                  <span><i class="bi bi-arrow-down-short"></i></span>
                </div>
                <div class="form-group mb-3 input-icon flex-wrap" v-if="false">
                  <label>{{ $parent.$attrs.words.register.user_type }}</label>
                  <select class="form-control" name="type" required>
                    <option value="">{{ $parent.$attrs.words.register.select_best_choice }}</option>
                    <option value="client">{{ $parent.$attrs.words.register.client }}</option>
                    <option value="company">{{ $parent.$attrs.words.register.company }}</option>
                  </select>
                  <p class="alert alert-danger"></p>
                  <span><i class="bi bi-arrow-down-short"></i></span>
                </div>
                <div class="form-group mb-3 input-icon flex-wrap">
                  <input class="mrl-half" type="checkbox">
                  <p class="mb-0">
                    <span>{{ $parent.$attrs.words.register.agree_conditions }}</span>
                    <nuxt-link to="#">{{ $parent.$attrs.words.register.privacy_policy }}</nuxt-link>
                    <span>&</span>
                    <nuxt-link to="#">{{ $parent.$attrs.words.register.terms_of_conditions }}</nuxt-link>
                  </p>
                </div>
                <div class="g-recaptcha mb-2"
                        data-sitekey="6Ld2TEclAAAAANpPyGp_2WsRbnOosh29smJPP9uB"
                        data-callback="verify_recaptha"
                        ></div>
                <div class="form-group mb-4">
                  <input class="form-control btn btn-primary"
                         disabled
                         type="submit"
                         :value="$parent.$attrs.words.register.register">
                </div>
                <p v-if="message">{{ message }}</p>

                <p class="mb-2">
                  <span>{{ $parent.$attrs.words.register.you_have_already_account }}</span>
                  <a href="/auth/login">{{ $parent.$attrs.words.register.login }}</a>
                </p>
              </form>
            </div>
          </div>
          <div class="col-md-7 mb-2 mobile-hide auth-bk">
            <div class="info text-center-mobile flex align-items-center justify-content-between">
              <img src="/images/auth/bk.png">
              <div class="text-center">
                <p class="mb-2 mt-3 white">{{ $parent.$attrs.words.register.welcome_friend }}</p>
                <p class="mb-0 white">{{ $parent.$attrs.words.register.couple_clicks }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

</script>

<script>
import {mapGetters,mapActions} from 'vuex';
export default {
  name: "register",
  async fetch({ store }) {
    await store.dispatch('places/countries/getCountriesAction');
  },
  data(){
    return {
      message:null,
    }
  },
  computed:{
    ...mapGetters({
      'getCountriesGetter':'places/countries/getCountriesGetter',
      'getCitiesGetter':'places/cities/getCitiesGetter',
    })
  },
  methods:{
    verify_recaptha() {
      console.log('yes');
      console.log(grecaptcha);
      document.querySelector('input[type="submit"]').removeAttribute('disabled');
      grecaptcha.ready(function() {
        grecaptcha.execute('6Ld2TEclAAAAANpPyGp_2WsRbnOosh29smJPP9uB', {action: 'submit'}).then(function(token) {
          // Add your logic to submit to your backend server here.
          console.log(token)
        });
      });
    },
    ...mapActions({
      'getCountriesAction':'places/countries/getCountriesAction',
      'register':'auth/register/registerAction',
    }),
  },
  components:{
  },
  mounted() {
    var com = this;
    window.verify_recaptha = function (){
      com.verify_recaptha();
    }
  },
  created() {
    console.log(this.$route);
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";
.eye-password{
  color:$red;
  cursor: pointer;
}
.auth{
  height: 900px;
  .alert-danger{
    display: none;
  }
  input[type="checkbox"]{
    width: 18px;
    height: 18px;
  }
  input[type="submit"]{

  }
}
.grecaptcha-badge {
  visibility: hidden;
}
</style>
