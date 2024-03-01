<template>
  <section class="current_page profile">
    <div class="container"  >
      <div class="inner_profile">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-12 mb-mobile-20">
            <profile-personal-info-component></profile-personal-info-component>
          </div>
          <div class="col-lg-8 col-md-6 col-12 p-3 mb-mobile-20">
            <h2 class="big mb-4 mt-2">{{ $parent.$attrs.words.profile.my_sales }}</h2>
            <div>
              <orders-table-data></orders-table-data>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import ProfilePersonalInfoComponent from "../../../components/ProfilePersonalInfoComponent";
import TemBox from "../../../components/templates/TemBox.vue";
import animateData from "../../../mixins/Dom/animateData";
import FilterTemplates from "../../../mixins/templates/FilterTemplates";
import OrdersTableData from "../../../components/cv/orders/OrdersTableData.vue";
export default {
  name: "orders",
  components: {TemBox, ProfilePersonalInfoComponent,OrdersTableData},
  mixins:[animateData,FilterTemplates],
  async mounted() {

    document.querySelectorAll('.infinite_scroll .el').forEach(tem => {
      this.observer.observe(tem)
    })
  },

}
</script>


