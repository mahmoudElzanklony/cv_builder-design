import cookie from "cookie";

export default function ({ store, redirect, route , req , $auth}) {
  var auth = ['login','register','forget'];
  console.log(route.path)
  if($auth.loggedIn != true){
    if(!(route.path.indexOf('login') >= 0 || route.path.indexOf('register') >= 0) && route.path !== '/'){
      return redirect('/auth/login')
    }

  }

  if(route.path.indexOf('dashboard') >= 0){
    if($auth.loggedIn != true){
       return redirect('/')
    }else if($auth.$state.user.hasOwnProperty('role') && $auth.$state.user.role.name != 'admin'){
      return redirect('/')
    }
  }



}
