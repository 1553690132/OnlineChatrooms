import $axios from "./index";

export const getChatFriend = async () => {
    const res = await $axios.post('http://localhost:8080/friend/chatList');
    return res.data;
}

export const getChatMsg = async params => {
    const res = await $axios.post('http://localhost:8080/friend/chatMsg', { friendId: params.id });
    return res.data;
}
