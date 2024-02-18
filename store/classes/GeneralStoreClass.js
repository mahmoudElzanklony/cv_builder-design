class GeneralStoreClass{
  constructor(urls , state, mutations, getters , actions ) {
    console.log(urls)
    this.state = state || {
      data:[],item:{}
    };
    this.mutations = mutations || {
      setItem(state,payload){
        state.item = payload
      },
      setData(state,payload){
        if(Array.isArray(payload)) {
          state.data = payload
        }else{
          state.item = payload
        }
        console.log(state)
      }
    };
    this.actions = actions || {
      async allData({commit,state},data){
          commit('loader/updateLoaderMutation', true, {root: true});
          console.log(urls.data_method)
          return this.$axios[urls.data_method](urls['data'],data).then((e) => {
            commit('setData', e.data.data);
          }).finally(() => {
            commit('loader/updateLoaderMutation', false, {root: true});
          });

      },
    };
    this.getters = getters || {
      getData(state) {
        return state.data
      },
      getItem(state) {
        return state.item;
      },
    };
  }

}
export default GeneralStoreClass
