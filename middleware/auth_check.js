import cookie from "cookie";

export default function ({ store, redirect, route , req , $auth}) {
  var auth = ['login','register','forget'];
  let unauth = ['privacy','terms','conditions','reset','new_password','about'];


  if(route.name === 'index') {
    console.log(route.name);
    console.log(route.name === 'index');
    return false;
  }else if (route.path.indexOf('dashboard') >= 0) {
    console.log('dashboard');
    if ($auth.loggedIn != true) {
      return redirect('/')
    } else if ($auth.$state.user.hasOwnProperty('role') && $auth.$state.user.role.name != 'admin') {
      return redirect('/')
    }
  }else if ($auth.loggedIn != true) {
    console.log('goooooooooooooooooooooooooooooooo')

    let check_unauth_page = false;
    for (let page of unauth) {
      if (route.path.indexOf(page) >= 0) {
        check_unauth_page = true;
        break;
      }
    }
    console.log('prepend to go')
    if (check_unauth_page == false && (!(route.path.indexOf('login') >= 0 || route.path.indexOf('register') >= 0) )) {
      console.log('gooooooo to login'); return  false;
      return redirect('/auth/login')
    }


  }





}
