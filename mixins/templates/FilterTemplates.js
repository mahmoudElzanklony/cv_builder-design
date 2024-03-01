export default {
  name:'FilterTemplates',
  methods:{
    async submitData(){
      let data = new FormData(event.target)
      data.append('empty',true)
      this.current_page = 1;

      if(document.URL.split('user_id=')[1]){
        data.append('user_id',document.URL.split('user_id=')[1])
      }
      data.append('page',this.current_page)

      await this.$store.dispatch('cvs/templates/getTemplatesAction',data);
      this.current_page++;
      if(document.querySelector('.infinite_scroll > div:last-child')) {
        this.lastObserver.observe(document.querySelector('.infinite_scroll > div:last-child'))
      }
    }
  }
}
