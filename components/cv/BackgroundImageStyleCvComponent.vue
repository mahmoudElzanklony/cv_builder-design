
<template>
  <div name="background-image" class="mb-3">

    <div class="row justify-content-between">
      <div class="col-12">
        <label class="blue">{{ words.cvs.background_image }}</label>
        <div class="d-flex flex-wrap data-images">
          <div v-for="(i,key) in getData" class="mb-2 mrl-1" :value="$config.url+'/images/'+i['name']"
               @click="$emit('callBackgroundImage')"
               :key="key">
            <image-component :value="$config.url+'/images/'+i['name']" :src="i['name']"></image-component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import {mapGetters} from "vuex";
import ImageComponent from "../ImageComponent.vue";

export default {
  name:'BackgroundImageStyleCvComponent',
  components: {ImageComponent},
  props:['words','background_image_name'],
  mounted() {
    this.$store.dispatch('cvs/layout_shapes/allData')

  },
  computed:{
    ...mapGetters({
      'getData':'cvs/layout_shapes/getData'
    })
  }

}
</script>


<style scoped lang="scss">
.data-images{
  div{
    padding: 5px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    img{
      height: 45px;
      width: 45px;
      object-fit: contain;
    }
  }
}
</style>
