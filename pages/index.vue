<template>
  <div class="home current_page">
    <div class="data-content" v-if="Object.keys($parent.$attrs).length > 0  &&  Object.keys($parent.$attrs.words).length > 0">
      <header>
        <div class="d-flex align-items-center flex-wrap">
          <div class="content">
            <img src="/images/home/first_shape.png">
            <div class="container">
              <p class="mb-4 mt-5">
                <span class="position-relative top-3">{{ $parent.$attrs.words.home.header.main_title }}</span>
                <img src="/images/home/hand.png">
              </p>
              <h2 class="mb-4">
                <span>{{ $parent.$attrs.words.home.header.create }}</span><span class="blue">{{ $parent.$attrs.words.home.header.cv }}</span>
                <span>{{ $parent.$attrs.words.home.header.with_ease }}</span><span class="blue">{{ $parent.$attrs.words.home.header.job_descriptions }}</span>
                <span>{{ $parent.$attrs.words.home.header.facilitate }}</span>
              </h2>
              <nuxt-link class="btn btn-primary" to="/cvs">
                <span>{{ $parent.$attrs.words.home.header.ready_to }}</span>
                <span><i :class="$parent.$attrs.words.home.header.ready_class"></i></span>
              </nuxt-link>
              <a  href="https://jd.skillar.com" target="_blank" class="p-2">
                <span>{{ $parent.$attrs.words.home.header.get_job_desc }}</span>
              </a>
              <img src="/images/home/star.png">
            </div>
          </div>
          <div class="head-bk">
            <img src="/images/home/header1.png" class="w-100">
          </div>
        </div>
      </header>
      <section class="info">
        <img class="shape" src="/images/home/Group908.png">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 col-12 mb-4">
              <div class="row">
                <div class="col-6" v-for="(i,index) in $parent.$attrs.words.home.info.boxes" :key="index">
                  <div class="box text-center">
                    <div class="count"><span>{{ i['count'] }}</span></div>
                    <div class="data"><span>{{ i['name'] }}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-12 mb-2">
              <div class="info-content text-center">
                <img class="mb-2" src="/images/logo.png">
                <p>{{ $parent.$attrs.words.home.info.content }}</p>
                <nuxt-link class="btn btn-primary" to="/cvs">
                  <span>{{ $parent.$attrs.words.home.header.ready_to }}</span>
                  <span><i :class="$parent.$attrs.words.home.header.ready_class"></i></span>
                </nuxt-link>
                <a  href="https://jd.skillar.com" target="_blank" class="p-2">
                  <span>{{ $parent.$attrs.words.home.header.get_job_desc }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="services">
        <div class="container">
          <div class="text-center mb-5">
            <img src="/images/home/line1.png">
            <p class="d-inline semi_big blue">{{ $parent.$attrs.words.home.services.title }}</p>
            <img src="/images/home/line2.png">
          </div>
          <div class="row">
            <div class="col-lg-6 col-12 mb-2" v-for="(i,index) in $parent.$attrs.words.home.services.boxes" :key="index">
              <div class="box d-flex align-items-center justify-content-between">
                <img :src="'/images/home/'+i['image']">
                <div>
                  <h2 class="semi_big fw-bold">{{ i['title'] }}</h2>
                  <p class="small gray">{{ i['content'] }}</p>
                  <a target="_blank" :href="i['link']['url']">
                    <span>{{ i['link']['name'] }}</span>
                    <span class="position-relative top-1"><i :class="$parent.$attrs.words.home.header.ready_class"></i></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="why_use_skillar">
        <div class="container">
          <img src="">
          <div class="row align-items-center">
            <div class="col-lg-4 col-12 mb-2">
              <div class="image">
                <img class="w-100" src="/images/home/why_use_skillar.png">
              </div>
            </div>
            <div class="col-lg-8 col-12 mb-2">
              <div class="answer">
                <div class="row">
                  <div class="col-lg-6 mb-2" v-for="(i,index) in $parent.$attrs.words.home.why_use_skillar">
                    <div class="ans d-flex justify-content-between">
                      <p class="mb-0">{{ index + 1}}</p>
                      <p>
                        <strong class="gray">{{ i['name'] }} : </strong>
                        <span>{{ i['content'] }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="how_to_use_skillar">
        <div class="container">
          <h2 class="text-center mb-4">
            <span>{{ $parent.$attrs.words.home.how_to_use_skillar.title }}</span>
          </h2>
          <div class="row">
            <div class="col-lg-4 col-12 mb-2" v-for="(i,index) in $parent.$attrs.words.home.how_to_use_skillar.content" :key="index">
              <div class="box">
                <nuxt-link :to="i['url']">
                  <p class="blue mb-2 fw-bold">{{ i['name'] }}</p>
                  <p class="gray">{{ i['content'] }}</p>
                  <img class="w-100" :src="'/images/home/stage'+(index+1)+'.png'">
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="job_description">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 mb-2">
              <h2 class="mb-4">{{ $parent.$attrs.words.home.job_description.title }}</h2>
              <p class="gray">{{ $parent.$attrs.words.home.job_description.content }}</p>
              <a class="btn btn-primary px-5" target="_blank" href="https://jd.skillar.com">
                <span>{{ $parent.$attrs.words.home.job_description.try_it }}</span>
                <span><i :class="$parent.$attrs.words.home.header.ready_class"></i></span>
              </a>
            </div>
            <div class="col-lg-6 mb-2">
              <div class="image">
                <img  src="/images/home/jd.png">
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="how_to_use_job_definition">
        <div class="container">
          <h2 class="text-center mb-4">
            <span>{{ $parent.$attrs.words.home.how_to_use_job_definition.title }}</span>
          </h2>
          <div class="row">
            <div class="col-lg-6 col-12 mb-2" v-for="(i,index) in $parent.$attrs.words.home.how_to_use_job_definition.content" :key="index">
              <div class="box">
                <a href="https://jd.skillar.com" target="_blank">
                  <p class="blue mb-2 fw-bold">{{ i['name'] }}</p>
                  <p class="gray">{{ i['content'] }}</p>
                  <img class="w-100" :src="'/images/home/'+i['image']">
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
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
        description:'you can build your cv online or choose free template or paid and add your info and make professional cv that help you to apply job',
        keywords:'skillar , cv builder , cv building , cv template , cvs'
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
    document.querySelector('body').style.cssText = 'background-image:unset';
  },
  head() {
    return {
      title: 'بناء سيرة ذاتية احترافية | skillar cv builder',
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

<style lang="scss" scoped>
@import "~style/variables";
.current_page{
  margin-top: 75px !important;
}
.home{
  .data-content{
    >section{
      margin-bottom: 150px;
    }
  }
 header{
    .content,.head-bk{
      width: 50%;
    }
    .content{
      >img{
        position: absolute;
        top: 0px;
        width: 235px;
      }
      p:first-of-type span{
        font-size: $semi_big;
      }
      h2{
        font-size: 50px;
      }
    }
  }
 @media (max-width: 1000px) {
    header{
      .content,.head-bk{
        width: 100% !important;
        margin-bottom: 10px;
        text-align: center;
      }
    }
  }
 .info{
    position: relative;
    img.shape{
      position: absolute;
      top: 5px;
      max-height: 300px;
      width: auto;
    }
    .box{
      .count{
        span{
          display: inline-flex;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 6px solid #dddddd;
          align-items: center;
          justify-content: center;
          position: relative;
          top: 40px;
          background: white;
        }
      }
      .data{
        padding: 15px;
        border-radius: 8px;
        background: white;
        border: 1px solid #dddddd;
        height: 100px;
        display: flex;
        align-items: end;
        justify-content: center;
        box-shadow: 0px 28px 0px -9px $blue;
      }
    }
  }
 .info{
    .row{
      .row{
        >div:first-of-type{
          .box:first-of-type{
            .count{
              span{
                border-color: #9FD4F9;
              }
            }
            .data{
              border-color: #9FD4F9;
              box-shadow: 0px 28px 0px -9px #9FD4F9;
            }
          }
        }
        >div:nth-of-type(2){
          .box:first-of-type{
            .count{
              span{
                border-color: #A0F1C0;
              }
            }
            .data{
              border-color: #A0F1C0;
              box-shadow: 0px 28px 0px -9px #A0F1C0;
            }
          }
        }
        >div:nth-of-type(3){
          .box:first-of-type{
            .count{
              span{
                border-color: #CBA3FF;
              }
            }
            .data{
              border-color: #CBA3FF;
              box-shadow: 0px 28px 0px -9px #CBA3FF;
            }
          }
        }
        >div:nth-of-type(3){
          .box:first-of-type{
            .count{
              span{
                border-color: #FED9A3;
              }
            }
            .data{
              border-color: #FED9A3;
              box-shadow: 0px 28px 0px -9px #FED9A3;
            }
          }
        }
      }
    }
    img{
      width: 170px;
    }
    img+p{
      line-height: 35px;
    }
  }
 .services{
    .box{
      border-radius:8px;
      border: 1px solid #dddddd;
      box-shadow: 0px 0px 11px 1px #1093f178;
      height: 100%;
      img{
        height: 130px;
        width: 130px;
        object-fit: contain;
        filter: drop-shadow(8px 7px 11px $blue);
      }
      div{
        padding: 10px;
        width: calc(100% - 160px);
      }
    }
  }
 .answer{
   .ans{
     p:first-of-type{
       background-color: $blue;
       color: white;
       width: 45px;
       height: 45px;
       border-radius: 50%;
       display: inline-flex;
       align-items: center;
       justify-content: center;
       position: relative;
       top: -25px;
       &::before{
         content: '';
         position: absolute;
         width: 40px;
         height:  40px;
         left: 15px;
         top:18px;
         background-color: #1093f14a;
       }
     }
     p:last-of-type{
        width:calc(100% - 50px);
     }
   }
 }
  @media (max-width: 992px) {
    .why_use_skillar{
      img{
        display: block;
        margin: auto;
        margin-bottom: 15px;
      }
    }
  }
  .how_to_use_skillar{
    @media (min-width: 992px) {
      .row{
        >div:nth-of-type(2){
          margin-top: 80px;
        }
      }
    }
  }
}
</style>
