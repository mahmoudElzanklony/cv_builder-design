<template>
  <div class="jobs_descriptions current_page">

  </div>
</template>

<script>
import WordsLang from "../mixins/WordsLang";
import InfiniteScroll from "../mixins/InfiniteScroll";
import {mapGetters,mapActions} from 'vuex';
import Job_info_filters_box from "../components/Modals/job_info_filters_box";
import filters_jobs_search from "../mixins/filters_jobs_search";

export default {
  name: 'index',
  components: {Job_info_filters_box},
  mixins:[WordsLang,InfiniteScroll,filters_jobs_search],
  data(){
    return {
      data: [],
      file_name:'jobs',
      skills:['php','mysql','laravel'],
      lang:'',
      meta:{
        description:'You will find job descriptions for all jobs around the world here in jd.skillar.com. You will know everything related to jobs, including tasks, interests, requirements, certificates, etc., all in one place. | التوصيف الوظيفي لجميع الوظائف حول العالم ستجدها هنا في سكلير ستعرف كل ما يتعلق بالوظائف  من مهام و اهتمامات و متطلبات و شهادات و خلافه هذا كله في مكان واحد ',
        keywords:'Job description , job-specific certificates , job-specific interests , job-specific tasks , job requirements , job capabilities , job work values , job-related work activities , التوصيف الوظيفي , الشهادات الخاصه بالوظيفه , الاهتمامات الخاصه بالوظيفة المهام الخاصه بالوظيفة , متطلبات الوظيفة , قدرات الوظيفة , قيم عمل الوظيفة , انشطة العمل المتلقة بالوظيفة'
      },
    }
  },
  methods:{
    ...mapActions({
      'all_jobs_action':'jobs/allJobsAction',
      'getJobsByName':'jobs/getJobsByName',
    }),
    SearchNames(){

      var data = this.search_jobs(document.filters,document.more_filters)

      this.current_page = 2;
      this.getJobsByName(data);
    }
  },
  mounted() {
    this.lang = localStorage.getItem('lang');
  },
  head() {
    return {
      title: 'التوصيف الوظيفي لجميع الوظائف | jobs definition',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta['description']
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.meta['keywords']
        }
      ],

    }
  },


  computed:{
    ...mapGetters({
      'jobs_data':'jobs/getData',
      'getTotal':'jobs/getTotal'
    })
  },
}
</script>

<style lang="scss">
@import "~style/variables";
.search-drop-down{
  width: 92%;
}
.jobs_data{
  .row{
    a{
      display: block;
      width: 100%;
      border: 1px solid #dddddd;
      color:$main_color;
      border-radius: 4px;
      padding: 8px;
      font-size: $normal !important;
      span:first-of-type{
        background-color: $main_color;
        color:white;
        padding: 2px 8px;
        border-radius: 3px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      span:last-of-type{
        color:$gray;
      }
    }
  }
}
</style>
