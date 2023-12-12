<template>
  <div class="current_page cvs">
    <div class="container" v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
        <h2 class="text-center big mb-4">{{ $parent.$attrs.words.cvs.main_title }}</h2>
        <div class="row">
          <div class="col-lg-3 col-md-4 col-6">
            <div class="box">
               <nuxt-link to="/cvs/create-template">
                 <img src="/images/cvs/template.png">
                 <p>{{ $parent.$attrs.words.cvs.make_new_template }}</p>
               </nuxt-link>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-6">
            <div class="box">
              <nuxt-link to="#">
                <img src="/images/cvs/template_cv.svg">
                <p>{{ $parent.$attrs.words.cvs.select_from_templates }}</p>
              </nuxt-link>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "index",
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
@import "~style/variables";
.box{
  border: 4px solid white;
  background-color: $main_color_white_bk;
  padding: 10px;
  border-radius: 10px;
  min-height: 285px;
  img{
    height: 150px;
    display: block;
    margin: 10px auto;
  }
  p{
    text-align: center;
    font-weight: bold;
    font-size: $semi_big;
  }
}
</style>
