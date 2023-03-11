export default function () {
    // Nếu người dùng chưa đăng nhập, redirect về trang đăng nhập
    const check = localStorage.getItem('auth._token.local');
    if (check != "") {
        return redirect('/home?page=1');
    }
    else return redirect('/');
}
