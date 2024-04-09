<template>
  <div class="current_page cvs">
    <div class="container" v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
        <h2 class="text-center big mb-4">{{ $parent.$attrs.words.cvs.main_title }}</h2>

        <div class="row">
          <div class="col-lg-3 col-md-4 col-6">
            <div class="box">
               <nuxt-link to="/cvs/save-template">
                 <img src="/images/cvs/template.png">
                 <p>{{ $parent.$attrs.words.cvs.make_new_template }}</p>
               </nuxt-link>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-6">
            <div class="box">
              <nuxt-link to="/cvs/templates">
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

import {ref,reactive} from "vue";

export default {
  setup(){
    const data = ref(0);
    function incresement(){
      data.value++;
    }
    const data1 = ref({message:'hello'})
    const data2 = reactive({message:'hello'})

    return {
      data,
      incresement
    }
  },
  name: "index",
  data(){
    return {
      username:'',
    }
  },
  head() {
    return {
      title: 'أنشي سيرة ذاتية خاصة بك | Make your cv',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'make your best cv by selecting from other templates and edit on it or build from zero your own cv',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'cv , templates , build your cv , سيرة ذاتية , انشاء سيرة ذاتية',
        }
      ],

    }
  },
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
