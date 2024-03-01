<template>
  <div class="dashboard">
    <div class="content" v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
      <h1 class="text-center fw-bold blue mb-3 mt-3">{{ $parent.$attrs.words.admin.settings_data.title }}</h1>
      <div class="container">
        <form method="post" @submit.prevent="save_profit">
          <div class="row justify-content-between align-items-end">
            <div class="col-9">
              <label>{{ $parent.$attrs.words.admin.settings_data.profit }}%</label>
              <input type="number" class="form-control" name="profit" min="1" required :value="All_profit?.[0]?.percentage">
            </div>
            <div class="col-3">
              <input class="btn btn-success w-100" type="submit" :value="$parent.$attrs.words.general.save">
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions , mapGetters} from "vuex";

export default {
  name: "settings",
  layout:"admin",
  asyncData({store}){
    return store.dispatch('percentages/allData')
  },
  methods:{
    ...mapActions({
      'save_profit':'settings/save_profit'
    })
  },
  computed:{
    ...mapGetters({
      'All_profit':'percentages/getData',
    })
  }

}
</script>

<style lang="scss" scoped>
@import "~assets/scss/variables";

</style>
