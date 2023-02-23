import $axios from "./index";

export const getChatFriend = () => {
    return $axios.post('friend/chatList').then(res => res.data)
}