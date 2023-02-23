import $axios from "./index";

export const getChatFriend = async () => {
    const res = await $axios.post('friend/chatList');
    return res.data;
}

export const getChatMsg = async params => {
    const res = await $axios.post('friend/chatMsg', { friendId: params.id });
    return res.data;
}