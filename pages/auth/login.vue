<template>
  <section class="auth current_page">
     <div class="auth-content" v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
       <div class="container-fluid h-100">
         <div class="row h-100">
           <div class="col-md-5 mb-2 mt-4 h-100 d-flex align-items-center">
              <div class="form-data w-100">
                <div class="social_media_apps_auth">
                  <p class="text-center mb-2 mt-3">{{ $parent.$attrs.words.login.register_with }}</p>
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
                    <span>{{ $parent.$attrs.words.login.or }}</span>
                    <span></span>
                  </p>
                </div>
                <form class="p-3" method="post" @submit.prevent="login">
                  <div class="form-group mb-2 input-icon flex-wrap">
                    <label>{{ $parent.$attrs.words.login.email }}</label>
                    <input class="form-control" name="email" required>
                    <span><i class="bi bi-envelope"></i></span>
                  </div>
                  <div class="form-group mb-3 input-icon flex-wrap">
                    <label class="d-flex justify-content-between w-100">
                      <span>{{ $parent.$attrs.words.login.password }}</span>
                      <nuxt-link to="/auth/reset">{{ $parent.$attrs.words.login.forget_password }}</nuxt-link>
                    </label>
                    <input class="form-control" name="password" type="password" required>
                    <span><i class="bi bi-key"></i></span>
                  </div>
                  <div class="form-group mb-4">
                    <input class="form-control btn btn-primary" type="submit" :value="$parent.$attrs.words.login.login">
                  </div>
                  <p class="mb-2">
                    <span>{{ $parent.$attrs.words.login.you_have_not_already_account }}</span>
                    <a href="/auth/register">{{ $parent.$attrs.words.login.register }}</a>
                  </p>
                </form>
              </div>
           </div>
           <div class="col-md-7 mb-2 mobile-hide auth-bk">
             <div class="info text-center-mobile flex align-items-center justify-content-between">
               <img src="/images/auth/bk.png">
               <div class="text-center">
                 <p class="mb-2 mt-3 white">{{ $parent.$attrs.words.login.welcome_friend }}</p>
                 <p class="mb-0 white">{{ $parent.$attrs.words.login.couple_clicks }}</p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
  </section>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: "login",
  methods:{
    ...mapActions({
      'login':'auth/login/loginAction'
    })
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";

</style>
