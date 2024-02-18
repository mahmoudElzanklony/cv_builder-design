<template>
  <section class="current_page profile">
    <div class="container">
      <div class="inner_profile">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-12 mb-mobile-20">
            <profile-personal-info-component></profile-personal-info-component>
          </div>
          <div class="col-lg-8 col-md-6 col-12 mb-mobile-20">
            <form class="p-2 filters" @submit.prevent="get_report_data">
              <div class="d-flex align-items-center mb-5">
                <p class="fw-bold shadow-text mb-0">{{ words.page_name }}</p>
              </div>
              <div class="row mb-2">
                <div class="col-lg-6 col-12 mb-2" v-for="i in words.columns">
                    <div class="form-group position-relative input-icon flex-wrap mb-2">
                      <label>{{ i['value'] }}</label>
                      <input v-if="i['type'] != 'select'" class="form-control" :type="i['type']" :name="i['name']">
                      <select class="form-control" :name="i['name']" v-else>
                        <option value="">{{ words.select_best_choice }}</option>
                        <option v-for="val in i['options']" :value="val['name']">{{ val['value'] }}</option>
                      </select>
                      <span v-if="i.hasOwnProperty('icon')"><i :class="i['icon']"></i></span>
                    </div>
                  </div>


              </div>
              <input type="submit" class="btn btn-primary w-100 mb-2" :value="words.filter">
            </form>
            <div class="mx-500 mrl-1" v-if="words['table_columns']">
              <table class="table text-center table-striped table-hover table-bordered sticky-head">
                <thead>
                <tr>
                  <td v-for="i in Object.values(words['table_columns'])">{{ i }}</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(i,index) in orders_data" :key="index">
                  <td>{{ words['payments'][i['payment_type']] }}</td>
                  <td>{{ i['status'] == 1 ? words.complete:words.pending }}</td>
                  <td>{{ i['price'] }}</td>
                  <td>{{ i['package']['name'] }}</td>
                  <td>{{ i['current_points'] }}</td>
                  <td>{{ new Date(i['created_at']).toLocaleString() }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import WordsLang from "../../../mixins/WordsLang";

import ProfilePersonalInfoComponent from "../../../components/ProfilePersonalInfoComponent";
import {mapGetters,mapActions} from 'vuex';
export default {
  name: "reports",
  mixins:[WordsLang],
  asyncData({store,route}){
    return store.dispatch('orders/getOrdersAction');
  },
  components: {ProfilePersonalInfoComponent},
  methods:{
    get_report_data:function (){
       var data = new FormData(event.target);
       return this.$store.dispatch('orders/getOrdersAction',data);
    },
  },
  computed:{
    ...mapGetters({
        'orders_data':'orders/getData'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";


</style>
