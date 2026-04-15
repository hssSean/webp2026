var container = document.getElementById('container');
var counter = 0; // 用來記錄連續打錯的次數

// 輔助函式：產生 x 個亂數小寫英文字母
function add_new_chars(x) {
    var n = Math.floor(Math.random() * x) + 1; // 產生 1 到 x 個
    var str = '';
    for (let i = 0; i < n; i++) {
        // 97 是 'a' 的 ASCII 碼，加上 0~25 的亂數來產生 a-z
        str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
    return str;
}

// 網頁載入時，先產生初始字串
window.onload = function() {
    container.textContent = add_new_chars(3);
};

// 監聽鍵盤按下彈起的事件
window.addEventListener("keyup", function(e) {
    // 取得目前畫面上的第一個字元
    var firstone = container.textContent.substring(0, 1);
    
    // 判斷按下的鍵是否正確
    if (e.key == firstone) {
        // 【打對了】：消除第一個字元 (保留第1個位置以後的字)
        container.textContent = container.textContent.substring(1, container.textContent.length);
        counter = 0; // 打對了，連續錯誤次數歸零
    } else {
        // 【打錯了】：把按錯的鍵加到最後面
        container.textContent += e.key;
        
        // 檢查是否連續打錯 3 次 (counter 為 0, 1, 2 時，就是第 3 次)
        if (counter++ >= 2) {
            container.textContent += add_new_chars(3); // 執行懲罰：額外增加亂數字串
            counter = 0; // 懲罰完畢，錯誤次數重新計算
        }
    }
    
    // 每次不管按對按錯，都會固定再長出新的字母
    container.textContent += add_new_chars(3);
});