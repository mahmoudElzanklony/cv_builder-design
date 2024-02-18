import {mapGetters , mapActions} from "vuex";

export default{
  name:'percentageStore',
  methods:{
    ...mapActions({
      'percentageAction':'percentages/allData'
    }),
    FilterPercentageData(payload = []){
      this.percentageAction(payload);
    }
  },
  computed:{
    ...mapGetters({
      'percentageItem':'percentages/getItem',
      'percentageData':'percentages/getData',
    })
  }
}
