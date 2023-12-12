<template>
  <div class="section">
    <div class="header">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <div class="d-flex align-items-center  mb-2">
          <image-component class="position-relative top-3" v-if="data['image'] != null" :src="data['image']['name']"></image-component>
          <span class="fw-bold normal ms-2">{{ data['name'] }}</span>
        </div>
        <p>
          <span  class="gray cursor-pointer"><i @click="toggleSlide" class="bi bi-chevron-up"></i></span>
          <span  class="gray cursor-pointer" @click="delete_sec(data)"><i class="bi bi-x-lg red"></i></span>
        </p>
      </div>
      <p class="gray small">{{ data['info'] }}</p>
    </div>
    <div class="body">
      <div class="attributes">
        <div class="attribute" v-for="(i,key) in data['attributes']" :key="key">
          <div class="form-group mb-2">
            <label class="gray">{{ i['label'] }}</label>
            <input v-if="!(i['type'] == 'selections' || i['type'] == 'textarea')" class="form-control"
                   @keyup="dynamicContentWrite(i)"
                   :type="i['type']" :name="'attr['+i['id']+'][]'" :placeholder="i['placeholder']">

            <tags-inputs v-else-if="i['type'] == 'selections' " :table="i['selections']['model'].split('\\').slice(-1)[0]" :data="[]"></tags-inputs>
            <textarea v-else-if="i['type'] == 'textarea'" class="form-control"
                      @keyup="dynamicContentWrite(i)"
                      :name="'attr['+i['id']+'][]'" :placeholder="i['placeholder']"></textarea>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageComponent from "../ImageComponent";
import TagsInputs from "../TagsInputs";
export default {
  name: "SectionComponent",
  props:['data','from_db','words'],
  methods:{
    toggleSlide(){
      var target = $(event.target);
      if(target.hasClass('bi-chevron-down')){
        target.removeClass('bi-chevron-down').addClass('bi-chevron-up');
      }else{
        target.removeClass('bi-chevron-up').addClass('bi-chevron-down');
      }
      target.parent().parent().parent().parent().parent().find('.body').slideToggle();
    },
    delete_sec(section){
      Swal.fire({
        title: this.words.are_you_sure_from_delete,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#035397',
        cancelButtonColor: '#aaa',
        confirmButtonText: this.words.confirm,
        cancelButtonText:this.words.close,
      }).then((result) => {
        if (result.isConfirmed) {
          if(this.from_db == true){

          }else{
            this.$store.commit('cvs/sections/removeSessionFromSelectedSessions',section)
          }
        }
      })

    },
    dynamicContentWrite(attribute,normal = true){
      var val = event.target.value;
      var section = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
      if(normal){
         var section_index = $(section).index();
         var input_number = $(event.target.parentElement.parentElement).index();
         $('.dynamic-content > div').eq(section_index).find('.body > p').eq(input_number)
           .html('<span class="gray">'+attribute['before_answer']+'</span>'+' '+'<span class="'+(attribute['before_answer'].length > 0 ? 'fw-bold':'')+'" >'+event.target.value+'</span>');
      }
    }

  },
  components: {TagsInputs, ImageComponent}
}
</script>

<style lang="scss" scoped>
.section{
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
  .header{
    img{
      height: 30px;
    }
  }
}
</style>
