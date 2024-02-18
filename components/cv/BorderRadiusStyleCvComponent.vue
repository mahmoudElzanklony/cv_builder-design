<template>
  <div name="border-radius" class="mb-3">
    <label class="blue">{{ words.cvs.border_radius }}</label>
    <div class="row justify-content-between align-item-center">
      <div class="col-12 mb-2" >
        <div class="row align-items-end justify-content-between">
          <div class="col-7">
            <label style="font-size: 10px" class="gray">{{ words.cvs.px_used }}</label>
            <div class="d-flex align-items-center justify-content-between">
              <input
                :name="input_name"
                @change="$emit('ApplyBorderRadiusStyle')"
                class="form-control dont-exceed-width increaseable"  type="number" min="0"  max="100" reset_val="px">

            </div>
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-outline-primary small increase btn-control"
                    v-tooltip="words.cvs.increase"
                    @click="TrigerChange"
                    reset_val="px">

              <span><i class="bi bi-plus-lg"></i></span>
            </button>
            <button type="button"  class="btn btn-outline-primary small btn-control" v-tooltip="words.cvs.reset" @click="resetInput" reset_val="">
              <i class="bi bi-arrow-repeat"></i>
            </button>
            <button type="button" class="btn btn-outline-primary small decrease btn-control"
                    v-tooltip="words.cvs.decrease"
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
    name:'BorderRadiusStyleCvComponent',
    props:['words','input_name','for_icon','rest_val'],
    mixins:[TrigerChangeEvent],
    methods:{
      resetInput(){
        var input = $(event.target.parentElement.parentElement.parentElement).find('input')
        try {
          input.val(0)
          input[0].dispatchEvent(new Event('change'));
        }catch (e){}
      }
    }
  }
</script>


<style scoped lang="scss">

</style>
