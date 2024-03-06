<template>
  <div class="visa-monitor">
    <div class="layout_bk p-3">
      <div class="visa-monitor-head d-flex justify-content-between">
        <img src="/images/icons/visa.png">
        <img src="/images/icons/chip.jpg">
      </div>
      <div class="visa-monitor-body">
        <div class="mt-3 mb-3 text-center d-flex">
          <p>
            <span class="big mrl-1" v-for="i in 4">0000</span>
          </p>
        </div>
      </div>
      <div class="visa-monitor-footer d-flex align-items-center justify-content-between mb-2">
        <div>
          <p class="mb-1">{{ $parent.$parent.$attrs.words.placeholder }}</p>
          <p>{{ placeholder }}</p>
        </div>
        <div>
          <p>{{ $parent.$parent.$attrs.words.expire_date }}</p>
          <p>
            {{expire['month'] < 10 ? '0'+expire['month']:expire['month']}}-{{expire['year']}}
<!--            {{ expire.split('-').splice(0,1).toString()+'/'+expire.split('-').pop().toString() }}-->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VisaMapingComponent",
  props:['expire','placeholder'],
  methods:{

  },
}
</script>

<style lang="scss" scoped>
@import "~style/variables";

.visa-monitor{
  background-image: url("/images/packages/visa_bk.jpg");
  background-size: cover;
  height: 340px;
  background-position: center;
  border-radius: 8px;
  overflow: hidden;
  p,span{
    color:white;
  }
  .layout_bk{
    height: 100%;
    height: 100%;
    background-color: #0a58ca3b;
  }
  .visa-monitor-head{
    img{
      height: 50px;
      border-radius: 8px;
    }
  }
  .visa-monitor-body{
    height: calc(100% / 1.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .visa-monitor-footer{

  }
}

</style>
