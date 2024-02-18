<template>
  <div :name="label?? 'color'" class="mb-3">

    <div class="row justify-content-between">
      <div class="col-9">
        <label class="blue">{{ words.cvs[label?.replace('-','_')] ?? words.cvs.font_color }}</label>
        <div class="d-flex justify-content-between flex-wrap" >
          <!--                          @change="removeActiveInput('.custom_color','custom')"-->
          <input v-for="(color,key) in colors" :key="key"
                 property="color"
                 :name="font_color_name"
                 @change="$emit('callFontColorStyle')"
                 class="color_radio" type="radio"
                 :style="'background-color:'+color"
                 :value="color">
        </div>
      </div>
      <div class="col-3">
        <label class="blue">{{ words.cvs.custom_color }}</label>
        <input type="color"
               :name="font_color_name"
               @change="$emit('callFontColorStyle')"
               class="color_radio custom_color" >
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name:'FontColorCvComponent',
  props:['words','colors','font_color_name','label']
}

</script>


<style scoped lang="scss">

</style>
