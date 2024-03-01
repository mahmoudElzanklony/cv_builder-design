class GeneralStoreClass{
  constructor(urls , state, mutations, getters , actions ) {
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
      }
    };
    this.actions = actions || {
      async allData({commit,state},data){
          let router = this.$router;
          commit('loader/updateLoaderMutation', true, {root: true});
          return this.$axios[urls.data_method](urls['data'],data).then((e) => {
            if(e.data.data == null && e.data.status === 200){
              Toast.fire({
                icon:'success',
                title:e.data.message
              });
              router.push(urls.url);
            }
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
