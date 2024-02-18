import CurrentPageDetectPaginate from "../../plugins/CurrentPageDetectPaginate";
export const state = () => ({
  item:null,
  data:[],
  total:0,
  status:true,
  paymentSpecificTemplate:false,
})


export const getters = {
  getTotal(state){
    return state.total;
  },
  getItem(state) {
    return state.item
  },
  getData(state) {
    return state.data
  },
  getPaymentSpecificTemplate(state){
    return state.paymentSpecificTemplate
  }
}

export const mutations = {
  SetTotal(state,payload){
    state.total = payload;
  },
  setItem(state,payload){
    state.item = payload;
  },
  setData(state,payload){
    state.data = payload;
  },
  EmptyData(state){
    state.data = [];
  },
  ChangeStatus(state,payload){
    state.status = payload;
  },
  UpdateData(state,payload){
    if(payload.length > 0) {
      state.data = [...state.data, ...payload]
    }
  },
  setPaymentSpecificTemplate(state,payload){
    state.paymentSpecificTemplate = payload;
  }
}

export const actions = {

  async getTemplateInfoAction({commit},payload){
    return this.$axios.get('templates/all-info/' + payload).then((e) => {
      commit('setItem',e.data.data)
    });
  },

  async getTemplatesAction({commit,state},payload = []){
    if(Object.keys(payload).length > 0 && payload.hasOwnProperty('empty')){
      commit('EmptyData');
      commit('ChangeStatus',true);
    }
    try{
      if(payload instanceof FormData){
        if(payload.has('empty')){
          commit('EmptyData');
          commit('ChangeStatus',true);
        }
      }
    }catch (e){}

    var page = CurrentPageDetectPaginate(payload);
    console.log(state.status)
    console.log(page)
    if(state.status) {
      return this.$axios.post('templates' + page, payload).then((e) => {
        commit('UpdateData', e.data.data);
        commit('SetTotal',e.data.meta.total);
        if(e.data.data.length === 0){
          commit('ChangeStatus',false);
        }
      }).finally(() => {
        commit('loader/updateLoaderMutation', false, {root: true});
      });
    }
  },

  async checkPaymentTemplate({commit,state},payload ){
    return this.$axios.post('templates/check-payment/'+payload).then((e) => {
      console.log(e.data);
      commit('setPaymentSpecificTemplate', e.data);
    })
  },

}
