var highText = document.querySelector('.high');
var weightText = document.querySelector('.weight');
var btnSave = document.querySelector('.btnSave');
var viewlist = document.querySelector('.contentList');

var data = JSON.parse(localStorage.getItem('bmiList')) || [];
console.log(data[0].L);

//監聽，當按下按鈕時，取得文字欄位輸入的值
// btnSave.addEventListener('click', getBMI, false);
btnSave.addEventListener('click', addData, false); //按下時，將資料儲存
viewlist.addEventListener('click', addList, false);
updateList(data);




function addData() {

    var tallText = document.querySelector('.high').value; //身高

    var kgText = document.querySelector('.weight').value; //體重
    if (tallText == '' || kgText == '') {
        alert('請輸入您的身高體重');
        return;
    };
    var BMI = (kgText / (tallText / 100) ** 2).toFixed(2); // 小數點四捨五入 - .toFixed(位數)：
    var title = '';
    var borderLight = '';
    var text = document.getElementById('text');
    var status = document.querySelector('.status');

    var today = new Date();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var currentTime = (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day + '-' + today.getFullYear();
    if (BMI < 18.5) {

        title = '過輕';
        borderLight = 'blue';
        btnSave.setAttribute('class', 'btnBlue');
        status.textContent = title;
        status.style.color = "#31BAF9";
        text.innerHTML = BMI + '<br><em class="bmitext" >BMI</em>';


    } else if (BMI >= 18.5 && BMI < 24) {
        title = '理想';
        borderLight = 'green';
        btnSave.setAttribute('class', 'btnGreen');
        status.textContent = title;
        text.innerHTML = BMI + '<br><em class="bmitext" >BMI</em>';

    } else if (BMI >= 24 && BMI < 27) {
        title = '過重';
        borderLight = 'orange1';
        btnSave.setAttribute('class', 'btnOrange1');
        status.textContent = title;
        status.style.color = "#FF982D";
        text.innerHTML = BMI + '<br><em class="bmitext" >BMI</em>';
    } else if (BMI >= 27 && BMI < 30) {
        title = '輕度肥胖';
        borderLight = 'orange2';
        btnSave.setAttribute('class', 'btnOrange2');
        status.textContent = title;
        status.style.color = "#FF6C02";
        text.innerHTML = BMI + '<br><em class="bmitext" >BMI</em>';
    } else if (BMI >= 30 && BMI < 35) {
        title = '中度肥胖';
        borderLight = 'orange3';
        btnSave.setAttribute('class', 'btnOrange3');
        status.textContent = title;
        status.style.color = "#FF6C02";
        text.innerHTML = BMI + '<br><em class="bmitext" >BMI</em>';
    } else if (BMI >= 35) {
        title = '重度肥胖';
        borderLight = 'red';
        btnSave.setAttribute('class', 'btnRed');
        status.textContent = title;
        status.style.color = "#FF1200 ";
        text.innerHTML = BMI + '<br><em class="bmitext" >BMI</em>';
    };
    var keyValue = {
        L: borderLight,
        T: title,
        H: tallText,
        W: kgText,
        B: BMI,
        Time: currentTime
    };
    // console.log(keyValue);
    data.push(keyValue); //新增資料
    updateList(data); //更新
    localStorage.setItem('bmiList', JSON.stringify(data)); //將資料轉為字串並存到localstorage內
};


function updateList(items) {
    str = '';
    var len = items.length;

    for (var i = 0; i < len; i++) {

        str += '<p class="' + items[i].L + '" data-num=' + i + '><b ">' + items[i].T + '</b> BMI<span>' + items[i].B + '</span>weight<span>' + items[i].W + 'kg</span>height<span>' + items[i].H + 'cm</span>' + items[i].Time + '</p>';

    };

    viewlist.innerHTML = str;
    viewlist.setAttribute('class', 'contentList');

};



function addList(e) {
    e.preventDefault();
    console.log(e.target.nodeName);
    if (e.target.nodeName !== 'P' && e.target.nodeName !== 'SPAN' && e.target.nodeName !== 'B') { return }; //需更改點到的位置

    var num = e.target.dataset.num;
    data.splice(num, 1);
    localStorage.setItem('bmiList', JSON.stringify(data));
    updateList(data);
}