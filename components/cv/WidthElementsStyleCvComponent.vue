<template>
  <div name="width" class="mb-3">
    <label class="blue">{{ words.cvs.width_per_percentage }}</label>
    <div class="row justify-content-between align-item-center" v-if="data_content">
      <div class="col-12 mb-2" v-for="(item,key) in data_content" :key="key">
        <div class="row align-items-end">
          <div class="col-8">
            <label style="font-size: 10px" class="gray" v-if="hide_name != true">{{ item['name'] }}</label>
            <div class="d-flex align-items-center justify-content-between">
<!--              @change="$emit('callWidthStyle',{key:key,value:item})"-->
              <input
                @change="$emit('callWidthStyle',{key:key,value:item})"
                class="form-control dont-exceed-width increaseable" :name="input_name+'['+item['id']+']'" type="number" min="0"  max="100" reset_val="%">

            </div>
          </div>
          <div class="col">
            <button type="button" class="btn btn-outline-primary small increase btn-control"

                    @click="TrigerChange"
                    reset_val="%">

              <span><i class="bi bi-plus-lg"></i></span>
            </button>
            <button type="button" class="btn btn-outline-primary small decrease btn-control"
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
  props:['words','input_name','data_content','hide_name'],
  methods:{
    TrigerChange(){
      var target = $(event.target)
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
    }
  }

}
</script>


<style scoped lang="scss">

</style>
