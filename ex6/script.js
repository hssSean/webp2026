// 取得顯示字串的容器
var container = document.getElementById('container');

// 定義一個產生隨機 a-z 字串的函式
function generate_chars(num) {
    var letters = "abcdefghijklmnopqrstuvwxyz";
    var result = "";
    for (var i = 0; i < num; i++) {
        // 隨機抽取字母
        var randomIndex = Math.floor(Math.random() * letters.length);
        result += letters.charAt(randomIndex);
    }
    return result;
}

// 1. window.onload 時：亂數產生 0 到 2 個字元
window.onload = function() {
    var count = Math.floor(Math.random() * 3); // 產生 0, 1 或 2
    container.textContent = generate_chars(count);
};

// 2. 監聽 keyup 事件
window.addEventListener("keyup", function(e) {
    var str = container.textContent;
    
    // 3. 檢查按下的鍵 (e.key) 是否和字串的第一個字相等
    if (str.length > 0 && e.key === str.charAt(0)) {
        // 一樣的話，把第一個字元消除 (擷取第 1 個位置之後的所有字元)
        container.textContent = str.substring(1);
    }
    
    // 4. 呼叫函式：增加新字元
    add_new_chars();
});

// 負責在字串後面追加字元的函式
function add_new_chars() {
    // 亂數產生 1 到 3 個字元
    var addCount = Math.floor(Math.random() * 3) + 1; // 產生 1, 2 或 3
    container.textContent += generate_chars(addCount);
}