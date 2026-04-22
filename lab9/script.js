function getPhotos() {
    // 1. 設定 Flickr API 網址
    var imglist_Url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&per_page=20&format=json&nojsoncallback=1';
    
    // 2. 建立 Ajax 請求
    var xhr = new XMLHttpRequest();
    xhr.open('GET', imglist_Url, true);
    xhr.send();

    // 3. 監聽回傳狀態
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var dataset = JSON.parse(this.responseText);
            buildPhotoWall(dataset);
        }
    };
}

function buildPhotoWall(dataset) {
    var gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // 每次點擊先清空舊照片
    
    var photos = dataset.photos.photo;
    
    // 跑迴圈產生圖片
    for (var i = 0; i < photos.length; i++) {
        var data = photos[i];
        
        // 💡 【核心關鍵】：結尾改用 _n.jpg！
        // _n 會保留圖片原本的長寬比例，不會像 _q 被強制切成正方形
        var imgUrl = "https://live.staticflickr.com/" + data.server + "/" + data.id + "_" + data.secret + "_n.jpg";
        
        // 建立 img 標籤
        var img = document.createElement("img");
        img.src = imgUrl;
        
        // 將圖片塞入容器
        gallery.appendChild(img);
    }
}