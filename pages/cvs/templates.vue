<template>
  <div class="current_page templates">
    <div class="container" v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
      <div class="text-center mb-4 d-flex align-items-center justify-content-between">
        <h2 class="">{{ $parent.$attrs.words.templates.main_title }}</h2>
        <div>
          <span class="gray"><i class="bi bi-files"></i></span>
          <span><strong>{{ total }}</strong> {{ $parent.$attrs.words.templates.different_design }}</span>
        </div>
      </div>
      <form class="infinite_scroll_form" @submit.prevent="submitData">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12 mb-2">
            <div class="filters">
              <div class="cats mb-2">
                <p class="fw-bold mb-0">{{ $parent.$attrs.words.templates.categories }}</p>
                <div class="filter" v-for="(i,index) in categories" :key="index">
                  <input class="mrl-half" name="category_id" :value="i['id']" type="radio">
                  <span>{{ i?.name }}</span>
                </div>
              </div>

              <div class="price">
                <p class="fw-bold mb-0">{{ $parent.$attrs.words.templates.box.price }}</p>
                <div class="filter">
                  <input class="mrl-half"  type="radio" name="price" value="free">
                  <span>{{ $parent.$attrs.words.templates.free }}</span>
                </div>
                <div class="filter">
                  <input class="mrl-half"  type="radio" name="price" value="paid">
                  <span>{{ $parent.$attrs.words.templates.paid }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-9 col-md-6 col-12 mb-2">
            <div class="row align-items-center mb-2 " >
              <div class="col">
                <div class="input-icon">
                  <span><i class="bi bi-search"></i></span>
                  <input class="form-control" name="name" :placeholder="$parent.$attrs.words.general.search">
                </div>
              </div>
              <div class="col-auto">
                <input type="submit" class="btn btn-primary" :value="$parent.$attrs.words.general.search_submit">
              </div>
            </div>
            <div class="row infinite_scroll" action_path="cvs/templates/getTemplatesAction" v-if="templates.length > 0">
              <div :class="'col-lg-6 col-12 mb-4 el show'" v-for="(i,index) in templates" :key="index">
                <TemBox :data="i" ></TemBox>
              </div>
            </div>
            <div v-else>
              <img src="/images/no_data.gif" class="w-100">
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions , mapGetters} from "vuex";
import TemBox from "../../components/templates/TemBox.vue";
import animateData from "../../mixins/Dom/animateData";
import FilterTemplates from "../../mixins/templates/FilterTemplates";
export default {
  name: "templates",
  components: {TemBox},
  mixins:[animateData,FilterTemplates],
  asyncData({store,route}){
    let data = {empty:true}
    if(Object.keys(route.query).length > 0){
      data['user_id'] = route?.query?.user_id
    }
    store.dispatch('categories/allData')
    return store.dispatch('cvs/templates/getTemplatesAction',data);
  },
  mounted() {
    document.querySelectorAll('.infinite_scroll .el').forEach(tem => {
      this.observer.observe(tem)
    })
  },
  head() {
    return {
      title: 'تصاميم جاهزه | templates',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Select your best design template to make your own cv',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'cv , templates , build your cv , سيرة ذاتية  ,اختر تصميم المناسب لك, انشاء سيرة ذاتية',
        }
      ],

    }
  },
  methods:{

  },
  computed:{
    ...mapGetters({
      'templates':'cvs/templates/getData',
      'categories':'categories/getData',
      'total':'cvs/templates/getTotal'
    })
  },
}
</script>

<style lang="scss" scoped>
@import "~style/variables";
.infinite_scroll{
  overflow: hidden;
}
.el{
  transition: 0.5s;
  transform:translateX(220px);
  &.show{
    transform:translateX(0px);
  }
}
.box{
  border: 4px solid white;
  background-color: $main_color_white_bk;
  padding: 10px;
  border-radius: 10px;
  min-height: 285px;
  img{
    height: 150px;
    display: block;
    margin: 10px auto;
  }
  p{
    text-align: center;
    font-weight: bold;
    font-size: $semi_big;
  }
}
</style>
