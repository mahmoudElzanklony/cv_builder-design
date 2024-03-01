
export const state = () => ({
  profit:{},
  data:[],
})

export const getters = {
  getProfit(state) {
    return state.profit
  },
}

export const mutations = {
  setProfit(state,payload){
    state.profit = payload;
  },
}

export const actions = {

  async save_profit({commit,state}){
    var data = new FormData(event.target);
    commit('loader/updateLoaderMutation', true, {root: true});
    return this.$axios.post('dashboard/profit/save',data).then((e) => {
      Toast.fire({
        'icon':'success',
        'title':e.data.message
      })
    }).finally(() => {
      commit('loader/updateLoaderMutation', false, {root: true});
    });
  },

}
