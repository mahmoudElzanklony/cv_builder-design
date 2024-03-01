import GeneralStoreClass from '../classes/GeneralStoreClass'
class save_template extends GeneralStoreClass{
  constructor() {
    super({data_method:'post',data:'/users-cvs/save',url:'/cvs'});
    // You can add additional state, mutations, actions, and getters specific to this store
  }
}

export default new save_template()

/*

export const state = () => ({
  item:null,
  data:[],
})

export const getters = {
  getData(state) {
    return state.data
  },
  getItem(state) {
    return state.item;
  },
}

export const mutations = {

  setItem(state,payload){
    state.item = payload
  },
  setData(state,payload){
    state.data = payload
  },
  UpdateData(state,key,payload){
    if(payload.length > 0) {
      state[key] = [...state[key], ...payload]
    }
  },
}

export const actions = {



  async allDataAction({commit,state}){
    var target = event.target;
    var data = new FormData(target)
    return this.$axios.post('/users-cvs/save',data).then((e) => {
      commit('setData', e.data.data);
    }).finally(() => {
      commit('loader/updateLoaderMutation', false, {root: true});
    });
  },

}
*/
