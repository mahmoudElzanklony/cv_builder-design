<template>
  <div class="current_page create-template">
    <div class="container" >
      <form method="post" @submit.prevent="save_template">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-12">
            <!-- ownThisTemplate is true so this is will be for owner only -->

            <div class="sections">
              <div class="layout_info" >
                <div class="black mb-0 d-flex align-items-center justify-content-between">
                  <div class="d-flex algin-items-center">
                    <span><img src="/images/icons/template.svg"></span>
                    <span class="mx-1 position-relative top-3">{{ $parent.$attrs.words.cvs.layout_options }}</span>
                  </div>
                  <span class="gray"><i class="bi bi-chevron-up cursor-pointer toggle_up_down" parents="2" find=".layout_options"></i></span>
                </div>
                <div class="layout_options">
                  <div class="form-group mb-2" v-for="(input_layout,index) in $parent.$attrs.words.cvs.layout_inputs" :key="index">
                    <div class="inner">

                      <label v-if="input_layout['type'] !== 'checkbox' || (input_layout['type'] === 'checkbox' && ownThisTemplate)">{{ input_layout['name'] }}</label>

                      <span v-if="input_layout['type'] === 'checkbox' && ownThisTemplate" v-tooltip="input_layout['note']"><i class="bi bi-info-circle"></i></span>
                      <br v-if="input_layout['type'] === 'checkbox'">
                      <select v-if="input_layout['type'] === 'selection'" class="form-control" :name="input_layout['input']" v-model="layoutData['category_id']">
                        <option value="">{{ $parent.$attrs.words.general.select_best_choice }}</option>
                        <option v-for="(val,key) in $store.getters[input_layout['getterPath']]" :key="key"
                                :selected="getTemplateInfo != null && getTemplateInfo.category_id === val['id']"
                                :value="val['id']">{{ val['name'] }}</option>
                      </select>

                      <input v-else-if="input_layout['type'] === 'checkbox' && ownThisTemplate" class="radio_btn"
                             :name="input_layout['input']"
                             v-model="visible"
                             :type="input_layout['type']">

                      <input v-else-if="input_layout['type'] !== 'checkbox' || (input_layout['type'] === 'checkbox' && ownThisTemplate)" class="form-control"
                             v-model="layoutData['name']"
                             :name="input_layout['input']" :type="input_layout['type']">
                    </div>
                  </div>
                  <div v-if="visible" class="form-group">
                    <label>{{ $parent.$attrs.words.cvs.price }}</label>
                    <span  v-tooltip="$parent.$attrs.words.cvs.price_profit + ' '+percentageItem?.percentage +'%'"
                    ><i class="bi bi-info-circle"></i></span>
                    <input class="form-control" name="price" @change="number_validation(1,10)" type="number"
                           v-model="layoutData['price']"
                           min="1" max="10" required>
                  </div>
                  <div class="owner">
                    <a :href="'/cvs/templates?user_id='+(getTemplateInfo != null ? getTemplateInfo?.user?.id : $auth.user.id)" target="_blank" class="d-inline-block alert p-1 mt-2 alert-warning mb-0" v-tooltip="$parent.$attrs.words.cvs.owner">
                      <span class="small"><i class="bi bi-person"></i></span>
                      <span class="small">{{ (getTemplateInfo != null ? getTemplateInfo?.user?.username:$auth.user.username) }}</span>
                    </a>
                  </div>
                </div>
              </div>

              <div class="owner mb-2" v-if="ownThisTemplate === false && false">
                <a :href="'/cvs/templates?user_id='+(getTemplateInfo != null ? getTemplateInfo?.user_id : $auth.user.id)" target="_blank" class="d-inline-block alert p-1 mt-2 alert-warning mb-0" v-tooltip="$parent.$attrs.words.cvs.owner">
                  <span class="small"><i class="bi bi-person"></i></span>
                  <span class="small">{{ getTemplateInfo?.user?.username }}</span>
                </a>
              </div>
              <div class="content">
                <div v-for="(i,index) in selected_sessions_from_popup" :key="index">
                  <section-component :words="$parent.$attrs.words.general" :data="i"
                                     :attr_answers="getTemplateInfo != null ? getTemplateInfo['sections'][index]?.attr_answers:[]"></section-component>
                </div>
              </div>
              <div class="buttons-control d-flex align-items-center justify-content-between flex-wrap">
                <button class="btn btn-primary" type="button"  data-bs-toggle="modal" data-bs-target="#pop_up_sections">
                  <span class="white"><i class="bi bi-plus"></i></span>
                  <span class="white">{{ $parent.$attrs.words.cvs.add_section }}</span>
                </button>
                <button class="btn btn-sky" type="button" @click="go_to_edit">
                  <span class="white"><i class="bi bi-pencil-square"></i></span>
                  <span class="white">{{ $parent.$attrs.words.cvs.edit_template }}</span>
                </button>
                <button class="btn btn-dark mt-2 w-100" type="button" @click="print">
                  <span class="white"><i class="bi bi-eye"></i></span>
                  <span class="white">{{ $parent.$attrs.words.cvs.preview }}</span>
                </button>
              </div>
            </div>
            <div class="style">
              <div  class="layout_style" >
                <div class="header">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                      <img src="/images/icons/template.svg">
                      <span class="fw-bold normal ms-2">{{ $parent.$attrs.words.cvs.template_style }}</span>
                    </div>
                    <span class="gray"><i class="bi bi-chevron-down cursor-pointer toggle_up_down" parents="3" find=".properties-data"></i></span>
                  </div>
                </div>
                <div class="template">
                  <div class="properties-data hidden">

                    <FontColorCvComponent
                      :words="$parent.$attrs.words"
                      label="background-color"
                      :colors="colors"
                      :font_color_name="'font_color_header[template]'"
                      @callFontColorStyle="applyStyle('.cv-data',0,'.simulation > div','',-1 ,'background-color','background-color','template')"
                    ></FontColorCvComponent>

                    <BackgroundImageStyleCvComponent
                      :words="$parent.$attrs.words" :background_image_name="'layout_image'"
                      @callBackgroundImage="applyStyle('.cv-data',0,'.simulation > div','',-1 ,'background-image','background-image','template')"
                    >
                    </BackgroundImageStyleCvComponent>

                    <BackgroundSizeStyle :input_name="'layout_image_size'"
                                         @callBackgroundSizeStyle="applyStyle('.cv-data',0,'.simulation > div','',-1 ,'background-size','background-size','template')"
                    ></BackgroundSizeStyle>

                    <BackgroundRepeatStyle :input_name="'layout_image_repeat'"
                                           @callBackgroundRepeatStyle="applyStyle('.cv-data',0,'.simulation > div','',-1 ,'background-repeat','background-repeat','template')"
                    ></BackgroundRepeatStyle>

                    <BackgroundPositionStyle :input_name="'layout_image_position'"
                                             @callBackgroundPositionStyle="applyStyle('.cv-data',0,'.simulation > div','',-1 ,'background-position','background-position','template')"
                    >

                    </BackgroundPositionStyle>



                  </div>

                </div>
              </div>

              <div class="style-data">

                <div v-for="(i,index) in selected_sessions_from_popup" :key="index" :class="'section sec_id_'+i['id']" >
                <div class="header mb-2">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <div class="d-flex align-items-center">
                      <image-component class="position-relative top-3" v-if="i['image'] != null" :src="i['image']['name']"></image-component>
                      <span class="fw-bold normal ms-2">{{ i['name'] }}</span>
                    </div>
                    <span class="gray"><i class="bi bi-chevron-up cursor-pointer toggle_up_down" parents="3" find=".properties-data"></i></span>
                  </div>
                </div>
                  <div class="properties-data section general">
                    <p class="black mb-2 d-flex align-items-center justify-content-between">
                      <span class="fw-bold">{{ $parent.$attrs.words.cvs.section }}</span>
                      <span class="gray"><i class="bi bi-chevron-down cursor-pointer toggle_up_down" parents="2" find=".properties"></i></span>
                    </p>
                    <div class="properties hidden">
                      <AppearanceElementsStyleCvComponent
                        :words="$parent.$attrs.words"
                        :input_name="'appearance_style_content[general]['+i['id']+']'"
                        @callAppearanceStyle="applyStyle('.dynamic-content > div',index,'.body',i,-1,'flex-direction','flex-direction','general')">
                      </AppearanceElementsStyleCvComponent>

                      <DisplayElementsStyleCvComponent
                        :words="$parent.$attrs.words"
                        :input_name="'display_style_content[general]['+i['id']+']'"
                        @callAlignmentStyle="applyStyle('.dynamic-content > div',index,'.body',i,-1,'justify-content','justify-content','general')"
                      >
                      </DisplayElementsStyleCvComponent>

                      <WidthElementsStyleCvComponent
                        :words="$parent.$attrs.words"
                        :data_content="i['attributes']"
                        :input_name="'width_style_content[general]['+i['id']+']'"
                        @callWidthStyle="((item)=>{applyStyle('.dynamic-content > div',index,'.body > div',i,item.key ,'width','width','attribute',item.value > 100 ? 100:item.value)})"
                      ></WidthElementsStyleCvComponent>

                      <LineHeightStyleCvComponent
                        :words="$parent.$attrs.words"
                        :input_name="'line_height_header[general]['+i['id']+']'"
                        @callLineHeightStyle="applyStyle('.dynamic-content > div',index,'p,span,li',i,-1 ,'line-height','line-height','general')"
                      ></LineHeightStyleCvComponent>

                      <WordSpacingStyleCvComponent
                        :words="$parent.$attrs.words"
                        :input_name="'word_spacing_header[general]['+i['id']+']'"
                        @callWordSpacingStyle="applyStyle('.dynamic-content > div',index,'p,span,li',i,-1 ,'word-spacing','word-spacing','general')"
                      >
                      </WordSpacingStyleCvComponent>

                      <FontColorCvComponent
                        :words="$parent.$attrs.words"
                        label="label-color"
                        :colors="colors"
                        :font_color_name="'font_color_header[general]['+i['id']+']'"
                        @callFontColorStyle="applyStyle('.dynamic-content > div',index,'.body > div p',i,-1 ,'label-color','color','general')"
                      ></FontColorCvComponent>

                      <FontColorCvComponent v-if="false"
                        :words="$parent.$attrs.words"
                        label="background-color"
                        :colors="colors"
                        :font_color_name="'font_color_header[general]['+i['id']+']'"
                        @callFontColorStyle="applyStyle('.dynamic-content > div',index,'.body',i,-1 ,'background-color','background-color','general')"
                      ></FontColorCvComponent>

                      <FontColorCvComponent
                        :words="$parent.$attrs.words"
                        :colors="colors"
                        :font_color_name="'font_color_header[general]['+i['id']+']'"
                        @callFontColorStyle="applyStyle('.dynamic-content > div',index,'.body > div > div > span:last-of-type ,.body ul , .header p',i,-1 ,'color','color','general')"
                      ></FontColorCvComponent>

                      <MarginStyleCvComponent
                        :words="$parent.$attrs.words"
                        :input_name="'margin[general]['+i['id']+']'"
                        @callMarginStyle="(direction)=>{applyStyle('.dynamic-content > div',index,'.body',i,-1 ,'margin-'+direction,'margin-'+direction,'general')}"
                      ></MarginStyleCvComponent>

                      <PaddingStyleCvComponent
                        :words="$parent.$attrs.words"
                        :input_name="'padding[general]['+i['id']+']'"
                        @callPaddingStyle="(direction)=>{applyStyle('.dynamic-content > div',index,'.body',i,-1 ,'padding-'+direction,'padding-'+direction,'general')}"
                      ></PaddingStyleCvComponent>

                    </div>

                  </div>
                  <div class="properties-data icons">
                    <p class="black mb-2 d-flex align-items-center justify-content-between">
                      <span class="fw-bold">{{ $parent.$attrs.words.cvs.icons }}</span>
                      <span class="gray"><i class="bi bi-chevron-down cursor-pointer toggle_up_down" parents="2" find=".properties"></i></span>
                    </p>
                    <div class="properties hidden">
                      <WidthElementsStyleCvComponent
                        :words="$parent.$attrs.words"
                        :data_content="[i]"
                        :for_icon="true"
                        :hide_name="true"
                        rest_val="3"
                        :input_name="'width_style_content[general]['+i['id']+']'"
                        @callWidthStyle="((item)=>{applyStyle('.dynamic-content > div',index,'svg',i,item.key ,'width','width','icons',item.value > 100 ? 100:item.value)})"
                      ></WidthElementsStyleCvComponent>

                      <FontColorCvComponent
                        :words="$parent.$attrs.words"
                        :colors="colors"
                        :font_color_name="'font_color_header[general]['+i['id']+']'"
                        @callFontColorStyle="applyStyle('.dynamic-content > div',index,'svg',i,-1 ,'color','color','icons')"
                      ></FontColorCvComponent>

                      <MarginStyleCvComponent
                        :words="$parent.$attrs.words"
                        :input_name="'margin_header[general]['+i['id']+']'"
                        @callMarginStyle="(direction)=>{applyStyle('.dynamic-content > div',index,'svg',i,-1 ,'margin-'+direction,'margin-'+direction,'icons')}"
                      ></MarginStyleCvComponent>

                    </div>

                  </div>

                  <div class="properties-data main-title header">
                    <p class="black mb-2 d-flex align-items-center justify-content-between">
                      <span class="fw-bold">{{ $parent.$attrs.words.cvs.title_section }}</span>
                      <span class="gray"><i class="bi bi-chevron-down cursor-pointer toggle_up_down" parents="2" find=".properties"></i></span>
                    </p>
                    <div class="properties hidden">


                      <FontStyleCvComponent
                        :words="$parent.$attrs.words"
                        :fonts="fonts"
                        :font_style_name="'font_style_header[section]['+i['id']+']'"
                        @callFontStyle="applyStyle('.dynamic-content > div',index,'.header > p',i,0,'font-family','font-family','header')"
                        :font_size_name="'font_size_header[section]['+i['id']+']'"
                        @callFontSizeStyle="applyStyle('.dynamic-content > div',index,'.header > p',i,0,'font-size','font-size','header')"
                      ></FontStyleCvComponent>

                      <FontColorCvComponent
                        :words="$parent.$attrs.words"
                        :colors="colors"
                        :font_color_name="'font_color_header[section]['+i['id']+']'"
                        @callFontColorStyle="applyStyle('.dynamic-content > div',index,'.header > p',i,0 ,'color','color','header')"
                      ></FontColorCvComponent>

                      <BackgroundColorCvComponent
                        :words="$parent.$attrs.words"
                        :colors="colors"
                        :background_color_name="'background_color_header[section]['+i['id']+']'"
                        @callBackgroundColorStyle="applyStyle('.dynamic-content > div',index,'.header > p',i,0 ,'background-color','background-color','header')"
                      ></BackgroundColorCvComponent>

                      <AlignmentStyleCvComponent
                        :words="$parent.$attrs.words"
                        :input_name="'alignment_header[section]['+i['id']+']'"
                        @callAlignmentStyle="applyStyle('.dynamic-content > div',index,'.header > p',i,0 ,'text-align','text-align','header')"
                      ></AlignmentStyleCvComponent>

                      <MarginStyleCvComponent
                        :words="$parent.$attrs.words"
                        :input_name="'margin_header[section]['+i['id']+']'"
                        @callMarginStyle="(direction)=>{applyStyle('.dynamic-content > div',index,'.header > p',i,0 ,'margin-'+direction,'margin-'+direction,'header')}"
                      ></MarginStyleCvComponent>

                      <PaddingStyleCvComponent
                        :words="$parent.$attrs.words"
                        :input_name="'padding_header[section]['+i['id']+']'"
                        @callPaddingStyle="(direction)=>{applyStyle('.dynamic-content > div',index,'.header > p',i,0 ,'padding-'+direction,'padding-'+direction,'header')}"
                      ></PaddingStyleCvComponent>

                      <BorderRadiusStyleCvComponent
                        :for_icon="true"
                        rest_val="0"
                        :words="$parent.$attrs.words"
                        :input_name="'BorderRadius[section]['+i['id']+']'"
                        @ApplyBorderRadiusStyle="applyStyle('.dynamic-content > div',index,'.header > p',i,0 ,'border-radius','border-radius','header')"
                      ></BorderRadiusStyleCvComponent>

                    </div>

                  </div>

                  <div class="content properties">
                  <div class="properties-data">
                    <p class="black mb-0 d-flex align-items-center justify-content-between">
                      <span class="fw-bold">{{ $parent.$attrs.words.cvs.content_section }}</span>
                      <span class="gray"><i class="bi bi-chevron-down cursor-pointer toggle_up_down" parents="3" find=".properties"></i></span>
                    </p>
                    <div class="properties hidden">
                      <div class="attribute smooth_border mb-2" v-for="(attribute,attr_key) in i['attributes']" :key="attr_key" :property_id="attribute['id']">
                        <p class="black mb-0 d-flex align-items-center justify-content-between">
                          <span>{{ attribute['name'] }}</span>
                          <span class="gray"><i class="bi bi-chevron-down cursor-pointer toggle_up_down" parents="2" find=".style-attribute"></i></span>
                        </p>
                        <div class="style-attribute hidden" >
                          <FontStyleCvComponent
                            :words="$parent.$attrs.words"
                            :fonts="fonts"
                            :font_style_name="'font_style_attribute[attribute]['+attribute['id']+']'"
                            @callFontStyle="applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+')  span,.body > div:nth-of-type('+(attr_key+1)+') ul',i,-1,'font-family','font-family','attribute',attribute)"
                            :font_size_name="'font_size_attribute[attribute]['+attribute['id']+']'"
                            @callFontSizeStyle="applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+')  span,.body > div:nth-of-type('+(attr_key+1)+') ul',i,-1,'font-size','font-size','attribute',attribute)"
                          ></FontStyleCvComponent>

                          <FontColorCvComponent
                            :words="$parent.$attrs.words"
                            :colors="colors"
                            :font_color_name="'font_color_attribute[attribute]['+attribute['id']+']'"
                            @callFontColorStyle="applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+')  span,.body > div:nth-of-type('+(attr_key+1)+') ul',i,-1 ,'color','color','attribute',attribute)"
                          ></FontColorCvComponent>

                          <BackgroundColorCvComponent
                            :words="$parent.$attrs.words"
                            :colors="colors"
                            :background_color_name="'font_color_attribute[attribute]['+attribute['id']+']'"
                            @callBackgroundColorStyle="applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+')  span,.body > div:nth-of-type('+(attr_key+1)+') ul',i,-1 ,'background-color','background-color','attribute',attribute)"
                          ></BackgroundColorCvComponent>

                          <AlignmentStyleCvComponent
                            :words="$parent.$attrs.words"
                            :input_name="'alignment_attribute[attribute]['+attribute['id']+']'"
                            @callAlignmentStyle="applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+') > *',i,-1,'text-align','text-align','attribute',attribute)"
                          ></AlignmentStyleCvComponent>

                          <MarginStyleCvComponent
                            :words="$parent.$attrs.words"
                            :input_name="'margin_attribute[attribute]['+attribute['id']+']'"
                            @callMarginStyle="(direction)=>{applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+') > *',i,-1,'margin-'+direction,'margin-'+direction,'attribute',attribute)}"
                          ></MarginStyleCvComponent>

                          <PaddingStyleCvComponent
                            :words="$parent.$attrs.words"
                            :input_name="'padding_attribute[attribute]['+i['id']+']'"
                            @callPaddingStyle="(direction)=>{applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+') > *',i,-1,'padding-'+direction,'padding-'+direction,'attribute',attribute)}"
                          ></PaddingStyleCvComponent>

                          <BorderRadiusStyleCvComponent
                            :words="$parent.$attrs.words"
                            :input_name="'border_radius_attribute[attribute]['+attribute['id']+']'"
                            @ApplyBorderRadiusStyle="applyStyle('.dynamic-content > div',index,'.body > div:nth-of-type('+(attr_key+1)+') > *:not(svg)',i,-1,'border-radius','border-radius','attribute',attribute)"
                          ></BorderRadiusStyleCvComponent>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              </div>
              <button type="button" class="btn btn-outline-sky w-100 d-flex align-items-center justify-content-center mt-4" @click="go_to_add_sections">
                <span class="mx-2 position-relative top-1"><i class="bi bi-arrow-right"></i></span>
                <span>{{ $parent.$attrs.words.general.back_behind }}</span>
              </button>
            </div>
            <div class="btn btn-primary w-100 d-flex align-items-center justify-content-center mt-2 position-relative">
              <span class="mx-2 position-relative top-1"><i class="bi bi-send"></i></span>
              <span>{{ $parent.$attrs.words.general.save }}</span>
              <input type="submit">
            </div>


          </div>
          <div class="col-lg-5 col-md-6 col-12 cv-data">
            <div class="simulation">

            </div>
            <div class="dynamic-content"  ref="dynamicContentWatch">
              <div v-for="(i,index) in selected_sessions_from_popup" :key="index" :class="'sec_id_'+i['id']" >
                <div class="header">
                  <p class="gray fw-bold">{{ i['name'] }}</p>
                </div>
                <div class="body">
                  <div v-for="(n,key) in i['attributes'].length" :key="key" class="mb-0" :property_id="i['attributes'][n]?.id"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </form>
      <SectionsPopUpComponent :styles="styles" :words="$parent.$attrs.words"></SectionsPopUpComponent>

    </div>
  </div>
