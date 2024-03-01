<template>
  <div :class="'cv-template '">
     <div class="cv-image position-relative">
       <span class="del" v-if="delete_control === true" @click="$emit('deleteItem',data?.id)"><i class="bi bi-x-lg red cursor-pointer"></i></span>
       <ImageComponent :src="data['image']['name']"></ImageComponent>
     </div>
    <div class="cv_content d-flex align-items-center justify-content-between">
      <div class="text-center" v-tooltip="$parent.$parent.$attrs.words.templates.box.name">
        <p class="mb-0"><span><i class="bi bi-info-square"></i></span></p>
        <p class="mb-0">{{ data?.name }}</p>
      </div>
      <div class="text-center" v-tooltip="$parent.$parent.$attrs.words.templates.box.price">
        <p class="mb-0"><span><i class="bi bi-currency-dollar"></i></span></p>
        <p class="mb-0">{{ data?.price }}</p>
      </div>
      <div class="text-center" v-tooltip="$parent.$parent.$attrs.words.templates.box.sections">
        <p class="mb-0"><span><i class="bi bi-card-text"></i></span></p>
        <p class="mb-0">{{ data?.sections_count }} {{ $parent.$parent.$attrs.words.templates.box.section }}</p>
      </div>
      <div class="text-center" v-tooltip="$parent.$parent.$attrs.words.templates.box.usage">
        <p class="mb-0"><span><i class="bi bi-people"></i></span></p>
        <p class="mb-0">{{ data?.children?.length }} {{ $parent.$parent.$attrs.words.templates.box.user }}</p>
      </div>
      <div class="text-center" v-tooltip="$parent.$parent.$attrs.words.templates.box.date">
        <p class="mb-0"><span><i class="bi bi-calendar-event"></i></span></p>
        <p class="mb-0">{{ new Date(data?.created_at).toLocaleDateString() }}</p>
      </div>
    </div>

    <div class="content d-flex align-items-center justify-content-between">
       <div class="d-flex">
         <img v-if="data?.user?.image?.name === 'default.png'" class="mrl-1" src="/images/users/default.png">
         <image-component class="mrl-1" v-else :src="data?.user?.image?.name"></image-component>
         <div class="user_info position-relative top-3">
            <p class="mb-0 small"><nuxt-link :to="'/cvs/templates?user_id='+data?.user?.id" target="_blank">{{ data?.user?.username }}</nuxt-link></p>
            <p class="mb-0 small">{{ data?.user?.email }}</p>
         </div>
       </div>
       <a :href="'/cvs/save-template?id='+data?.id"
          class="btn btn-outline-primary" @click="validatePaymentCv('/cvs/save-template?id='+data?.id)">
         {{ data?.user?.id === $auth.user.id ? $parent.$parent.$attrs.words.templates.box.edit_my_template : $parent.$parent.$attrs.words.templates.box.use_this_template }}
       </a>
     </div>
  </div>
</template>

<script>
  import ImageComponent from "../ImageComponent.vue";

  export default {
    name:'TemBox',
    components: {ImageComponent},
    props:['data','delete_control'],
    methods:{
      async validatePaymentCv(url){
        console.log(this.$auth.user);
        event.preventDefault();
        // check this cv not belong to me
        if(this.data?.user?.id !== this.$auth.user.id ){
          // check price
          if(this.data?.price > 0){
            // check if i buy this cv before or not
            await this.$store.dispatch('cvs/templates/checkPaymentTemplate',this.data?.id)
            if(this.$store.getters['cvs/templates/getPaymentSpecificTemplate'] === false){
              // you must buy it first
              return window.open('/checkout?id='+this.data?.id);
            }
          }
        }
        window.open(url);
      }
    },
    mounted() {
      /*console.log(this.$parent.$parent.$attrs.words)*/
    }
  }
</script>

<style scoped lang="scss">
@import "~style/variables";
.cv-template {
  background-color: white;
  border: 1px solid #dddddd;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  transition: 0.5s;
  .cv_content{
    padding: 8px;
    border-top: 1px solid #dddddd;
    span{
      color:$blue;
    }
  }
  .cv-image {
    overflow: hidden;
    height: 300px;
    img {
      width: 100%;
      object-fit: contain;
      transition: 3s;
      position: relative;
      top:0px;
    }
  }
  .content{
    border-top: 1px solid #dddddd;
    padding: 8px;
    .user_info{

    }
    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #dddddd;
    }
  }
}
.del{
  z-index: 9999999;
  background: $red;
  position: absolute;
  top: 2px;
  margin: 8px;
  padding: 5px;
  border-radius: 5px;
  i{
    color:white;
  }
}
</style>
