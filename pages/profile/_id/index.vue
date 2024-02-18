<template>
  <section class="current_page profile">
      <div class="container"  >
         <div class="inner_profile">
           <div class="row">
             <div class="col-lg-4 col-md-6 col-12 mb-mobile-20">
               <profile-personal-info-component></profile-personal-info-component>
             </div>
             <div class="col-lg-8 col-md-6 col-12 mb-mobile-20">
               <form class="p-2" method="post"
                     enctype="multipart/form-data"
                     @submit.prevent="update_personal_info">
                 <div class="d-flex align-items-center justify-content-between mb-3">
                   <p class="fw-bold shadow-text mb-0">{{ $parent.$attrs.words.profile.page_name }}</p>
                 </div>
                 <div  class="row mb-2">
                   <div class="col-lg-6 col-12 mb-2" v-for="i in $parent.$attrs.words.profile.columns">
                     <div class="form-group position-relative input-icon flex-wrap mb-2">
                       <label>{{ i['value'] }}</label>
                       <input v-if="i['type'] != 'select'"
                              class="form-control" :type="i['type']"
                              :name="i['name']"
                              :value="$auth.$state.user[i['name']]"
                              :placeholder="i.hasOwnProperty('placeholder') ? i['placeholder']:''"
                              :required="i['name'] != 'password'"
                       >
                       <select class="form-control" :name="i['name']"
                               @change="get_cities_inside_country"
                               v-else>
                         <option value="">{{ $parent.$attrs.words.general.select_best_choice }}</option>
                         <option v-for="(val,index) in (i['name'] == 'country_id' ? getCountriesGetter:getCitiesGetter)"
                                 :key="index"
                                 :selected="$auth.$state.user[i['name']] == val['id']"
                                 :value="val['id']">{{ val['name'] }}</option>
                       </select>
                       <p class="alert alert-danger"></p>
                       <span :class="i['icon'].indexOf('eye') > 0 ? 'showPass cursor-pointer':''"><i :class="i['icon']"></i></span>
                     </div>
                   </div>
                   <div class="col-12 mb-2">
                     <div class="file_upload mb-2">
                       <div>
                         <span class="mrl-half">{{ $parent.$attrs.words.profile.upload_personal_image }}</span>
                         <span class="gray"><i class="bi bi-cloud-arrow-up"></i></span>
                         <span class="gray file_name mrl-reverse-15 position-relative" style="top:-3px"></span>
                       </div>
                       <input type="file" selector=".profile_nav > img" class="preview-image" name="image">
                     </div>
                   </div>
                 </div>
                 <input type="submit" class="btn btn-primary w-100 mb-2" :value="$parent.$attrs.words.profile.save">
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

export default {
  name: "candidate",
  components: {ProfilePersonalInfoComponent},
  async fetch({ store }) {
    await store.dispatch('places/countries/getCountriesAction');
  },
  data(){
    return {
      report_data:[],
    }
  },
  computed:{
    ...mapGetters({
      'getCountriesGetter':'places/countries/getCountriesGetter',
      'getCitiesGetter':'places/cities/getCitiesGetter',
      'report':'report/getReportGetter',

    })
  },
  methods:{
    ...mapActions({
      'getCountriesAction':'places/countries/getCountriesAction',
      'get_cities_inside_country':'places/cities/getCitiesInsideCountryAction',
      'update_personal_info':'user/profile/update_personal_data',
      'reportAction':'report/getReportAction',

    })
  },
  mounted() {
    console.log(this.$auth.$state);
    this.get_cities_inside_country(this.$auth.$state.user['country_id']);
    this.reportAction();
  },
  watch:{
    report(new_val){

      for(let item of Object.keys(this.report)){
        this.report_data.push({name:this.words.data_report[item],value:this.report[item]})
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";
.alert-danger{
  display: none;
  font-size: $small;
  width: 100%;
  margin-top: 5px;
}
.input-icon.flex-wrap > span:first-of-type{
  bottom: unset;
  top: 30px;
}
</style>
