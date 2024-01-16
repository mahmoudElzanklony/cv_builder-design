export default{
  name:'trigerChangeEvent',
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