</template>

<script>

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
import DisplayElementsStyleCvComponent from "../../components/cv/DisplayElementsStyleCvComponent.vue";
import AppearanceElementsStyleCvComponent from "../../components/cv/AppearenceElementsStyleCvComponent.vue";
import WidthElementsStyleCvComponent from "../../components/cv/WidthElementsStyleCvComponent.vue";
import LineHeightStyleCvComponent from "../../components/cv/LineHeightStyleCvComponent.vue";
import WordSpacingStyleCvComponent from "../../components/cv/WordSpacingStyleCvComponent.vue";
import take_layout_image from "../../mixins/take_layout_image";

import {mapActions,mapGetters} from 'vuex';
// call store
import PercentageStore from "../../mixins/CallStore/percentageStore";
// dom calling events
import filterInputNumber from "../../mixins/Dom/filterInputNumber";
import urlSplit from "../../mixins/Dom/urlSplit";
import dynamicPagesCv from "../../mixins/Dom/cv/DynamicPagesCv";
import BackgroundImageStyleCvComponent from "../../components/cv/BackgroundImageStyleCvComponent.vue";
import BackgroundSizeStyle from "../../components/cv/BackgroundImageOptionsStyleCv/BackgroundSizeStyle.vue";
import BackgroundPositionStyle from "../../components/cv/BackgroundImageOptionsStyleCv/BackgroundPositionStyle.vue";
import BackgroundRepeatStyle from "../../components/cv/BackgroundImageOptionsStyleCv/BackgroundRepeatStyle.vue";
export default {
  name: "create-template",
  components: {
    BackgroundRepeatStyle,
    BackgroundPositionStyle,
    BackgroundSizeStyle,
    BackgroundImageStyleCvComponent,
    WordSpacingStyleCvComponent,
    LineHeightStyleCvComponent,
    WidthElementsStyleCvComponent,
    AppearanceElementsStyleCvComponent,
    DisplayElementsStyleCvComponent,
    BorderRadiusStyleCvComponent,
    PaddingStyleCvComponent,
    MarginStyleCvComponent,
    AlignmentStyleCvComponent,
    BackgroundColorCvComponent,
    FontColorCvComponent, FontStyleCvComponent, SectionComponent, ImageComponent,SectionsPopUpComponent
  },
  mixins:[ApplyStyle,take_layout_image,PercentageStore,filterInputNumber,urlSplit,dynamicPagesCv],
  data(){
    return {
      visible:false,
      styles:[],
    }
  },
  async asyncData({store,route}){
    if(Object.keys(route.query).length > 0){
       if(route.query.hasOwnProperty('id')){
         store.commit('cvs/sections/emptySessionsFromPopUp');
         await store.dispatch('cvs/templates/getTemplateInfoAction',route.query.id)
         let getTemplateInfo = store.getters['cvs/templates/getItem']
         if(getTemplateInfo != null && getTemplateInfo.sections.length > 0){
           for(let section_data of getTemplateInfo.sections){
             store.commit('cvs/sections/pushInfoSelectedSessionsFromPopup',section_data.section)
           }
         }
       }
    }
  },
  methods:{
    ...mapActions({
      'first_section_action':'cvs/sections/firstSectionAction',
      'all_sections_action':'cvs/sections/allSectionsAction',
    }),
    print(){

      window.print()
    },
    save_template(){
      // check for if category_id or name is empty
      if(this.id == null && (document.querySelector('.layout_info input[type="text"]').value == '' || document.querySelector('.layout_info select').value == '')){
        if(document.querySelector('.layout_info > p > span:last-of-type i').className.indexOf('bi-chevron-up') >= 0) {
          document.querySelector('.layout_info > p > span:last-of-type i').click()
        }
        Toast.fire({
          icon:'error',
          title:this.$parent.$attrs.words.cvs.layout_inputs_validation
        });
        return false;
      }
      let data = new FormData(event.target);
      data.append('style',JSON.stringify(this.styles))
      var formData = new FormData()
      var removed = ['general','section','header','attribute']
      for (const [key, value] of data.entries()) {
        var err = 0;
        for(let rem of removed){
          if(key.indexOf(rem) >= 0 ){
            err++
            break
          }
        }
        if(err === 0){
          console.log(key)
          formData.append(key,value);
        }

      }
      // for files that not uploaded and want to keep them
      for(let input of $(event.target).find('input[type="file"]')){
        if(input.files.length == 0){
          if($(input).attr('file_path')){
            formData.append($(input).attr('name'),$(input).attr('file_path'))
          }
        }
      }
      // check for parent_id
      if(this.getTemplateInfo != null){
        formData.append('parent_id', this.getTemplateInfo?.parent_id);
        if(this.getTemplateInfo?.user_id !== this.$auth?.user?.id){
          // client user want to use this template
          formData.append('parent_id', this.id);
          this.id = null;
        }

      }
      // check for id
      if(this.id){
        formData.append('id', this.id);
      }
      // check for template_style
      formData.append('template_style', JSON.stringify(this.template_style));

      this.take_capture().then((e)=>{
        formData.append('layout_image', e, `image_layout.png`);
        this.$store.dispatch('cvs/save_template/allData',formData)
      })


    },
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
      'getTemplateInfo':'cvs/templates/getItem',
      'selected_sessions_from_popup':'cvs/sections/getSelectedSessionsFromPopUp',
    }),
  },
  mounted() {
    if(this.ownThisTemplate){
      if(this.getTemplateInfo != null && this.getTemplateInfo.visibility === 'public'){
        this.visible = true;
      }
    }

    var data_percen = new FormData();
    data_percen.append('type','profit')
    this.FilterPercentageData(data_percen);
    //this.first_section_action();
    setTimeout(()=>{
      for(let item of this.selected_sessions_from_popup){
        console.log(this.getTemplateInfo)
        if(this.getTemplateInfo == null){
          var obj = {id:item.id};
          this.styles.push(obj)
        }
      }
    },2000)
    // call layout categories input
    this.$store.dispatch('categories/allData')

    // trigger keyup event

  },
}
</script>

