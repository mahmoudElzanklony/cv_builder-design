export default {
  name:'urlSplit',
  data(){
    return {
      id:null,
      ownThisTemplate:true,
      layoutData:{
        name:'',
        category_id:'',
        price:'',
      },
    }
  },
  mounted() {
    // check if url has id
    if(document.URL.indexOf('id') >= 0){
       this.id = document.URL.split('id=')[document.URL.split('id').length - 1]
       if(this.getTemplateInfo){
         console.log(this.$auth.user)
         if(this.getTemplateInfo.user_id != this.$auth.user.id){
           this.ownThisTemplate = false;
         }
       }
    }
    // layout data options
    this.layoutData = {
        name:this.getTemplateInfo?.name,
        category_id:this.getTemplateInfo?.category_id,
        price:this.getTemplateInfo?.price,
    }
  }
}
