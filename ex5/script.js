// 初始化計數器
var count = 1;

// 新增按鈕的函式
function addfunction () {
    var btn = document.createElement("BUTTON"); // 建立按鈕元素
    btn.innerHTML = `CLICK ME (${count})`;      // 設定按鈕文字與數字
    btn.setAttribute("id", "btn_" + count++);   // 設定 ID，同時 count 加 1
    btn.setAttribute("class", "btn btn-outline-danger m-1"); // 設定紅色邊框樣式
    
    console.log(btn); // 印出在主控台方便查看
    
    document.body.appendChild(btn); // 將按鈕加到畫面上
}

// 刪除按鈕的函式
function delfunction () {
    // 加上安全判斷，避免沒有按鈕時按刪除會報錯
    if (count > 1) {
        var btn = document.getElementById("btn_" + --count); // 找出最後一個按鈕
        console.log(btn);
        
        document.body.removeChild(btn); // 將按鈕從畫面上移除
    } else {
        console.log("已經沒有按鈕可以刪除囉！");
    }
}