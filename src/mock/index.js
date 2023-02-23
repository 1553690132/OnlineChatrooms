const Mock = require("mockjs")

let friendChatList = Mock.mock([
    {
        img: "",
        name: "艾伦·耶格尔",
        detail: "地鸣将至。",
        lastMsg: "Rumbling, it's coming.",
        id: "1002",
        headImg: require("@/assets/img/head_portrait1.jpg"),

    },
    {
        img: "",
        name: "希斯特利亚",
        detail: "Give one's heart",
        lastMsg: "test data",
        id: "1003",
        headImg: require("@/assets/img/head_portrait2.jpg"),

    },
    {
        img: "",
        name: "埃尔文",
        detail: "兵士たち、進め",
        lastMsg: "献出心脏",
        id: "1004",
        headImg: require("@/assets/img/head_portrait3.jpg"),
    },
])

Mock.mock(/friend\/chatList/, 'post', () => {
    return friendChatList;
})