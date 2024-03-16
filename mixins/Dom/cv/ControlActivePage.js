export default {
  name:'ControlActivePage',
  mounted(){

  },
  methods:{
    showActivePage(){
      console.log($(event.target).siblings())
      $(event.target).siblings().removeClass('active');
      $(event.target).addClass('active')
      $('.page').hide();
      $('.page').eq($(event.target).index()).show();
    }
  }
}
