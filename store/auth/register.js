import formValidation from '/validation/formValidation';

export const actions = {
  async registerAction({ state,commit }) {
    let router = this.$router;
    var target = event.target;
    var data = new FormData(target);
    data.append('type','client')
    commit('loader/updateLoaderMutation',true,{root:true});
    return this.$axios.post('register',data).then((e)=>{
      formValidation(e.data,target,'/auth/login',true,router);
    }).finally(() => {
      commit('loader/updateLoaderMutation',false,{root:true});
    });
  },

}
