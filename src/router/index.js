import Comment from "../view/pages/comment/comment.vue"
import Video from "../view/pages/video.vue"
import Friends from "../view/pages/friends.vue"
import Remind from "../view/pages/remind.vue"
import Setting from "../view/pages/setting.vue"
import { createRouter, createWebHistory } from "vue-router"

export default createRouter({
    routes: [
        {
            path: '/',
            redirect: '/comment',
        },
        {
            path: '/comment',
            component: Comment,
            name: 'Comment'
        },
        {
            path: '/video',
            component: Video,
            name: 'Video'
        },
        {
            path: '/friends',
            component: Friends,
            name: 'Friends'
        },
        {
            path: '/remind',
            component: Remind,
            name: 'Remind'
        },
        {
            path: '/setting',
            component: Setting,
            name: 'Setting'
        }
    ],
    history: createWebHistory()
})
