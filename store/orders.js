import CurrentPageDetectPaginate from "../plugins/CurrentPageDetectPaginate";

export const state = () => ({
  item:{},
  data:[],
  total:0,
  status:true,
})

export const getters = {
  getItem(state) {
    return state.item
  },
  getData(state) {
    return state.data
  },
  getTotal(state){
    return state.total
  }
}

export const mutations = {
  setItem(state,payload){
    state.item = payload;
  },
  InitializeData(state,payload){
    state.data = payload;
  },
  EmptyData(state){
    state.data = [];
  },
  ChangeStatus(state,payload){
    state.status = payload;
  },
  SetTotal(state,payload){
    state.total = payload;
  },
  UpdateData(state,payload){
    if(payload.length > 0) {
      state.data = [...state.data, ...payload]
    }
  },
}

export const actions = {



  async make_order({commit,state},payload){
    commit('loader/updateLoaderMutation', true, {root: true});
    return this.$axios.post('orders/'+payload).then((e) => {
      Toast.fire({
        'icon':e.data.status === 200 ? 'success':'error',
        'title':e.data.message
      })
      this.$router.push('/cvs/save-template?id='+payload)
    }).finally(() => {
      commit('loader/updateLoaderMutation', false, {root: true});
    });
  },


  async allData({commit,state}){
    commit('loader/updateLoaderMutation', true, {root: true});
    return this.$axios.get('orders').then((e) => {
      commit('InitializeData', e.data.data);
    }).finally(() => {
      commit('loader/updateLoaderMutation', false, {root: true});
    });
  },

  async allDataAdminAction({ state,commit},payload = []) {
    commit('loader/updateLoaderMutation',true,{root:true});
    if(
      (Object.keys(payload).length > 0 && payload.hasOwnProperty('empty') ) || (payload instanceof FormData && payload.has('empty'))
    ){
      commit('EmptyData');
      commit('ChangeStatus',true);
    }

    var page = CurrentPageDetectPaginate(payload);
    if(state.status) {
      return this.$axios.post('orders' + page, payload).then((e) => {
        commit('UpdateData', e.data.data);
        commit('SetTotal',e.data.meta.total);
        if(e.data.data.length == 0){
          commit('ChangeStatus',false);
        }
      }).finally(() => {
        commit('loader/updateLoaderMutation', false, {root: true});
      });
    }else{
      commit('loader/updateLoaderMutation', false, {root: true});
    }
  },

}
