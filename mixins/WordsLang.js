export default {
    name:'WordsLang',
    data(){
      return {
          words:[],
      }
    },
    async created() {
      if (process.client) {
        let com = this;
        let lang = '';
        if(localStorage.getItem('lang') != undefined){
          lang = localStorage.getItem('lang');
        }else{
          lang = 'ar';
        }
        let words = await import('~/lang/'+lang+'/words').then((e)=>{
          com.words = e.default;
        });
      }

    }
}
