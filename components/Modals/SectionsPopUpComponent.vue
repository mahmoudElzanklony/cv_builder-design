<template>
  <!-- Modal of update personal data -->
  <div class="modal fade" id="pop_up_sections" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog" style="max-width: 70%;">
        <div class="modal-content" v-if="Object.keys(words).length > 0">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ words.cvs.select_best_section }}</h5>
            <button type="button" class="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-2" v-for="(i,index) in sections" :key="index">
                <div class="box" @click="selectSection(i)">
                   <div class="d-flex align-items-center mb-1">
                     <image-component class="d-inline-block position-relative top-3" v-if="i['image'] != null" :src="i['image']['name']"></image-component>
                     <span class="mx-2 text-center fw-bold">{{ i['name'] }}</span>
                   </div>
                   <p>{{ i['info'] }}</p>
                </div>
              </div>
            </div>


          </div>
          <div class="modal-footer d-flex justify-content-between">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ words.general.close }}</button>
          </div>
        </div>



    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ImageComponent from "../ImageComponent";
export default {
  name: "SectionsPopUpComponent",
  props:['words','styles'],
  components: {ImageComponent},
  methods:{
    ...mapActions({
      'all_sections_action':'cvs/sections/allSectionsAction'
    }),
    selectSection(i){
      this.$store.commit('cvs/sections/pushInfoSelectedSessionsFromPopup',i)
      $('.modal-footer> button').click();
      var obj = {id:i['id']};
      this.styles.push(obj)
    }
  },
  computed:{
    ...mapGetters({
      'sections':'cvs/sections/getSections'
    })
  },
  mounted() {
    this.all_sections_action();
    console.log(this.words);
  }
}
</script>

<style lang="scss" scoped>
@import "~style/variables";
.box{
  background-color: #eeeeee5c;
  border: 1px solid #ddd;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  height: 145px;
  img{
    height:30px;
    margin: unset;
  }
}
@media (min-width: 767px) {
  .modal-body{
    max-height: fit-content;
  }
}
</style>
