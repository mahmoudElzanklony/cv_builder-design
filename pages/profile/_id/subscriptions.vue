<template>
  <section class="current_page profile">
    <div class="container"  >
      <div class="inner_profile">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-12 mb-mobile-20">
            <profile-personal-info-component></profile-personal-info-component>
          </div>
          <div class="col-lg-8 col-md-6 col-12 p-3 mb-mobile-20">
            <h2 class="big mb-4 mt-2">{{ $parent.$attrs.words.profile.my_subscription }}</h2>
            <form class="infinite_scroll_form" @submit.prevent="submitData">
              <input type="hidden" name="user_id" :value="$auth?.user?.id">
              <input type="hidden" name="parent_id" value="not_null">
              <div class="row infinite_scroll" action_path="cvs/templates/getTemplatesAction" v-if="templates.length > 0">
                <div :class="'col-lg-6 col-12 mb-4 el show'" v-for="(i,index) in templates" :key="index">
                  <TemBox :data="i" ></TemBox>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import ProfilePersonalInfoComponent from "../../../components/ProfilePersonalInfoComponent";
import {mapGetters,mapActions} from "vuex";
import TemBox from "../../../components/templates/TemBox.vue";
import animateData from "../../../mixins/Dom/animateData";
import FilterTemplates from "../../../mixins/templates/FilterTemplates";

export default {
  name: "designs",
  components: {TemBox, ProfilePersonalInfoComponent},
  mixins:[animateData,FilterTemplates],
  asyncData({store,app }){
    store.commit('cvs/templates/ChangeStatus',true)
    store.commit('cvs/templates/EmptyData')
    return store.dispatch('cvs/templates/getTemplatesAction',{user_id:app.$auth.user.id,parent_id:'not_null'});
  },
  computed:{
    ...mapGetters({
      'templates':'cvs/templates/getData',
    })
  },
  methods:{
    ...mapActions({

    })
  },
  async mounted() {

    document.querySelectorAll('.infinite_scroll .el').forEach(tem => {
      this.observer.observe(tem)
    })
  },

}
</script>


