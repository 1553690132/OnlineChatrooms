import Comment from "../view/pages/comment/comment.vue"
import Video from "../view/pages/video.vue"
import Friends from "../view/pages/friends.vue"
import Remind from "../view/pages/remind.vue"
import Setting from "../view/pages/settting/setting.vue"
import Login from '../view/Login.vue'
import Home from "@/view/home.vue"
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
                    name: 'Comment'
                },
                {
                    path: 'video',
                    component: Video,
                    name: 'Video'
                },
                {
                    path: 'friends',
                    component: Friends,
                    name: 'Friends'
                },
                {
                    path: 'remind',
                    component: Remind,
                    name: 'Remind'
                },
                {
                    path: 'setting',
                    component: Setting,
                    name: 'Setting',
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