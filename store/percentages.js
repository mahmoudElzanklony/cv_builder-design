
export const state = () => ({
  item:{},
  data:[],
})

export const getters = {
  getItem(state) {
    return state.item
  },
  getData(state) {
    return state.data
  },
}

export const mutations = {
  setItem(state,payload){
    state.item = payload;
  },
  InitializeData(state,payload){
    state.data = payload;
  },
  UpdateData(state,key,payload){
    if(payload.length > 0) {
      state[key] = [...state[key], ...payload]
    }
  },
}

export const actions = {

  async allData({commit,state},payload){
    commit('loader/updateLoaderMutation', true, {root: true});
    return this.$axios.post('percentages',payload).then((e) => {
      if(Array.isArray(e.data.data)){
        commit('InitializeData', e.data.data);
      }else{
        commit('setItem', e.data.data);
      }

    }).finally(() => {
      commit('loader/updateLoaderMutation', false, {root: true});
    });
  },

}
