<template>
  <div class="current_page create-template">
    <div class="container" v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
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
              <button class="btn btn-sky">
                <span class="white"><i class="bi bi-pencil-square"></i></span>
                <span class="white">{{ $parent.$attrs.words.cvs.edit_template }}</span>
              </button>
            </div>
          </div>
        </div>
        <div class="col-lg-5 col-md-6 col-12">
          <div class="dynamic-content">
            <div v-for="(i,index) in selected_sessions_from_popup" :key="index" :class="'sec_id_'+i['id']" >
              <div class="header">
                <p class="gray fw-bold">{{ i['name'] }}</p>
              </div>
              <div class="body">
                <p v-for="(n,key) in i['attributes'].length" :key="key" class="mb-0"></p>
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
export default {
  name: "create-template",
  components: {SectionComponent, ImageComponent,SectionsPopUpComponent},
  methods:{
    ...mapActions({
      'first_section_action':'cvs/sections/firstSectionAction',
      'all_sections_action':'cvs/sections/allSectionsAction'
    }),
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
  },
}
</script>

<style lang="scss" scoped>
@import "~style/variables";
.sections{
  background-color: white;
  padding: 15px;
  border-radius: 10px;
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
