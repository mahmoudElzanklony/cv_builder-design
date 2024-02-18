export default {
  name:'filterInputNumber',
  methods:{
    number_validation(min = 0 , max = 0){
      var input = event.target;
      console.log(input.value)
      if(input.value < min){
        input.value = min;
        return Toast.fire({
          icon:'error',
          title:this.$parent.$attrs.words.filters.min_input+' '+min
        });
      }else if(input.value > max){
        input.value = max;
        return Toast.fire({
          icon:'error',
          title:this.$parent.$attrs.words.filters.max_input+' '+max
        });
      }
    }
  }
}
