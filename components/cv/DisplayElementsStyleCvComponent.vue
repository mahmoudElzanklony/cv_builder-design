<template>
  <div name="display" class="mb-3">
    <label class="blue">{{ words.cvs.display }}</label>
    <div class="row">
      <div class="col-4 mb-1" v-for="i in words.cvs.flex_alignment">
        <input class="color_radio box_radio w-100" type="radio"
               :name="input_name"
               @change="$emit('callAlignmentStyle')"
               :value="i['value']" :data-name="i['name']">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'DisplayElementsStyleCvComponent',
    props:['words','input_name']
  }
</script>

<style scoped lang="scss">

</style>
