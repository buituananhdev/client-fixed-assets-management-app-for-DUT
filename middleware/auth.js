export default function ({ app, redirect }) {
    // Nếu người dùng chưa đăng nhập, redirect về trang đăng nhập
    if (!app.$auth.loggedIn) {
        return redirect('/');
    }
    else return redirect('/home')
}
