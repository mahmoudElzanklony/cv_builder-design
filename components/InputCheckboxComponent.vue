<template>
  <div :class="'box-check '+(checked == true ? 'active':'')">
    <input :type="input_type != undefined ? input_type:'radio'"
           :checked="checked"
           :class="input_class != undefined ? input_class:''"
           :name="input_name" @change="check_input" :value="input_value">
    <p class="icon mb-0 text-center semi_big" v-if="icon"><span><i :class="'big '+icon"></i></span></p>
    <span :class="icon != undefined ? 'd-block text-center gray icon_txt':'icon_txt'">{{ span_value }}</span>
  </div>
</template>

<script>
export default {
  name: "InputCheckboxComponent",
  props:['input_name','input_value','span_value','input_type','icon','input_class','checked'],
  methods:{
    check_input:function (){
      if(this.input_type == undefined) {
        $(event.target).parent().parent().parent().find('.active').removeClass('active');
        if ($(event.target).is(':checked')) {
          event.target.parentElement.className = 'box-check active';
          $(event.target).parent().find('.icon_txt').removeClass('gray')
        }
      }else{
        if ($(event.target).is(':checked')) {
          event.target.parentElement.className = 'box-check active';
          $(event.target).parent().find('.icon_txt').removeClass('gray')
        }else{
          event.target.parentElement.className = 'box-check';
          $(event.target).parent().find('.icon_txt').addClass('gray')
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~style/variables";
.box-check{
  border: 1px solid #dddddd;
  padding: 12px;
  border-radius: 8px;
  position: relative;
  input{
    position: absolute;
    width: 20px;
    height: 18px;
    top: 6px;
  }
  &.active{
    border-color: $main_color;
    p.semi_big{
      span{
        i{
          color:$main_color;
        }
      }
    }
  }
}
</style>
