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
            <label>{{ i['label'] }}</label>
            <input v-if="i['type'] === 'file'"
                   class="form-control"
                   :file_path="inputs_values[i['name']]"
                   @keyup="dynamicContentWrite(i)"
                   @change="dynamicContentWrite(i)"
                   :type="i['type']" :name="'attr['+sec_num+']['+data['id']+']['+i['id']+']'" :placeholder="i['placeholder']">

            <input v-else-if="!(i['type'] === 'selections' || i['type'] === 'textarea')"
                   class="form-control"
                   maxlength="1500"
                   v-model="inputs_values[i['name']]"
                   :data-date="(i['type'] !== 'file' && attr_answers != undefined &&  attr_answers.length > 0 ) ? attr_answers.find((e)=> e['attribute_id'] === i['id'])?.answer:''"
                   @keyup="dynamicContentWrite(i)"
                   @change="dynamicContentWrite(i)"
                   :type="i['type']" :name="'attr['+sec_num+']['+data['id']+']['+i['id']+']'" :placeholder="i['placeholder']">

            <tags-inputs v-else-if="i['type'] === 'selections' "
                         @get_all_tags="handle_tags"
                         :data="inputs_values.hasOwnProperty(i['name']) && inputs_values[i['name']].length > 0 ? inputs_values[i['name']].filter(value => value !== null) : []"
                         :dynamicwriting="true"
                         :name="'attr['+sec_num+']['+data['id']+']['+i['id']+']'"
                         :table="i['selections']['model'].split('\\').slice(-1)[0]" ></tags-inputs>
            <textarea v-else-if="i['type'] === 'textarea'" class="form-control"
                      @keyup="dynamicContentWrite(i)"
                      v-model="inputs_values[i['name']]"
                      maxlength="1500"
                      :name="'attr['+sec_num+']['+data['id']+']['+i['id']+']'" :placeholder="i['placeholder']">{{attr_answers != undefined &&  attr_answers.length > 0 && attr_answers.find((e)=> e['attribute_id'] === i['id']) != null ? attr_answers.find((e)=> e['attribute_id'] === i['id'])?.answer : ''  }}</textarea>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageComponent from "../ImageComponent";
import TagsInputs from "../TagsInputs";
import VmodalDataAttribute from "../../mixins/VmodalDataAttribute";
export default {
  name: "SectionComponent",
  props:['data','from_db','words','attr_answers'],
  mixins:[VmodalDataAttribute],
  data(){
    return {
      elements:[],
      sec_num:0,
    }
  },
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
      var com = this;
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
            com.$parent.styles.splice(com.$parent.sec_num,1);
          }
        }
      })

    },
    dynamicContentWrite(attribute,normal = true){
      var section = $(event.target).parentsUntil('.section').last().parent().parent()
      if(normal){
        // if input is photo so we want to represet it
        let user_value_input = null;
        var section_index = $(section).index();
        var input_number = $(event.target.parentElement.parentElement).index();
        if(attribute['type'] === 'file' && Object.keys(this.inputs_values).length > 0 && this.inputs_values.hasOwnProperty(attribute['name']) && event.target.files.length === 0){
          if(this.inputs_values[attribute['name']] != undefined) {
            var html_content = this.createImage(this.$config.url+'/images/'+this.inputs_values[attribute['name']]);
            user_value_input = this.$config.url+'/images/'+this.inputs_values[attribute['name']]
          }
        }else if(event.target.type === 'file'){
          try {
            var html_content = this.createImage(URL.createObjectURL(event.target.files[0]));
            user_value_input = html_content.src;
          }catch {
            html_content = '';
          }
          var has_file = true;
        }else{
          user_value_input = event.target.value;
          user_value_input = user_value_input.replace(/(?:\r\n|\r|\n)/g, '<br>')
          try{
            var old_style = $('.dynamic-content > div').eq(section_index).find('.body > div > div').eq(input_number).attr('style')

          }catch (e){
            var old_style = $('.dynamic-content > div').eq(section_index).find('.body > div').eq(input_number).attr('style')

          }

          var has_file = false;
          var html_content = '<div style="'+old_style+'">'+(attribute['image'] != null && attribute['image']['name'].length > 0 ? attribute['image']['name']:'')+(attribute['before_answer'].length > 0 ? '<p class="mb-0 fw-bold d-inline-block">'+attribute['before_answer']+'</p><br>':'')+' '+'<span class="'+(attribute['before_answer'].length > 0 ? '':'')+'" >'+user_value_input+'</span>'+'</div>';
        }
        if(!(user_value_input == null || user_value_input == '')) {

          this.auto_writing(section_index, input_number, attribute, html_content, has_file)
        }
      }
    },
    auto_writing(section_index,input_number,attribute,html_content , getting_file_false = false){
      var item = $('.dynamic-content > div').eq(section_index).find('.body > *').eq(input_number)
      var currentStyle = this.save_old_style(item)

      if(getting_file_false){
        // clear what ever images before
        item.html('')
        item.append(html_content);
      }else{
        item.html(html_content);
      }
      if(currentStyle.length > 0){
        for(let key in Object.keys(currentStyle)){
          if($(item).find(currentStyle[key]['tag'])[0]){
            $(item).find(currentStyle[key]['tag'])[0].setAttribute('style',currentStyle[key]['style'])
          }
        }
      }

    },
    handle_tags(data){
      var attribute = this.data?.attributes[data?.input_number];
      var html_content = '<p class="mb-0 '+(attribute['before_answer'].length > 0 ? 'fw-bold ':'')+'" >'+attribute['before_answer']+'</p><ul>';
      for(let item of data.data){
        html_content+= '<li>'+item.value+'</li>'
      }
      html_content += '</ul>';
      this.auto_writing(data.section_number,data.input_number,this.data?.attributes[data?.input_number],html_content);
      this.$parent.make_pages()
    },
    createImage(url){
      const imageUrl = url
      var user_value_input = document.createElement('img');
      user_value_input.src = imageUrl;
      user_value_input.style.cssText = 'width:120px;height:120px;border-radius:50%;border:1px solid #eee;display:inline-block';
      return user_value_input;
    },
    save_old_style(item){
      let currentStyle = []
      if($(item).find('div')[0]){
        for(let child of $(item).find('div')[0].children){
          currentStyle.push({tag:child.tagName.toLocaleLowerCase(),style:child.getAttribute('style')})
        }
      }else if($(item).find('ul')[0]){
        currentStyle.push({tag:'ul',style:$(item).find('ul')[0].getAttribute('style')})
        currentStyle.push({tag:'p',style:$(item).find('ul').prev()[0].getAttribute('style')})
      }else if($(item).find('img')[0]){
        currentStyle.push({tag:'img',style:$(item).find('img')[0].getAttribute('style')})
      }
      return currentStyle;
    }

  },
  components: {TagsInputs, ImageComponent},
  mounted() {
    this.sec_num = $(this.$el).parent().index()
    if(this.attr_answers != undefined && this.attr_answers.length > 0){
      for(let input of $(this.$el).find('.attributes > div').find('input,textarea')){
        input.dispatchEvent(new Event("keyup"));
      }
    }
  }
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
