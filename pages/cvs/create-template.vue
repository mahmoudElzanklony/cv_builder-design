<template>
  <div class="current_page create-template">
    <div class="container" >
      <div class="row">
        <div class="col-lg-4 col-md-6 col-12">
          <div class="sections">
            <div class="content">
              <div v-for="(i,index) in selected_sessions_from_popup" :key="index">
                <section-component :words="$parent.$attrs.words.general" :data="i"></section-component>
              </div>
            </div>
            <div class="buttons-control d-flex align-items-center justify-content-between">
              <button class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#pop_up_sections">
                <span class="white"><i class="bi bi-plus"></i></span>
                <span class="white">{{ $parent.$attrs.words.cvs.add_section }}</span>
              </button>
              <button class="btn btn-sky" @click="go_to_edit">
                <span class="white"><i class="bi bi-pencil-square"></i></span>
                <span class="white">{{ $parent.$attrs.words.cvs.edit_template }}</span>
              </button>
            </div>
          </div>
          <div class="style">
            <div class="style-data">
              <div v-for="(i,index) in selected_sessions_from_popup" :key="index" :class="'section p-1 sec_id_'+i['id']" >
              <div class="header mb-2">
                <div class="d-flex align-items-center justify-content-between mb-4">
                  <div class="d-flex align-items-center">
                    <image-component class="position-relative top-3" v-if="i['image'] != null" :src="i['image']['name']"></image-component>
                    <span class="fw-bold normal ms-2">{{ i['name'] }}</span>
                  </div>
                  <span class="gray"><i class="bi bi-chevron-up cursor-pointer toggle_up_down" parents="3" find=".properties-data"></i></span>
                </div>
                <div class="properties-data">
                  <p class="black mb-2 d-flex align-items-center justify-content-between">
                    <span class="fw-bold">{{ $parent.$attrs.words.cvs.title_section }}</span>
                    <span class="gray"><i class="bi bi-chevron-down cursor-pointer toggle_up_down" parents="2" find=".properties"></i></span>
                  </p>
                  <div class="properties hidden">

                    <FontStyleCvComponent
                      :words="$parent.$attrs.words"
                      :fonts="fonts"
                      :font_style_name="'font_style_header[section]['+i['id']+']'"
                      @callFontStyle="applyStyle('.dynamic-content > div',index,'.header > p',i,0,'font_style_header','font-family','section')"
                      :font_size_name="'font_size_header[section]['+i['id']+']'"
                      @callFontSizeStyle="applyStyle('.dynamic-content > div',index,'.header > p',i,0,'font_size_header','font-size','section')"
                    ></FontStyleCvComponent>

                    <FontColorCvComponent
                      :words="$parent.$attrs.words"
                      :colors="colors"
                      :font_color_name="'font_color_header[section]['+i['id']+']'"
                      @callFontColorStyle="applyStyle('.dynamic-content > div',index,'.header > p',i,0 ,'font_color_header','color','section')"
                    ></FontColorCvComponent>

                    <BackgroundColorCvComponent
                      :words="$parent.$attrs.words"
                      :colors="colors"
                      :background_color_name="'background_color_header[section]['+i['id']+']'"
                      @callBackgroundColorStyle="applyStyle('.dynamic-content > div',index,'.header > p',i,0 ,'background_color_header','background-color','section')"
                    ></BackgroundColorCvComponent>

                    <AlignmentStyleCvComponent
                      :words="$parent.$attrs.words"
                      :input_name="'alignment_header[section]['+i['id']+']'"
                      @callAlignmentStyle="applyStyle('.dynamic-content > div',index,'.header > p',i,0 ,'alignment_header','text-align','section')"
                    ></AlignmentStyleCvComponent>

                    <MarginStyleCvComponent
                      :words="$parent.$attrs.words"
                      :input_name="'margin_header[section]['+i['id']+']'"
                      @callMarginStyle="(direction)=>{applyStyle('.dynamic-content > div',index,'.header > p',i,0 ,'margin_header','margin-'+direction,'section')}"
                    ></MarginStyleCvComponent>

                    <PaddingStyleCvComponent
                      :words="$parent.$attrs.words"
                      :input_name="'padding_header[section]['+i['id']+']'"
                      @callPaddingStyle="(direction)=>{applyStyle('.dynamic-content > div',index,'.header > p',i,0 ,'padding_header','padding-'+direction,'section')}"
                    ></PaddingStyleCvComponent>

                    <BorderRadiusStyleCvComponent
                      :words="$parent.$attrs.words"
                      :input_name="'padding_header[section]['+i['id']+']'"
                      @ApplyBorderRadiusStyle="applyStyle('.dynamic-content > div',index,'.header > p',i,0 ,'border_radius','border-radius','section')"
                    ></BorderRadiusStyleCvComponent>

                  </div>
                </div>
              </div>
              <div class="content">
                <div class="properties-data">
                  <p class="black mb-0 d-flex align-items-center justify-content-between">
                    <span class="fw-bold">{{ $parent.$attrs.words.cvs.content_section }}</span>
                    <span class="gray"><i class="bi bi-chevron-down cursor-pointer toggle_up_down" parents="3" find=".properties"></i></span>
                  </p>
                  <div class="properties hidden">
                    <div class="attribute smooth_border mb-2" v-for="(attribute,attr_key) in i['attributes']" :key="attr_key">
                      <p class="black mb-0 d-flex align-items-center justify-content-between">
                        <span>{{ attribute['label'] }}</span>
                        <span class="gray"><i class="bi bi-chevron-down cursor-pointer toggle_up_down" parents="2" find=".style-attribute"></i></span>
                      </p>
                      <div class="style-attribute hidden">
                        <FontStyleCvComponent
                          :words="$parent.$attrs.words"
                          :fonts="fonts"
                          :font_style_name="'font_style_attribute[attribute]['+attribute['id']+']'"
                          @callFontStyle="applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+') > *',i,-1,'font_style_attribute','font-family','attribute',attribute)"
                          :font_size_name="'font_size_attribute[attribute]['+attribute['id']+']'"
                          @callFontSizeStyle="applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+') > *',i,-1,'font_size_attribute','font-size','attribute',attribute)"
                        ></FontStyleCvComponent>

                        <FontColorCvComponent
                          :words="$parent.$attrs.words"
                          :colors="colors"
                          :font_color_name="'font_color_attribute[attribute]['+attribute['id']+']'"
                          @callFontColorStyle="applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+') > *',i,-1 ,'font_color_attribute','color','attribute',attribute)"
                        ></FontColorCvComponent>

                        <BackgroundColorCvComponent
                          :words="$parent.$attrs.words"
                          :colors="colors"
                          :background_color_name="'font_color_attribute[attribute]['+attribute['id']+']'"
                          @callBackgroundColorStyle="applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+') > *',i,-1 ,'background_color_header','background-color','attribute',attribute)"
                        ></BackgroundColorCvComponent>

                        <AlignmentStyleCvComponent
                          :words="$parent.$attrs.words"
                          :input_name="'alignment_attribute[attribute]['+attribute['id']+']'"
                          @callAlignmentStyle="applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+') > *',i,-1,'alignment_header','text-align','attribute',attribute)"
                        ></AlignmentStyleCvComponent>

                        <MarginStyleCvComponent
                          :words="$parent.$attrs.words"
                          :input_name="'margin_attribute[attribute]['+attribute['id']+']'"
                          @callMarginStyle="(direction)=>{applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+') > *',i,-1,'margin_header','margin-'+direction,'attribute',attribute)}"
                        ></MarginStyleCvComponent>

                        <PaddingStyleCvComponent
                          :words="$parent.$attrs.words"
                          :input_name="'padding_attribute[attribute]['+i['id']+']'"
                          @callPaddingStyle="(direction)=>{applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+') > *',i,-1,'padding_header','padding-'+direction,'attribute',attribute)}"
                        ></PaddingStyleCvComponent>

                        <BorderRadiusStyleCvComponent
                          :words="$parent.$attrs.words"
                          :input_name="'border_radius_attribute[attribute]['+attribute['id']+']'"
                          @ApplyBorderRadiusStyle="applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+') > *',i,-1,'border_radius','border-radius','attribute',attribute)"
                        ></BorderRadiusStyleCvComponent>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <button class="btn btn-outline-sky w-100 d-flex align-items-center justify-content-center mt-4" @click="go_to_add_sections">
              <span class="mx-2 position-relative top-1"><i class="bi bi-arrow-right"></i></span>
              <span>{{ $parent.$attrs.words.general.back_behind }}</span>
            </button>
          </div>
        </div>
        <div class="col-lg-5 col-md-6 col-12">
          <div class="dynamic-content">
            <div v-for="(i,index) in selected_sessions_from_popup" :key="index" :class="'sec_id_'+i['id']" >
              <div class="header">
                <p class="gray fw-bold">{{ i['name'] }}</p>
              </div>
              <div class="body">
                <div v-for="(n,key) in i['attributes'].length" :key="key" class="mb-0"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-l3-4 col-md-6 col-12"></div>
      </div>
      <SectionsPopUpComponent :words="$parent.$attrs.words"></SectionsPopUpComponent>

    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
