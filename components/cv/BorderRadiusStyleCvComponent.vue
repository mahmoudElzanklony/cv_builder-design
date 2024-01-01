<template>
  <div name="border_radius" class="mb-3">
    <label class="gray">{{ words.cvs.border_radius }}</label>
    <div class="position-relative input-icon">
      <span><i class="bi bi-caret-down-fill"></i></span>
      <select class="form-control"
              :name="input_name"
              @change="$emit('ApplyBorderRadiusStyle')">
        <option value="">{{ words.general.select_best_choice }}</option>
        <option value="0%">0</option>
        <option v-for="i in 25" :value="i+'px'">{{ i }}px</option>
      </select>
    </div>
  </div>
</template>
<script>
  export default {
    name:'BorderRadiusStyleCvComponent',
    props:['words','input_name']
  }
</script>


<style scoped lang="scss">

</style>
