
<template>
  <table class="table table-bordered table-striped table-hover">
    <thead>
    <tr>
      <td v-for="(i,key) in Object.values($parent.$parent.$attrs.words.orders_data.columns)" :key>{{ i }}</td>
    </tr>
    </thead>
    <tbody>
      <tr v-for="(i,key) in orders" :key="key">
        <td>{{ i?.user?.username }}</td>
        <td>{{ i?.template?.name }}</td>
        <td>{{ i?.price }}</td>
        <td>{{ (i?.price * i?.service_profit / 100 ).toFixed() }}</td>
        <td>{{ (i?.price - ( i?.price * i?.service_profit / 100 )).toFixed() }}</td>
        <td>{{ i?.created_at }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    created() {
      this.$store.dispatch('orders/allData')
    },
    computed:{
       ...mapGetters({
         'orders':'orders/getData'
       })
     }
   }
</script>


<style scoped lang="scss">

</style>
