<template>
<!--  :typeahead-hide-discard="true"-->
  <VoerroTagsInput :element-id="table"
                   v-model="data"
                   :value="data"
                   :placeholder="placeholder ?? 'search what you want'"
                   @keyup="searchTags"
                   :existing-tags="tags_data_getter"
                   :only-existing-tags="true"
                   @tag-added="handleTagAdded"
                   @tag-removed="handleTagRemoved"
                   :typeahead="true"></VoerroTagsInput>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
  name: "TagsInputs",
  props:['table','data','placeholder','dynamicwriting'],
  data(){
    return {
      maped_data:{},
    }
  },
  mounted() {
    this.maped_data  = {
      data:this.data,
      input_number:$(this.$el).parent().parent().index(),
      section_number:this.dynamicwriting == true ? $(this.$el).parentsUntil('.section').last().parent().parent().index():$(this.$el).find('input').eq(0)
    }
  },
  computed:{
    ...mapGetters({
       'tags_data_getter':'tags_input/getData'
    })
  },
  watch:{
    data(new_val){
      this.maped_data.data = new_val;
     // console.log('watched ========> ',new_val)
    }
  },
  methods:{
    ...mapActions({
       'get_tags_action':'tags_input/getTags',
    }),
    async searchTags() {
      var search = event.target.value;
      if(search.length > 0) {
        var data = {
          search: search,
          table: this.table.replace('job_','')
        }
       await this.get_tags_action(data);
      }
    },
    handleTagAdded(newTag) {

      this.$emit('get_all_tags',this.maped_data);
    },
    handleTagRemoved(removedTag) {
      this.$emit('get_all_tags',this.maped_data);
      // Perform any actions needed after a tag is removed
    }
  }
}
</script>

<style scoped>

</style>
