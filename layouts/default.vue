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

import WordsLang from "../mixins/WordsLang";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import text_editor from "../mixins/text_editor";
import {mapGetters,mapActions} from 'vuex';
export default {
  name: "default",
  mixins:[text_editor,WordsLang],
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
    })
  },
  mounted() {
    /*if(this.auth_check_getter == null){
       this.validate_user();
    }*/

  },
  components: {NavbarComponent,FooterComponent}
}
</script>

