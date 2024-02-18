<template>
  <div class="bank_form">
     <div class="row">
        <div :class="(modal_status != true ? 'col-lg-6':'')+' col-12 mb-2'" v-for="(input,index) in $parent.$parent.$attrs.words.inputs" :key="index">
          <div class="form-group mb-3 input-icon flex-wrap">
            <label class="d-flex">
              <span>{{ input['value'] }}</span>
            </label>
            <input class="form-control" v-if="input['type'] != 'select'" :type="input['type']" :name="input['name']"  required>
            <select v-else class="form-control" :name="input['name']">
              <option value="">{{ $parent.$parent.$attrs.words.select_best_choice }}</option>
              <option v-for="(i,index) in input['options']" :key="index" :value="i['name']">{{ i['value'] }}</option>
            </select>
            <span v-if="input.hasOwnProperty('icon')"><i :class="input['icon']"></i></span>
          </div>
        </div>
     </div>
  </div>
</template>

<script>
import WordsLang from "../../mixins/WordsLang";
export default {
  name: "BankFormComponent",
  props:['send_to_people','modal_status'],
  mixins:[WordsLang],
  data(){
    return {
      file_name:'bank_form_money',
    }
  },
  watch:{
    words(new_val){
       this.words['inputs'].find((e)=>{return e['type'] == 'select'})['options'] = this.send_to_people;
    }
  },
}
</script>

<style scoped>

</style>