import ImageComponent from "../../components/ImageComponent";
import SectionComponent from "../../components/templates/SectionComponent";
import SectionsPopUpComponent from "../../components/Modals/SectionsPopUpComponent";
import ApplyStyle from "../../mixins/ApplyStyle";
import FontStyleCvComponent from "../../components/cv/FontStyleCvComponent.vue";
import FontColorCvComponent from "../../components/cv/FontColorCvComponent.vue";
import BackgroundColorCvComponent from "../../components/cv/BackgroundColorCvComponent.vue";
import AlignmentStyleCvComponent from "../../components/cv/AlignmentStyleCvComponent.vue";
import MarginStyleCvComponent from "../../components/cv/MarginStyleCvComponent.vue";
import PaddingStyleCvComponent from "../../components/cv/PaddingStyleCvComponent.vue";
import BorderRadiusStyleCvComponent from "../../components/cv/BorderRadiusStyleCvComponent.vue";
export default {
  name: "create-template",
  components: {
    BorderRadiusStyleCvComponent,
    PaddingStyleCvComponent,
    MarginStyleCvComponent,
    AlignmentStyleCvComponent,
    BackgroundColorCvComponent,
    FontColorCvComponent, FontStyleCvComponent, SectionComponent, ImageComponent,SectionsPopUpComponent},
  mixins:[ApplyStyle],
  data(){
    return {

      styles:[]
    }
  },
  methods:{
    ...mapActions({
      'first_section_action':'cvs/sections/firstSectionAction',
      'all_sections_action':'cvs/sections/allSectionsAction'
    }),
    removeActiveInput(el,type){
      var parent = event.target.parentElement.parentElement.parentElement;
      if(type === 'custom'){
         $(parent).find(el).val('')
      }
    },
    go_to_edit(){
       $('.current_page').find('.sections').slideUp();
       $('.current_page').find('.style').slideDown();
    },
    go_to_add_sections(){
      $('.current_page').find('.style').slideUp();
      $('.current_page').find('.sections').slideDown();
    },

  },
  computed:{
    ...mapGetters({
      'first_section':'cvs/sections/getFirstSection',
      'sections':'cvs/sections/getSections',
      'selected_sessions_from_popup':'cvs/sections/getSelectedSessionsFromPopUp',
    })
  },
  created() {
    //this.first_section_action();
    console.log(this.$auth)
  },
}
</script>

<style lang="scss" scoped>
@import "~style/variables";
.sections,.style{
  background-color: white;
  padding: 15px;
  border-radius: 10px;
}
.sections{
 // display: none;
}
.style{
  display: none;
  .style-data{
    max-height: 700px;
    overflow-x: hidden;
    .header{
      border-bottom: 1px solid #dddddd;
    }
  }
}
.dynamic-content{
  border: 1px solid #dddddd;
  border-radius: 10px;
  padding: 10px;
  min-height: 600px;
  background-color: white;
  p{
    span{
      font-size: $small;
    }
  }
}
</style>
