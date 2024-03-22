import formValidation from '/validation/formValidation';
export const state = () => ({
  user_info: {},
  auth_user_validation:null,
})



export const getters = {
  get_auth_user_validation(state) {
    return state.auth_user_validation
  },
}

export const mutations = {
  InitializeData(state,payload){
    state.user_info = payload;
  },
  UpdateAuthUserValidation(state,payload){
     state.auth_user_validation = payload
  },
}


export const actions = {
  async loginAction({ state,commit }) {
    let router = this.$router;
    var target = event.target;
    // Clear the redirect path
    this.$auth.$storage.setUniversal('redirect', null)
    // commit('loader/updateLoaderMutation',true,{root:true});


      await this.$auth.loginWith('local', {
        data: new FormData(target)
      }).then((e)=>{
        if(e.data.status === 200 || e.data.hasOwnProperty('id')) {
           let data = {
             user:e.data,
             website:'skillar'
           }
           localStorage.setItem('loginExternalSite',JSON.stringify(data))
           router.push('/');
        }else{
          console.log('error');
          Toast.fire({
            icon:'error',
            title:e.data.errors
          });
          return false;
        }
      }).catch((e)=>{
        Toast.fire({
          icon:'error',
          title:e.response.data.errors
        });
        return false;

      })




  },

  async deleteUserData(){
    console.log('delete user data');
    localStorage.removeItem('user_info');
    localStorage.removeItem('token');
    sessionStorage.clear();
    document.cookie = "token=; expires=Thu, 01 Jan 1990 00:00:00 UTC; path=/;";
    document.cookie = "user_info=; expires=Thu, 01 Jan 1990 00:00:00 UTC; path=/;";
    window.location = '/auth/login';
  },


  async validateAuthAction({state,commit,dispatch}){
    var data = new FormData();

    if(!(localStorage.hasOwnProperty('token'))){
      return false;
    }
    if(localStorage.hasOwnProperty('token')){
      data.append('token',localStorage.token);
    }
    return this.$axios.post('validate-user',data,{

    }).then((e)=>{
      if(e.status == 200){
        sessionStorage.setItem('authenticated',true);
        commit('UpdateAuthUserValidation',true);
      }
    }).catch((e)=>{
      dispatch('deleteUserData');
      commit('UpdateAuthUserValidation',false);

    })
  },

  async loginBySerial({state,commit,dispatch},serial_number){
    let data = new FormData();
    data.append('serial_number',serial_number);
    await this.$auth.loginWith('local', {
      data: data
    }).then((e)=>{
      if(e.data.status === 200 || e.data.hasOwnProperty('id')) {
        window.location = document.URL;
      }
    })
  },

  async logoutAction({state,commit,dispatch}){
    return this.$axios.post('logout').then((e)=>{
      console.log('logout.......................');
      if(e.data.status == 200){
        dispatch('deleteUserData')
      }
    })
  }

}
