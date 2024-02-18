<template>
  <section class="current_page profile">
    <div class="container">
      <div class="inner_profile">
        <div class="row">
          <div class="col-lg-4 col-12 mb-mobile-20">
            <profile-personal-info-component></profile-personal-info-component>
          </div>
          <div class="col-lg-8 col-12 mb-mobile-20">
            <form class="p-2">
              <div class="mb-3">
                <p class="fw-bold shadow-text mb-0">{{ words.page_name }}</p>
              </div>
              <div class="row mb-3">
                <div class="col-lg-4 col-12 mb-3" v-for="(type,index) in  payments" :key="index">
                  <input-checkbox-component :icon="type['class']"
                                            input_class="dynamic_tab_input"
                                            input_name="payment_type"
                                            :input_value="type['name']"
                                            :span_value="words[type['name']]">

                  </input-checkbox-component>
                </div>
                <div dynamic_tab_box="true" class="col-12 credit">
                  <div class="row align-items-center">
                    <div class="col-12 mb-2">
                      <div class="form-group mb-3 input-icon flex-wrap mb-2">
                        <label class="d-flex">
                          <span>{{ words.card_visa_number }}</span>
                        </label>
                        <input class="form-control map_visa_data" type="number" name="card_number"  required>
                        <span><i class="bi bi-credit-card-2-front"></i></span>
                      </div>
                      <div class="form-group mb-3 input-icon flex-wrap mb-2">
                        <label class="d-flex">
                          <span>{{ words.placeholder }}</span>
                        </label>
                        <input class="form-control" name="name" value="" v-model="placeholder"  required>
                        <span><i class="bi bi-person-vcard"></i></span>
                      </div>
                      <div class="form-group mb-3 input-icon flex-wrap mb-2">
                        <label class="d-flex">
                          <span>{{ words.csv_number }}</span>
                        </label>
                        <input class="form-control" name="csv" type="number" required>
                        <span><i class="bi bi-123"></i></span>
                      </div>
                      <div class="form-group mb-3 input-icon flex-wrap mb-2">
                        <label class="d-flex">
                          <span>{{ words.expire_date }}</span>
                        </label>
                        <input class="form-control" name="date" type="date" v-model="expire" required>
                      </div>
                    </div>
                    <div class="col-12 mb-2">
                      <visa-maping-component :placeholder="placeholder" :expire="expire"></visa-maping-component>
                    </div>
                  </div>
                </div>
                <div dynamic_tab_box="true" class="col-12 vodafone">
                  <bank-form-component :send_to_people="send_to_people"></bank-form-component>
                  <div class="file_upload mb-2">
                    <div>
                      <span class="mrl-half">{{ words.upload_receipt_image }}</span>
                      <span class="gray"><i class="bi bi-cloud-arrow-up"></i></span>
                    </div>
                    <input type="file" name="image" required>
                  </div>
                </div>
                <div dynamic_tab_box="true" class="col-12 bank_transfer">
                  <bank-form-component :send_to_people="send_to_people"></bank-form-component>
                  <div class="file_upload mb-2">
                    <div>
                      <span class="mrl-half">{{ words.upload_receipt_image }}</span>
                      <span class="gray"><i class="bi bi-cloud-arrow-up"></i></span>
                    </div>
                    <input type="file" name="image" required>
                  </div>
                </div>
              </div>
              <input type="submit" class="btn btn-primary w-100 mb-2" :value="words.save">
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import WordsLang from "../../../mixins/WordsLang";

import ProfilePersonalInfoComponent from "../../../components/ProfilePersonalInfoComponent";
import VisaMapingComponent from "../../../components/money/VisaMapingComponent";
import BankFormComponent from "../../../components/money/BankFormComponent";
export default {
  name: "candidate",
  mixins:[WordsLang],
  components: {VisaMapingComponent, ProfilePersonalInfoComponent,BankFormComponent},
  data(){
    return {
      placeholder:'********',
      expire:'00-00',
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
        {name:'credit',class:'bi bi-credit-card-2-front'},
        {name:'vodafone',class:'bi bi-phone'},
        {name:'bank_transfer',class:'bi bi-bank'},
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";


</style>
