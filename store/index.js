import cookie from "cookie";

export default {
  state:()=>({
    data: [],
    lang:'en',
  }),
  getters:{
    getData(state) {
      return state.data
    },
    getLang(state) {
      return state.lang
    },
  },
  mutations:{
    InitializeData(state,payload){
      state.data = payload;
    },
    InitializeLang(state,payload){
      state.lang = payload;
    },
  },
  actions:{
    nuxtServerInit ({ commit }, { req }) {

      var lang = cookie.parse(req.headers.cookie || '').lang;
      if(lang == undefined){
        lang = 'en';

      }
      const words = require(`~/lang/${lang}/words`).default;
      commit('words_data_lang/InitializeData',words)

    }
  }
}

