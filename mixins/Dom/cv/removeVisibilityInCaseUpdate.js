export default {
  name:'removeVisibilityInCaseUpdate',
  mounted(){
    console.log('---------------id----------')
    console.log(this.id)
    if(this.id != null){
      this.$parent.$attrs.words.cvs.layout_inputs.pop()
    }
  }
}
