// export default function (context) {
//     if (!context.store.getters.isAuthenticated) {
//         context redirect('/');
//     }
//     
// }
// middleware/auth.js

// middleware/auth.js

// export default function ({ app, redirect }) {
//     // Sử dụng auth.middleware() để tạo middleware
//     return app.$auth.middleware(
//         (to, from, next) => {
//             if (!app.$auth.loggedIn) {
//                 // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
//                 console.log("logged in")
//                 return redirect('/aaa');
//             }
//             console.log("not login")
//             // Nếu người dùng đã đăng nhập, tiếp tục chạy middleware
//             return next();
//         },
//     );
// }