<style lang="scss" scoped>
@import "~style/variables";

@media print {
  body{
    background-image:unset;
    margin: 0;
  }

  .create-template .dynamic-content{
    display: none;
  }
  .create-template form > .row > div:first-of-type{
    display: none;
  }
}


.sections{
  background-color: white;
  border-radius: 8px;
}
.layout_info{
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 15px;
}
.layout_style{
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;

}
.sections,.style{
  padding: 15px;
  .style-data{
    >div{
      background-color: white;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 10px;
    }
  }
}
.sections{
 // display: none;
}
.style{
  display: none;
  padding:0px;
  .style-data{
    max-height: 700px;
    overflow-x: hidden;
    .header{
      border-bottom: 1px solid #dddddd;
    }
  }
}
.btn{
  input[type="submit"]{
    position: absolute;
    width: 100%;
    top: 0px;
    bottom: 0px;
    right: 0px;
    z-index: 99;
    opacity: 0;
  }
}
.dynamic-content{
  border-radius: 10px;
  min-height: 600px;
  border: 1px solid #dddddd;
  background-color: white;
  display: block;
  opacity: 0;
}

.dynamic-content,.simulation{
  overflow:hidden;


  .body{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  p{
    margin-bottom: 0px;
    span{
      font-size: $small;
    }
  }
}
</style>
