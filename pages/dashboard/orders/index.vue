<template>
  <div class="dashboard">
    <div class="content" v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">

    <h1 class="text-center fw-bold blue mb-3 mt-3">{{ $parent.$attrs.words.admin.orders.title }}</h1>
    <div class="container">
      <form method="post" @submit.prevent="search">
        <div class="row" v-if="$parent.$attrs.words.admin.orders.filters">
          <div class="col-lg-4 col-md-6 mb-2" v-for="i in $parent.$attrs.words.admin.orders.filters">
            <div>
              <label>{{ i['name'] }}</label>
              <input class="form-control mb-2" :name="i['input']" :type="i['type']" >
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mb-2">
             <input type="submit" class="btn btn-primary w-100 position-relative top-3 mt-4" :value="$parent.$attrs.words.admin.orders.search">
          </div>

        </div>
      </form>
      <div class="users_data mt-4" v-if="$parent.$attrs.words.admin.orders.table">
        <div class="container">
          <div class="infinite_scroll" action_path="dashboard/orders/allDataAdminAction">
             <table class="table table-hover table-bordered table-striped">
               <thead>
                  <tr>
                    <td v-for="(name,index) in Object.values($parent.$attrs.words.admin.orders.table)" :key="index">{{ name }}</td>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="(i,index) in orders" :key="index" :class="'tr_'+index">
                    <td>{{ i?.user?.username }}</td>
                    <td>{{ i?.template?.name }}</td>
                    <td>{{ i?.price }}</td>
                    <td>{{ (i?.price * i?.service_profit / 100 ).toFixed() }}</td>
                    <td>{{ (i?.price - ( i?.price * i?.service_profit / 100 )).toFixed() }}</td>
                    <td>{{ i?.created_at }}</td>
                  </tr>
               </tbody>
               <tfoot>
                <tr>
                  <td colspan="2">Total</td>
                  <td>{{ total_price }}</td>
                  <td>{{ total_profit_admin }}</td>
                  <td>{{ total_price - total_profit_admin }}</td>
                </tr>
               </tfoot>
             </table>
          </div>
        </div>
      </div>


    </div>
    </div>
  </div>
</template>

<script>
import InfiniteScroll from "../../../mixins/InfiniteScroll";
import UpdateItem from "../../../mixins/UpdateItem";
import delete_item from "../../../mixins/delete_item";
import {mapGetters , mapActions} from 'vuex';
export default {
  name: "orders",
  layout:"admin",
  mixins:[InfiniteScroll,UpdateItem,delete_item],
  methods:{
    ...mapActions({
      'all_orders':'orders/allDataAdminAction',
    }),
    search:function (){
      var data  = new FormData(event.target);
      data.append('empty',true);
      this.all_orders(data)
    },
  },
  mounted() {
    var data = new FormData();
    data.append('empty',true);
    this.all_orders(data);
  },
  computed:{
    ...mapGetters({
      'orders':'orders/getData'
    }),
    total_price(){
      return this.orders.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price;
      }, 0);
    },
    total_profit_admin(){
      return this.orders.reduce((accumulator, currentValue) => {
        return accumulator + ((currentValue?.price * currentValue?.service_profit / 100 ).toFixed());
      }, 0);
    }
  },
  data(){
    return {
      dashboard_name:this.$route.path.split('/')[this.$route.path.split('/').length - 1]
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/variables";

</style>
