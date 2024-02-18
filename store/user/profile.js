import formValidation from "../../validation/formValidation";

export const state = () => ({
  data:[],
})

export const getters = {
  getData(state) {
    return state.data;
  },
}

export const mutations = {


}

export const actions = {
  // update personal info
  async update_personal_data({state , commit}){
    var target = event.target;
    var data = new FormData(target);
    return this.$axios.post('user/update-personal-info',data).then((e)=>{
      formValidation(e.data,target);
    }).catch((e)=>{
      console.log(e);
    });
  },


}
