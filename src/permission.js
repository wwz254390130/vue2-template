import router from './router';
// import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条样式
// import { Message } from 'element-ui';
import { getToken } from '@/utils/auth'; // 验权

const whiteList = ['/login']; // 不重定向白名单

router.beforeEach((to, from, next) => {
    NProgress.start();

    if (getToken()) {
        // 已登录，判断是否是登录页，是则跳转首页
        if (to.path === '/login') {
            next({ path: '/' });
            NProgress.done(); // 如果当前页面是仪表板，则不会触发afterEach挂钩，因此手动处理它
        // } else if (store.getters.roles.length === 0) {
        //     store.dispatch('GetInfo').then((res) => { // 拉取用户信息
        //         next();
        //     }).catch((err) => {
        //         store.dispatch('FedLogOut').then(() => {
        //             Message.error(err || 'Verification failed, please login again');
        //             next({ path: '/' });
        //         });
        //     });
        } else {
            next();
        }
    } else if (whiteList.indexOf(to.path) !== -1) {
        // 未登录，但在白名单中，直接跳转
        next();
    } else {
        // 未登录，不在白名单，跳转登录页
        next('/login');
        // 或跳转s.cogobuy.com的登录页
        // window.location.href = '';
        NProgress.done();
    }
});

router.afterEach(() => {
    NProgress.done(); // 结束Progress
});
