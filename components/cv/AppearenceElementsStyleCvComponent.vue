<template>
  <div name="display" class="mb-3">
    <label class="blue">{{ words.cvs.appearance }}</label>
    <div class="row">
      <div class="col-4 mb-1" v-for="i in words.cvs.appearances">
        <input class="color_radio box_radio w-100" type="radio"
               :name="input_name"
               @change="$emit('callAppearanceStyle')"
               :value="i['value']" :data-name="i['name']" >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'AppearanceElementsStyleCvComponent',
  props:['words','input_name']
}
</script>

<style scoped lang="scss">

</style>
