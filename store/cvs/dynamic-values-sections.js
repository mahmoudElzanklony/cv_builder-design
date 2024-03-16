
export const state = () => ({
  data:[]
})

export const getters = {
  getData(state) {
    return state.data
  },
}

export const mutations = {
  setData(state,payload){
    state.data = payload;
  },
  removeFromData(state,payload){
    let index = state.data.findIndex((item)=>{
      return item.id ==  payload.id;
    });
    if(index >= 0) {
      state.data.splice(index, 1);
    }
  },
  UpdateData(state,key,payload){
    if(payload.length > 0) {
      state[key] = [...state[key], ...payload]
    }
  },
}

