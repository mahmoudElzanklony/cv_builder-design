<template>
  <div name="margin" class="mb-3">
    <label class="blue">{{ words.cvs.margin }}</label>
    <div class="row justify-content-between">
      <div class="col-3 mb-2" v-for="direction in ['top','bottom','left','right']">
        <label class="gray">{{ words.cvs[direction] }}</label>
        <div class="d-flex align-items-center justify-content-between" :name="'margin-'+direction">
          <span v-if="false" class="control_val_btn plus"><i class="bi bi-plus-lg"></i></span>
          <input
            @change="$emit('callMarginStyle',direction)"
            class="form-control" :name="input_name" type="number" min="0" reset_val="px">
          <span v-if="false" class="control_val_btn minus"><i class="bi bi-dash"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'MarginStyleCvComponent',
    props:['words','input_name']
  }
</script>

<style scoped lang="scss">

</style>
