// 1. 設定文化部展覽資訊的 API 網址
var openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

// 2. 建立 XMLHttpRequest 物件
var xhr = new XMLHttpRequest();

// 3. 設定請求方式為 'GET'，並開啟非同步 (true)
xhr.open('GET', openUrl, true);

// 4. 送出請求
xhr.send();

// 5. 監聽請求狀態的改變
xhr.onreadystatechange = function() {
    // 當 readyState 為 4 (請求完成) 且 status 為 200 (成功) 時
    if (this.readyState == 4 && this.status == 200) {
        // 將回傳的 JSON 字串解析成 JavaScript 的陣列物件
        var dataset = JSON.parse(this.responseText);
        // 呼叫函式把資料畫到畫面上
        addNewData(dataset);
    }
};

// 6. 負責把資料加到 HTML 表格中的函式
function addNewData(dataset) {
    var myTable = document.getElementById("csie");
    
    // 迴圈跑遍每一筆展覽資料
    dataset.forEach(function(data, index) {
        var row = myTable.insertRow(-1); // 在表格最後新增一列
        
        // 根據投影片第 52 頁與 JSON 結構 (第 53 頁)，把對應的資料填入儲存格
        row.insertCell(0).innerHTML = data['title']; // 展覽名稱
        row.insertCell(1).innerHTML = data['showInfo'][0]['location']; // 展覽地點
        row.insertCell(2).innerHTML = data['showInfo'][0]['price']; // 票價資訊
    });
}