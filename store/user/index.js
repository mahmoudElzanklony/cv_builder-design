import formValidation from "../../validation/formValidation";
import Vue from "vue";

export const state = () => ({
  data:[],
})

export const getters = {
  getData(state) {
    return state.data;
  },

}

export const mutations = {
  setData(state,payload){
     state.data = payload;
  },
  UpdateData(state,payload){
    let id = state.data.findIndex((item)=>{
      return item.id ==  payload.id;
    });
    if(id >= 0){
      Vue.set(state.data, id, payload);
    }else{
      state.data.push(payload);
    }
    console.log(id);
    console.log(state.data);
  },
}

export const actions = {
  // get all users
  async getUsersAction({state , commit},payload = []){
    return this.$axios.post('/dashboard/users',payload).then((e)=>{
      commit('setData',e.data.data);
    }).catch((e)=>{
      console.log(e);
    });
  },
  async updateUser({ state,commit }) {
    var target = event.target;
    var data = new FormData(target);
    return this.$axios.post('dashboard/users/update',data)
      .then((e)=>{
        formValidation(e.data,target,'',true);
        if(!(e.data.hasOwnProperty('errors'))) {
          commit('UpdateData', e.data.data)
        }
      });
  },



}
