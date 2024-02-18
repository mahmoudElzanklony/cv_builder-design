<template>
  <div name="text-align" class="mb-3">
    <label class="blue">{{ words.cvs.alignment }}</label>
    <div class="row justify-content-between">
      <div class="col" v-for="i in words.cvs.alignments">
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
    name:'AlignmentStyleCvComponent',
    props:['words','input_name']
  }
</script>


<style scoped lang="scss">

</style>
