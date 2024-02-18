<template>
  <div name="flex-direction" class="mb-3">
    <label class="blue">{{ words.cvs.appearance }}</label>
    <div class="row">
      <div class="col-4 mb-1 position-relative" v-for="i in words.cvs.appearances">
        <input class="color_radio box_radio w-100" type="radio"
               :name="input_name"
               @change="$emit('callAppearanceStyle')"
               :value="i['value']" >

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 47 24" class="xssm:w-12 w-10" v-if="i['value'] === 'column'">
          <rect width="44.971" height="4.878" x="1.011" y="0.523" fill="currentColor" stroke="currentColor" rx="1.5"></rect>
          <rect width="44.971" height="4.878" x="1.011" y="9.339" fill="currentColor" stroke="currentColor" rx="1.5"></rect>
          <rect width="44.971" height="4.878" x="1.011" y="18.155" fill="currentColor" stroke="currentColor" rx="1.5"></rect>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 47 23" class="xssm:w-12 w-10">
          <rect width="20.701" height="4.878" x="0.818" y="0.953" fill="currentColor" stroke="currentColor" rx="1.5"></rect>
          <rect width="20.701" height="4.878" x="25.479" y="0.953" fill="currentColor" stroke="currentColor" rx="1.5"></rect>
          <rect width="45.361" height="4.878" x="0.818" y="8.896" fill="currentColor" stroke="currentColor" rx="1.5"></rect>
          <rect width="30.565" height="4.878" x="0.818" y="16.838" fill="currentColor" stroke="currentColor" rx="1.5"></rect>
          <rect width="10.837" height="4.878" x="35.345" y="16.838" fill="currentColor" stroke="currentColor" rx="1.5"></rect>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'AppearanceElementsStyleCvComponent',
  props:['words','input_name']
}
</script>

<style scoped lang="scss">
@import "~style/variables";
input{
  height: 40px;
}
svg{
  position: absolute;
  width: 40px;
  left: 35%;
  top: 25%;
  color:$blue;
  z-index: 0;
}
</style>
