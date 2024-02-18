<template>
  <div class="profile_nav">
    <image-component v-if="Object.keys($auth.$state.user).length > 0"
                     :src="'/users/'+$auth.$state.user.image"></image-component>
    <p v-if="Object.keys($auth.$state.user).length > 0" class="fw-bold shadow-text text-center">{{ $auth.$state.user.username }}</p>
    <ul>
      <li>
        <nuxt-link :to="'/profile/'+$auth.state.user['id']" target="1">
          <span><i class="bi bi-person"></i></span>
          <span>{{ $parent.$parent.$attrs.words.profile.personal_info }}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="'/profile/'+$auth.state.user['id']+'/report'" target="report">
          <span><i class="bi bi-currency-dollar"></i></span>
          <span>{{ $parent.$parent.$attrs.words.profile.report_about_buying }}</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="'/profile/'+$auth.state.user['id']+'/charge'" target="charge">
          <span><i class="bi bi-wallet"></i></span>
          <span>{{ $parent.$parent.$attrs.words.profile.charge_wallet }}</span>
        </nuxt-link>
      </li>

    </ul>
  </div>
</template>

<script>
import WordsLang from "../mixins/WordsLang";
import ImageComponent from "./ImageComponent";
export default {
  name: "ProfilePersonalInfoComponent",
  components: {ImageComponent},
  mixins:[WordsLang],
  props:['edit_info'],
  data(){
    return {
      file_name:'profile_navbar',
    }
  },
  mounted() {
    var last_slag = document.URL.split('/')[document.URL.split('/').length - 1];
    $('ul li a').removeClass('.active');
    $('ul li a[target="'+last_slag+'"]').addClass('active');
  },
}
</script>

<style lang="scss" scoped>
@import "~style/variables";
.profile_nav{
  background-color: white;
  height: 100%;
  border: 1px solid #dddddd;
  img{
    height: 90px;
    max-width: 100%;
    border-radius: 8px;
    display: block;
    margin: 15px auto;
  }
  ul{
    border-top: 1px solid #dddddd;
    li{
      border-bottom: 1px solid #dddddd;
      &:last-of-type{
        border-bottom: 0px;
      }
      a{
        padding: 15px;
        display: block;
        cursor: pointer;
        transition: 0.5s all;
        span{
          color:$gray;
        }
        &:hover{
          background-color: $main_color;
          span{
            color:white;
          }
          padding-right: 40px;
          padding-left: 40px;
        }
        &.active{
          background-color: $main_color;
          span{
            color:white;
          }
        }
      }
    }
  }
}
</style>
