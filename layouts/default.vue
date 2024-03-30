<template>
  <div>
      <navbar-component  :words="words_data"></navbar-component>
      <nuxt  :words="words_data"/>
      <span class="up"><i class="bi bi-arrow-up"></i></span>
      <loader v-if="loader_status" :color="'#0a58ca'" size="60px"></loader>
      <footer-component :words="words_data"></footer-component>


  </div>
</template>

<script>

import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import {mapGetters,mapActions} from 'vuex';
export default {
  name: "default",
  computed:{
    ...mapGetters({
      'loader_status':'loader/getLoaderGetter',
      'auth_check_getter':'auth/login/get_auth_user_validation',
      'words_data':'words_data_lang/getData'
    })
  },
  methods:{
    ...mapActions({
      'validate_user':'auth/login/validateAuthAction',
      'loginBySerial':'auth/login/loginBySerial'
    }),
    async loginSerial(){
      if(!(localStorage.hasOwnProperty('skillar_name'))){
        localStorage.setItem('skillar_name',window.location.origin)
      }
      if(!(this.$auth.loggedIn)){
        let cookies =document.cookie.split(';')
        for(let cookie of cookies){
          if(cookie.indexOf('loginExternalSite') >= 0){
            let data = JSON.parse(cookie.split('=')[1]);
            if(data.website === 'skillar' && data.user.hasOwnProperty('serial_number')){
              await this.loginBySerial(data.user.serial_number)
            }
            break;
          }
        }


      }
    }
  },
  watch: {
    $route() {
      this.loginSerial();
    }
  },
  mounted() {
    if(document.cookie.split('lang=')[1] === undefined){
      document.cookie = "lang=en;  path=/;";
      localStorage.setItem('lang','en');
    }

    this.loginSerial()
    // check if login from external website

    /*if(this.auth_check_getter == null){
       this.validate_user();
    }*/

  },
  components: {NavbarComponent,FooterComponent}
}
</script>

<style>
@page { size: auto;  margin:0cm; }
@media print {
  body{
    background-image:unset;
  }
  #__layout .up{
    opacity: 0;
  }
  .container{
    max-width: 100%;
    padding: 0px;
  }
  .create-template .simulation .page{
    border: none;
  }
  .current_page{
    margin-top: 0px !important;
  }
  .navbar,footer,.up{
    display: none;
  }
  .simulation{
    >div{
      display: block !important;
    }
  }
}
</style>

