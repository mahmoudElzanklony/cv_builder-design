<template>
  <div class="current_page checkout">
    <div class="container" v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
      <p class="alert alert-info">
        <span><i class="bi bi-info-circle"></i></span>
        <span>{{ $parent.$attrs.words.checkout.important_text }}</span>
      </p>
      <form name="order_request" method="post"
            enctype="multipart/form-data"
            @submit.prevent="make_new_order">
        <div class="form-group mb-3 d-flex flex-wrap justify-content-between">
          <p class="mb-0">
            <span class="blue position-relative top-2"><i class="bi bi-cash-stack"></i></span>
            <span class="fw-bold shadow-text">{{ $parent.$attrs.words.checkout.wanted_money }}</span>
          </p>
          <span class="fw-bold shadow-text">{{ template_info['price'] }} $</span>
        </div>
        <div class="row">
          <div dynamic_tab_box="true" class="col-12 visa">
            <div class="row align-items-center">
              <div class="col-lg-6 col-12 mb-2">
                <div class="form-group mb-3 input-icon flex-wrap mb-2">
                  <label class="d-flex">
                    <span>{{ $parent.$attrs.words.checkout.card_visa_number }}</span>
                  </label>
                  <input class="form-control map_visa_data" type="number"
                         maxlength="16"
                         oninput="if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                         name="card_number"  pattern="\d{14}"  required>
                  <span><i class="bi bi-credit-card-2-front"></i></span>
                </div>
                <div class="form-group mb-3 input-icon flex-wrap mb-2">
                  <label class="d-flex">
                    <span>{{ $parent.$attrs.words.checkout.placeholder }}</span>
                  </label>
                  <input class="form-control" name="name" value="" v-model="placeholder"  required>
                  <span><i class="bi bi-person-vcard"></i></span>
                </div>
                <div class="form-group mb-3 input-icon flex-wrap mb-2">
                  <label class="d-flex">
                    <span>{{ $parent.$attrs.words.checkout.csv_number }}</span>
                  </label>
                  <input class="form-control" name="csv" type="number" required maxlength="3"
                         oninput="if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  >
                  <span><i class="bi bi-123"></i></span>
                </div>
                <div class="form-group mb-3">
                  <label class="d-flex">
                    <span>{{ $parent.$attrs.words.checkout.expire_date }}</span>
                  </label>
                  <div class="d-flex justify-content-between">
                    <div class="form-group mb-3 input-icon flex-wrap mb-2 w-48">
                      <label class="gray">{{ $parent.$attrs.words.general.select_month }}</label>
                      <select class="form-control" name="month" v-model="month">
                        <option v-for="i in 12" :value="i">{{ i < 10 ? '0'+i:i }}</option>
                      </select>
                      <span><i class="bi bi-arrow-down"></i></span>
                    </div>
                    <div class="form-group mb-3 input-icon flex-wrap mb-2 w-48">
                      <label class="gray">{{ $parent.$attrs.words.general.select_year }}</label>
                      <select class="form-control" name="year" v-model="year">
                        <option v-for="i in 12" :value="2024 + i - 1">{{ 2024 + i - 1 }}</option>
                      </select>
                      <span><i class="bi bi-arrow-down"></i></span>
                    </div>
                  </div>

                </div>
                <recaptcha-component></recaptcha-component>
              </div>
              <div class="col-lg-6 col-12 mb-2">
                <visa-maping-component :placeholder="placeholder" :expire="{year:year,month:month}"></visa-maping-component>
              </div>
            </div>
          </div>

        </div>

        <input type="submit" class="btn btn-outline-primary w-100 mb-2 mt-2" :value="$parent.$attrs.words.checkout.complete_payment">
      </form>
    </div>
  </div>
</template>

<script>
import InputCheckboxComponent from "../components/InputCheckboxComponent";
import VisaMapingComponent from "../components/money/VisaMapingComponent";
import BankFormComponent from "../components/money/BankFormComponent";
import {mapGetters,mapActions} from "vuex";
import RecaptchaComponent from "../components/RecaptchaComponent.vue";
export default {
  name: "checkout",
  async asyncData({store,route,redirect }){
    if(Object.keys(route.query).length > 0) {
      try{
        await store.dispatch('cvs/templates/getTemplateInfoAction',route.query.id)
      }catch (e){
        return redirect('/cvs/templates');
      }
      if(store.getters['cvs/templates/getItem']?.price === 0){
        return redirect('/cvs/templates');
      }
    }else{
      return redirect('/cvs/templates');
    }
  },
  head() {
    return {
      title: 'الدفع | checkout',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'write your payment info to buy this template',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'cv , templates ,payment, build your cv ,الدفع, سيرة ذاتية , انشاء سيرة ذاتية',
        }
      ],

    }
  },
  mounted() {
    var id_check = document.URL.split('?id=')[document.URL.split('?id=').length - 1];
    if(id_check){
      this.cv_id = id_check;
    }else{
       window.URL = '/cvs/templates';
    }
  },
  data(){
    return {
      cv_id:'',
      placeholder:'********',
      month:'00',
      year:'00',
      send_to_people:[
        {
          name:'1',
          value:'010041124',
        },
        {
          name:'2',
          value:'010041124',
        }
      ],
      payments:[
        {name:'visa',class:'bi bi-credit-card-2-front'},
        {name:'mobile',class:'bi bi-phone'},
        {name:'bank',class:'bi bi-bank'},
        {name:'wallet',class:'bi bi-wallet'},
      ],
    }
  },
  computed:{
    ...mapGetters({
      'template_info':'cvs/templates/getItem',
    }),
  },
  methods:{
    ...mapActions({
      'make_order':'orders/make_order',
    }),
    make_new_order(){
       this.make_order(this.cv_id)
    }
  },
  components: {RecaptchaComponent, BankFormComponent, VisaMapingComponent, InputCheckboxComponent},
}
</script>


