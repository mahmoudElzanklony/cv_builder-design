
export const state = () => ({
  first_section:null,
  sections:[],
  selected_sessions_from_popup:[],
})

export const getters = {
  getFirstSection(state) {
    return state.first_section
  },
  getSections(state) {
    return state.sections
  },
  getSelectedSessionsFromPopUp(state) {
    return state.selected_sessions_from_popup
  },
}

export const mutations = {
  setFirstSection(state,payload){
    state.first_section = payload;
  },
  pushInfoSelectedSessionsFromPopup(state,payload){
     // check if section is added before or not
    let updatedPayload = { ...payload };
    console.log(updatedPayload);
    let index = state.selected_sessions_from_popup.findIndex((item)=>{
      return item.id ==  updatedPayload.id;
    });
    /*if(index >= 0){
      updatedPayload['name'] = '';
    }*/
    state.selected_sessions_from_popup.push(updatedPayload);
  },
  removeSessionFromSelectedSessions(state,payload){
    let index = state.selected_sessions_from_popup.findIndex((item)=>{
      return item.id ==  payload.id;
    });
    if(index >= 0) {
      state.selected_sessions_from_popup.splice(index, 1);
    }

  },
  getSections(state,payload){
    state.sections = payload;
  },
  UpdateData(state,key,payload){
    if(payload.length > 0) {
      state[key] = [...state[key], ...payload]
    }
  },
}

export const actions = {

  async firstSectionAction({commit},payload = "first"){
    return this.$axios.get('sections/' + payload).then((e) => {
      commit('setFirstSection',e.data.data)
    });
  },

  async allSectionsAction({commit,state}){
    if(state.sections.length == 0) {
      commit('loader/updateLoaderMutation', true, {root: true});
      return this.$axios.get('sections/').then((e) => {
        commit('getSections', e.data.data);
        if(state.selected_sessions_from_popup.length == 0){
          commit('pushInfoSelectedSessionsFromPopup',e.data.data[0]);
        }
      }).finally(() => {
        commit('loader/updateLoaderMutation', false, {root: true});
      });
    }
  },

}
