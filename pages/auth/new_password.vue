<template>
  <section class="auth current_page">
    <div class="auth-content">
      <div class="container-fluid h-100">
        <div class="row h-100">
          <div class="col-md-5 mb-2 mt-3 d-flex align-items-center">
            <div class="form-data w-100">
              <form class="p-3" @submit.prevent="reset_pass">
                <h2 class="mb-4">{{ $parent.$attrs.words.login.new_password }}</h2>
                <div class="form-group mb-3 input-icon flex-wrap">
                  <label>{{ $parent.$attrs.words.register.password }}</label>
                  <input class="form-control" name="password" type="password" required>
                  <span><i class="bi bi-key"></i></span>
                </div>
                <div class="form-group mb-3 input-icon flex-wrap">
                  <label>{{ $parent.$attrs.words.register.password_confirmation }}</label>
                  <input class="form-control" name="password_confirmation" type="password" required>
                  <span><i class="bi bi-key"></i></span>
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
                <p class="mb-2 mt-3 white">{{ $parent.$attrs.words.login.new_password }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {mapActions} from "vuex";

export default {
  name: "new_password",

  data(){
    return {
      activation_code:'',
    }
  },
  mounted() {
    this.activation_code = document.URL.split('serial_number=')[1];
  },
  async asyncData({route,store,redirect,$axios}){
    if(Object.keys(route.query).length > 0){
      var output = await  $axios.post('user-by-activation-code',{serial_number:route.query.activation_code,id:route.query.id})
      if(output.data.status != 200){
        return redirect('/auth/login');
      }
    }
  },
  methods:{
    methods:{
      ...mapActions({
        'reset_pass':'auth/reset/reset_password'
      })
    },
  },
  created() {
    console.log(this.$route);
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";

</style>
