var changePassword = document.querySelector('.changePassword');
var list = changePassword.querySelectorAll('li');
var changePassword_oldPasswordBox = document.querySelector('.changePassword_oldPasswordBox');
var changePassword_emailCode = document.querySelector('.changePassword_emailCode');
var changePassword_returnLogin = document.querySelector('.changePassword_returnLogin');
var changePassword_returnLogin1 = document.querySelector('.changePassword_returnLogin1');
var login_personMessage_password_forget = document.querySelector('.login_personMessage_password_forget');
var login_personMessage_password_forget1 = document.querySelector('.login_personMessage_password_forget1');
var changePassword_button = document.querySelector('.changePassword_button');
var changePassword_button1 = document.querySelector('.changePassword_button1');
var changePassword_oldPassword = document.querySelector('.changePassword_oldPassword');
var changePassword_username = document.querySelector('.changePassword_username');
var changePassword_newPassword = document.querySelector('.changePassword_newPassword');
var changePassword_email = document.querySelector('.changePassword_email');
var changePassword_code = document.querySelector('.changePassword_code');
var changePassword_getCode = document.querySelector('.changePassword_getCode');
var changePassword_newPassword1 = document.querySelector('.changePassword_newPassword1');

//切换登录与修改密码
login_personMessage_password_forget.onclick = function() {
    login.style.display = 'none';
    changePassword.style.display = 'block';
}
login_personMessage_password_forget1.onclick = function() {
    login.style.display = 'none';
    changePassword.style.display = 'block';
}
changePassword_returnLogin.onclick = function() {
    login.style.display = 'block';
    changePassword.style.display = 'none';
}
changePassword_returnLogin1.onclick = function() {
    login.style.display = 'block';
    changePassword.style.display = 'none';
}

//修改密码的tab栏
for (var i = 0; i < list.length; i++) {
    list[i].setAttribute('index1', i);
    list[i].onclick = function() {
        for (var i = 0; i < list.length; i++) {
            list[i].className = '';
        }
        this.className = 'changecurrent';
        //内容部分
        let index1 = this.getAttribute('index1');
        if (index1 == 0) {
            changePassword_oldPasswordBox.style.display = 'block';
            changePassword_emailCode.style.display = 'none';
        } else {
            changePassword_oldPasswordBox.style.display = 'none';
            changePassword_emailCode.style.display = 'block';
        }
    }
}

//用旧密码修改密码
changePassword_button.onclick = function() {
    var changePasswordUsername = changePassword_username.value;
    var changePasswordOldPassword = changePassword_oldPassword.value;
    var changePasswordNewPassword = changePassword_newPassword.value;
    var changePasswordJSON = {
        "oldPassword": changePasswordOldPassword,
        "username": changePasswordUsername,
        "newPassword": changePasswordNewPassword
    };
    var changePasswordJSONString = JSON.stringify(changePasswordJSON);
    var changePasswordData = getJSON('POST', 'http://175.178.51.126:8091/smallA/updatePwd', changePasswordJSONString).then(res => {
        let tips = JSON.parse(res)
        console.log(res);
        if (tips.code > 400) {
            alert(tips.msg);
        } else {
            alert('修改成功');
            console.log(tips.msg);
        }
    });
}

//获取邮箱验证码
changePassword_getCode.onclick = function() {
    var changePasswordEmail = changePassword_email.value;
    var change_Password_JSON = {
        "email": changePasswordEmail,
    };
    var change_Password_JSONString = JSON.stringify(change_Password_JSON);
    var change_Password_Data = getJSON('POST', 'http://175.178.51.126:8091/smallA/getCode', change_Password_JSONString).then(res => {
        let tips = JSON.parse(res)
        console.log(res);
        if (tips.code > 400) {
            alert(tips.msg);
        } else {
            alert('获取成功');
            console.log(tips.msg);
        }
    });
}

//用邮箱验证码修改密码
changePassword_button1.onclick = function() {
    var changePasswordEmail = changePassword_email.value;
    var changePasswordCode = changePassword_code.value;
    var changePasswordNewPassword1 = changePassword_newPassword1.value;
    var changePassword_JSON = {
        "email": changePasswordEmail,
        "newPassword": changePasswordNewPassword1,
        "code": changePasswordCode
    };
    var changePassword_JSONString = JSON.stringify(changePassword_JSON);
    var changePassword_Data = getJSON('POST', 'http://175.178.51.126:8091/smallA/rememberPwd', changePassword_JSONString).then(res => {
        let tips = JSON.parse(res)
        console.log(res);
        if (tips.code > 400) {
            alert(tips.msg);
        } else {
            alert('修改成功');
            console.log(tips.msg);
        }
    });
}