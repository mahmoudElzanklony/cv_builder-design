<template>
  <div name="width" class="mb-3">
    <label class="blue">{{ words.cvs.line_height }}</label>
    <div class="row justify-content-between align-item-center">
      <div class="col-12 mb-2" >
        <div class="row align-items-end">
          <div class="col-8">
            <label style="font-size: 10px" class="gray">{{ words.cvs.px_used }}</label>
            <div class="d-flex align-items-center justify-content-between">
              <input
                @change="$emit('callLineHeightStyle')"
                class="form-control dont-exceed-width increaseable" :name="input_name" type="number" min="0"  max="100" reset_val="px">

            </div>
          </div>
          <div class="col">
            <button type="button" class="btn btn-outline-primary small increase btn-control"

                    @click="TrigerChange"
                    reset_val="px">

              <span><i class="bi bi-plus-lg"></i></span>
            </button>
            <button type="button" class="btn btn-outline-primary small decrease btn-control"
                    @click="TrigerChange"
                    reset_val="px">
              <span><i class="bi bi-dash-lg"></i></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrigerChangeEvent from "../../mixins/TrigerChangeEvent";
export default {
  name:'LineHeightStyleCvComponent',
  props:['words','input_name'],
  mixins:[TrigerChangeEvent]

}
</script>


<style scoped lang="scss">

</style>
