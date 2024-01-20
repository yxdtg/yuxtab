"use strict";
function $(id) {
    return document.getElementById(id);
}
const weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
// 更新时间
function updateTime() {
    requestAnimationFrame(updateTime);
    const date = new Date();
    // 时
    let hours = date.getHours().toString();
    // 分
    let minutes = date.getMinutes().toString();
    // 秒
    let sceonds = date.getSeconds().toString();
    // 时和分长度若为1 那么加入前缀0 使其更美观
    if (hours.length === 1) {
        hours = "0" + hours;
    }
    if (minutes.length === 1) {
        minutes = "0" + minutes;
    }
    let text = `${hours}:${minutes}`;
    let textTime = $("text-time");
    if (textTime.innerHTML != text) {
        textTime.innerHTML = text;
    }
}
// 更新日期
function updateDate() {
    requestAnimationFrame(updateDate);
    const date = new Date();
    // 年
    let year = date.getFullYear().toString();
    // 月 月获取的是0-11 所以这里+1
    let month = (date.getMonth() + 1).toString();
    // 日
    let day = date.getDate().toString();
    // 星期几 星期几获取的是0-6 这里使用数组weeks索引获取
    let weekIndex = date.getDay();
    // 月和日长度若为1 那么加入前缀0 使其更美观
    if (month.length === 1) {
        month = "0" + month;
    }
    if (day.length === 1) {
        day = "0" + day;
    }
    let text = `${year}年${month}月${day}日 ${weeks[weekIndex]}`;
    let textDate = $("text-date");
    if (textDate.innerHTML != text) {
        textDate.innerHTML = text;
    }
}
// 搜索
function btnSearch() {
    let searchSearch = $("select-search");
    let searchText = $("input-search").value;
    let url = searchUrlList[searchSearch.value].replaceAll("${search}", searchText);
    open(url);
}
var Search;
(function (Search) {
    Search["Bing"] = "Bing";
    Search["Baidu"] = "Baidu";
    Search["Sogou"] = "Sogou";
    Search["Google"] = "Google";
    Search["ThreeSixZero"] = "360";
})(Search || (Search = {}));
/**
 * 搜索url列表
 */
const searchUrlList = {
    [Search.Bing]: "https://cn.bing.com/search?pc=CNPA09&q=${search}",
    [Search.Baidu]: "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${search}&fenlei=256&oq=a12%2526lt%253B&rsv_pq=8011fcf20001f195&rsv_t=18f4zxFuYZVMOr7wKwllFrpg3P3GeCS9WRNVWKQns7V%2FNnjp28jO8TLy2%2F8&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_btype=t&inputT=1444&rsv_sug3=33&rsv_sug1=31&rsv_sug7=100&rsv_sug2=0&rsv_sug4=73264&rsv_sug=1",
    [Search.ThreeSixZero]: "https://www.so.com/s?ie=utf-8&fr=none&src=360sou_newhome&ssid=aa6e5269297f4ddf89bc8e36b4258521&sp=a56&cp=0ef00452b0&nlpv=placeholder_bt_31&q=${search}",
    [Search.Sogou]: "https://www.sogou.com/web?query=${search}&_asf=www.sogou.com&_ast=&w=01019900&p=40040100&ie=utf8&from=index-nologin&s_from=index&sut=1347&sst0=1705755852273&lkt=3%2C1705755851546%2C1705755851944&sugsuv=1705755849405200&sugtime=1705755852273",
    [Search.Google]: "https://www.google.com/search?q=${search}&oq=${search}&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTMwNDJqMGoxNagCALACAA&sourceid=chrome&ie=UTF-8",
};
// 初始化
function init() {
    let searchSearch = $("select-search");
    searchSearch.addEventListener("change", () => {
        localStorage.setItem("defaultSearch", searchSearch.value);
    });
    let defaultSearch = "Bing";
    let _localSearch = localStorage.getItem("defaultSearch");
    if (_localSearch && searchUrlList[_localSearch]) {
        defaultSearch = _localSearch;
    }
    for (let key in searchUrlList) {
        let opiton = document.createElement("option");
        opiton.value = key;
        opiton.innerText = key;
        if (opiton.innerText === defaultSearch) {
            opiton.selected = true;
        }
        searchSearch.appendChild(opiton);
    }
    document.addEventListener("keydown", (event) => {
        // 回车
        if (event.keyCode === 13) {
            btnSearch();
        }
    });
    updateTime();
    updateDate();
}
init();
