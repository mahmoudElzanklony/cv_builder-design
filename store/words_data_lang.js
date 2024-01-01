
export const state = () => ({
  data: [],
})

export const getters = {
  getData(state) {
    return state.data
  },
}

export const mutations = {
  InitializeData(state,payload){
    state.data = payload;
  },
}
