<template>
  <div name="background-size" class="mb-3">
    <label class="blue">{{ $parent.$parent.$attrs.words.cvs.backaground.repeat_name }}</label>
    <div class="row justify-content-between">
      <div class="col" v-for="i in $parent.$parent.$attrs.words.cvs.backaground.repeat_options">
        <input class="color_radio box_radio w-100" type="radio"
               :name="input_name"
               @change="$emit('callBackgroundRepeatStyle')"
               :value="i['value']" :data-name="i['name']">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'BackgroundRepeatStyle',
  props:['input_name']
}
</script>


<style scoped lang="scss">

</style>
