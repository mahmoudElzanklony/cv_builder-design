<template>
  <div name="margin" class="mb-3">
    <label class="gray">{{ words.cvs.margin }}</label>
    <div class="row justify-content-between">
      <div class="col-6 mb-2" v-for="direction in ['top','bottom','left','right']">
        <label class="gray">{{ words.cvs[direction] }}</label>
        <div class="position-relative input-icon">
          <span><i class="bi bi-caret-down-fill"></i></span>
          <select class="form-control"
                  :name="input_name+'['+direction+']'"
                  @change="$emit('callMarginStyle',direction)"
                  >
            <option value="">{{ words.general.select_best_choice }}</option>
            <option value="0%">0%</option>
            <option v-for="i in 20" :value="(i * 10 / 2)+'%'">{{ i * 10 / 2 }}%</option>
          </select>
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
