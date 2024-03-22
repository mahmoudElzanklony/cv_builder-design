<template>
  <section class="auth current_page">
    <div class="auth-content">
      <div class="container-fluid h-100">
        <div class="row h-100">
          <div class="col-md-5 mb-2 mt-3 d-flex align-items-center">
            <div class="form-data w-100">
              <form class="p-3" @submit.prevent="reset">
                <h2 class="mb-4">{{ $parent.$attrs.words.login.forget_password }}</h2>
                <div class="form-group mb-2 input-icon flex-wrap">
                  <label>{{ $parent.$attrs.words.login.email }}</label>
                  <input class="form-control" name="email" required>
                  <span><i class="bi bi-envelope"></i></span>
                </div>
                <div class="form-group mb-4">
                  <input class="form-control btn btn-primary" type="submit" :value="$parent.$attrs.words.general.send">
                </div>
              </form>
            </div>
          </div>
          <div class="col-md-7 mb-2 mobile-hide auth-bk">
            <div class="info text-center-mobile flex align-items-center justify-content-between">
              <img src="/images/auth/bk.png">
              <div class="text-center">
                <p class="mb-2 mt-3 white">{{ $parent.$attrs.words.login.reset_password }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import WordsLang from "../../mixins/WordsLang";
import {mapActions} from "vuex";

export default {
  name: "reset",
  mixins:[WordsLang],
  methods:{
    ...mapActions({
      'reset':'auth/reset/check_email_exists'
    })
  },
  created() {
    console.log(this.$route);
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";

</style>
