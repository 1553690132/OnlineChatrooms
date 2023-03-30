const Login = () => import(/* webpackChunkName: "chatroom-login" */'@/view/Login.vue')
const Home = () => import(/* webpackChunkName: "chatroom-index" */'@/view/home.vue')
const Comment = () => import(/* webpackChunkName: "chatroom-index" */'@/view/pages/comment/comment.vue')
const Notice = () => import(/* webpackChunkName: "chatroom-index" */'@/view/pages/notice/notice.vue')
const Friends = () => import(/* webpackChunkName: "chatroom-index" */'@/view/pages/friend/friends.vue')

// import Comment from "../view/pages/comment/comment.vue";
// import Friends from "../view/pages/friend/friends.vue";
// import Notice from '@/view/pages/notice/notice.vue';
// import Login from '../view/Login.vue';
// import Home from "@/view/home.vue";

import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            component: Login,
            name: 'Login',
            beforeEnter(to, from, next) {
                sessionStorage.clear()
                next()
            }
        },
        {
            path: '/home',
            component: Home,
            redirect: { name: 'Comment' },
            children: [
                {
                    path: 'comment',
                    component: Comment,
                    name: 'Comment',
                    beforeEnter(to, form, next) {
                        sessionStorage.setItem('current', 0)
                        next()
                    }
                },
                {
                    path: 'friends',
                    component: Friends,
                    name: 'Friends'
                },
                {
                    path: 'notice',
                    component: Notice,
                    name: 'Notice',
                },
            ]
        },
    ],
    history: createWebHistory()
})


router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    if (!sessionStorage.getItem('token')) return next('/login')
    else next()
})

export default router