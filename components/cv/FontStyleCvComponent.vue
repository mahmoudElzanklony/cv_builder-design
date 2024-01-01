
<template>
  <div name="font_style" class="mb-3">
    <label class="gray">{{ words.cvs.font_style }}</label>
    <div class="row justify-content-between">
      <div class="col-6">
        <div class="position-relative input-icon">
          <span><i class="bi bi-caret-down-fill"></i></span>
          <select class="form-control"
                  :name="font_style_name"
                  @change="$emit('callFontStyle')"
                  >
            <option value="">{{ words.cvs.select_font_family }}</option>
            <option v-for="i in fonts" :value="i">{{ i }}</option>
          </select>
        </div>
      </div>
      <div class="col-6">
        <div class="position-relative input-icon">
          <span><i class="bi bi-caret-down-fill"></i></span>
          <select class="form-control"
                  :name="font_size_name"
                  @change="$emit('callFontSizeStyle')">
            <option value="">{{ words.cvs.select_font_size }}</option>
            <option
              v-for="i in 24" :key="i" :value="((i*2) + 8 )+'px'">{{ (i*2) + 8 }} {{ words.cvs.px }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
  export default {
    name:'FontStyleCvComponent',
    props:['words','fonts','font_style_name','font_size_name']
  }
</script>


<style scoped lang="scss">

</style>
