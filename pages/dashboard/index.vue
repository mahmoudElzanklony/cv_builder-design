<template>
  <div class="dashboard">
    <div class="content" v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
    <h1 class="text-center fw-bold blue mb-3 mt-3">{{ $parent.$attrs.words.admin.statistics }}</h1>
     <div class="container">
        <div class="row">
          <div class="col" v-for="(i,key) in $parent.$attrs.words.admin.home_data" :key="key">
            <div class="box-content">
              <nuxt-link :to="i['url']">
                <p class="mb-0">
                  <span><i :class="i?.icon"></i></span>
                </p>
                <p class="mb-0">{{ i?.name }}</p>
                <h2 class="mb-0 black">{{ typeof $store.getters[i?.getterPath] === "number" ? $store.getters[i?.getterPath]:$store.getters[i?.getterPath]?.percentage+'%' }}</h2>
              </nuxt-link>
            </div>
          </div>
        </div>
     </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "index",
  layout:"admin",
  async mounted() {
    for(let item of this.$parent.$attrs.words.admin.home_data){
      await this.$store.dispatch(item['actionPath'])
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/variables";
.box-content{
  background: $main_color_white_bk;
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 8px;
}
</style>
