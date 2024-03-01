<template>
  <div name="width" class="mb-3">
    <label class="blue">{{ for_icon === true ? words.cvs.resize:words.cvs.width_per_percentage }}</label>
    <div class="row justify-content-between align-item-center" v-if="data_content">
      <div class="col-12 mb-2" v-for="(item,key) in data_content" :key="key">
        <div class="row align-items-end justify-content-between">
          <div class="col-7">
            <label style="font-size: 10px" class="gray" v-if="hide_name != true">{{ item['name'] }}</label>
            <div class="d-flex align-items-center justify-content-between">
<!--              @change="$emit('callWidthStyle',{key:key,value:item})"-->
              <input
                :item_id="for_icon !== true ? item['id']:null"
                @change="$emit('callWidthStyle',{key:key,value:item})"
                class="form-control dont-exceed-width increaseable" :name="input_name+'['+item['id']+']'" type="number" min="0"  max="100" reset_val="%">

            </div>
          </div>
          <div class="col-auto">
            <button v-if="for_icon !== true" type="button" class="btn btn-outline-primary small btn-control auto"
                    v-tooltip="words.cvs.auto_width"
                    value="auto"
                    @click="$emit('callWidthStyle',{key:key,value:item})"
                    >

              <span value="auto"><i value="auto" class="bi bi-arrows-angle-expand"></i></span>
            </button>
            <button type="button" class="btn btn-outline-primary small increase btn-control"
                    v-tooltip="words.cvs.increase"
                    @click="TrigerChange"
                    reset_val="%">

              <span><i class="bi bi-plus-lg"></i></span>
            </button>
            <button type="button" v-if="for_icon" class="btn btn-outline-primary small btn-control" v-tooltip="words.cvs.reset" @click="resetInput" reset_val="%">
              <i class="bi bi-arrow-repeat"></i>
            </button>
            <button type="button" class="btn btn-outline-primary small decrease btn-control"
                    v-tooltip="words.cvs.decrease"
                    @click="TrigerChange"
                    reset_val="%">
              <span><i class="bi bi-dash-lg"></i></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'WidthElementsStyleCvComponent',
  props:['words','input_name','data_content','hide_name','for_icon','rest_val'],
  methods:{
    TrigerChange(){
      var target = $(event.target)
      console.log(target)
      if(event.target.className.indexOf('bi') >= 0){
        target = target.parent()
      }
      var input = target.parent().parent().parent().find('input');
      setTimeout(()=>{
        // Create a new event
        var changeEvent = new Event('change');

        // Trigger the change event
        input[0].dispatchEvent(changeEvent);
      },1000)
    },
    resetInput(){
      var input = $(event.target.parentElement.parentElement.parentElement).find('input')
      try {
        input.val(this.rest_val)
        input[0].dispatchEvent(new Event('change'));
      }catch (e){}
    }
  }

}
</script>


<style scoped lang="scss">

</style>
