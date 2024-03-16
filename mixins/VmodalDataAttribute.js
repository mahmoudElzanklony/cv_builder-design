
export default {
  name:'VmodelDataAttribute',
  data(){
    return {
      inputs_values:{}
    }
  },
  created() {
    this.inputs_values_fn()
  },
  /*watch:{
    attr_answers(){
      this.inputs_values =  {}
      this.inputs_values_fn()
    }
  },*/
  methods:{
    inputs_values_fn(){
        if(this.attr_answers !== undefined && this.attr_answers.length > 0) {
          for (let attr of this.data['attributes']) {
            if(Object.keys(attr.selections).length > 0){
              let tags = [];
              let result = this.attr_answers.filter((e) => e['attribute_id'] === attr['id'])
              for(let item of result){
                tags.push(JSON.parse(item.selection_table_val))
              }
              //console.log(tags);
              this.inputs_values[attr.name] = tags
            }else{
              let val = this.attr_answers.find((e) => e['attribute_id'] === attr['id'])?.answer
              this.inputs_values[attr.name] = val
            }

          }
      }else{
        for (let attr of this.data['attributes']) {
          this.inputs_values[attr.name] = '';
        }
      }
    }
  }
}
