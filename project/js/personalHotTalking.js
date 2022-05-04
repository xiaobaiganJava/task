// 设置用户信息和头像
if (getCookie("password") != '') {
    topBar_userHeadImg.src = "http://" + getCookie("headImg");
    topBar_username.innerHTML = getCookie("username");
};
// 定义一个全局变量来获取主页传过来的id
var personalId = 0;
// 定义一个函数来切割主页过来的链接
function getUserId() {
    let linkString = location.search;
    let uid = linkString.split("=")[1];
    personalId = uid;
    console.log(personalId);
};
getUserId();
// 分页
// 分页
let current1 = 1; //当前页数
let maxLength1 = 0; // 最大长度
let itemSize1 = 5; //一页展示的数据
let maxPage1 = document.querySelector(".maxPage1");
let currentPage1 = document.querySelector(".currentPage1");
let prePage1 = document.querySelector(".prePage1");
let nextPage1 = document.querySelector(".nextPage1");
// 获取最大长度
(function() {
    let userHomepageJSON = {
        "uid": getCookie("id"),
        "id": personalId
    }
    let userHomepageJSONString = JSON.stringify(userHomepageJSON);
    let userHomepageData = getJSON('POST', 'http://175.178.51.126:8091/smallA/selectDiaryByUserId', userHomepageJSONString).then(res => {
        let tips = JSON.parse(res);
        maxLength1 = parseInt(tips.data.length);
        if (maxLength1 % itemSize1 != 0) {
            maxPage1.innerHTML = (maxLength1 - maxLength1 % itemSize1) / itemSize1 + 1;
        } else {
            maxPage1.innerHTML = maxLength1 / itemSize1;
        }
    })
})();
// 分页
prePage1.onclick = function() {
    if (current1 > 1) {
        current1 = current1 - 1;
        personalAllTalking()
    }
}
nextPage1.onclick = function() {
        let maxpagetag = 0;
        if (maxLength1 % itemSize1 != 0) {
            maxpagetag = (maxLength1 - maxLength1 % itemSize1) / itemSize1 + 1;
        } else {
            maxpagetag = maxLength1 / itemSize1;
        }
        if (current1 < maxpagetag) {
            current1 += 1;
            personalAllTalking()
        }
    }
    // 分页查询该用户所有动态
function personalAllTalking() {
    let userJSON = {
        "uid": getCookie("id"),
        "id": personalId,
        "current": current1,
        "size": itemSize1
    }
    let userJSONString = JSON.stringify(userJSON);
    let userData = getJSON('POST', 'http://175.178.51.126:8091/smallA/selectDiaryByUserId', userJSONString).then(res => {
        let tips = JSON.parse(res);
        if (tips.code >= 200 && tips.code < 300) {
            console.log(tips);
            forum_container.innerHTML = '';
            for (let i = 0; i < tips.data.list.length; i++) {
                // 这里的逻辑是一个大的盒子  然后一个一个小盒子添加进去
                let forum_content = document.createElement('div');
                forum_content.className = 'forum_content';
                // 用户名与头像
                let forum_usernameAndHeadImg = document.createElement('div');
                let userHeadImg = document.createElement('img');
                let Username = document.createElement('span');
                forum_usernameAndHeadImg.className = 'forum_usernameAndHeadImg';
                userHeadImg.className = 'userHeadImg';
                Username.className = 'Username';
                forum_content.appendChild(forum_usernameAndHeadImg);
                forum_usernameAndHeadImg.appendChild(Username);
                forum_usernameAndHeadImg.appendChild(userHeadImg);
                Username.innerHTML = tips.data.list[i].author.username;
                userHeadImg.src = "http://" + tips.data.list[i].author.headImg;
                userHeadImg.setAttribute("data-id", tips.data.list[i].author.id);
                Username.innerHTML = tips.data.list[i].author.username;
                // 标题
                let forum_title = document.createElement('div');
                let title = document.createElement('span');
                forum_title.className = 'forum_title';
                title.className = 'title';
                forum_content.appendChild(forum_title);
                forum_title.appendChild(title);
                title.innerHTML = tips.data.list[i].title;
                // 文本框
                let forum_text = document.createElement('div');
                let text = document.createElement('p');
                forum_text.className = 'forum_text';
                text.className = 'text';
                forum_content.appendChild(forum_text);
                forum_text.append(text);
                text.innerHTML = tips.data.list[i].content;
                // 图片区域
                let forum_Img = document.createElement('div');
                forum_Img.className = 'forum_Img';
                forum_content.append(forum_Img);
                // 时间与点赞
                let forum_timeAndLikeNum = document.createElement('div');
                let time = document.createElement('div');
                let likeImg = document.createElement('img');
                let likeNum = document.createElement('div');
                forum_timeAndLikeNum.className = 'forum_timeAndLikeNum';
                time.innerHTML = tips.data.list[i].createTime;
                likeImg.src = "../image/" + tips.data.list[i].isLike + "like.png";
                likeImg.setAttribute("data-did", tips.data.list[i].id);
                likeImg.setAttribute("data-ifLike", tips.data.list[i].isLike);
                likeNum.innerHTML = tips.data.list[i].likesNum;
                time.className = 'time';
                likeImg.className = 'likeImg';
                likeNum.className = 'likeNum';
                forum_timeAndLikeNum.append(time);
                forum_timeAndLikeNum.append(likeImg);
                forum_timeAndLikeNum.append(likeNum);
                forum_content.appendChild(forum_timeAndLikeNum);
                // 查看详情
                let forum_Viewmore = document.createElement('a');
                forum_Viewmore.className = 'forum_Viewmore';
                forum_content.appendChild(forum_Viewmore);
                forum_Viewmore.innerHTML = '查看详情';
                forum_Viewmore.setAttribute("talkingid", tips.data.list[i].id);
                for (let j = 0; j < tips.data.list[i].images.length; j++) {
                    let forum_talkingImg = document.createElement('img');
                    forum_talkingImg.className = 'forum_talkingImg';
                    forum_talkingImg.src = "http://" + tips.data.list[i].images[j].img;
                    forum_Img.append(forum_talkingImg);
                };
                forum_container.appendChild(forum_content);
            }
            currentPage1.innerHTML = current1;
        } else {
            alert('进入失败');
        }
    });
}
personalAllTalking();
forum_container.addEventListener("click", function(e) {
    if (e.target.className == "likeImg") {
        let tag = e.target.getAttribute("data-ifLike");
        if (tag == "true") {
            tag = false;
        } else {
            tag = true;
        }
        let likeJSON = {
            uid: getCookie("id"),
            id: e.target.getAttribute("data-did"),
            ifLike: tag
        }
        let likeJSONString = JSON.stringify(likeJSON);
        let likeData = getJSON('POST', 'http://175.178.51.126:8091/smallA/likeDiary', likeJSONString).then(res => {
            let tips = JSON.parse(res);
            console.log(tips);
            if (tips.code >= 200 && tips.code < 300) {
                personalAllTalking()
            } else {
                personalAllTalking()
            }
        })
    };
});