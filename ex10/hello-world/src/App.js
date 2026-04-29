import React from 'react';
import './App.css';

// 定義文字樣式 (根據講義 P.47 的設定)
const styleArgument = { fontSize: '100px', color: 'red' };

// 定義點擊觸發的函式 (根據講義 P.53/55 的要求)
const changeText = (event) => {
  console.log(event.target);
  // 讓原本的文字後面加上「被點了」
  event.target.innerText = event.target.innerText + "被點了";
};

function App() {
  return (
    <div className="App">
      {/* 綁定 style 與 onClick 事件 */}
      <h1 style={styleArgument} onClick={changeText}>
        hello CGU!!
      </h1>
    </div>
  );
}

export default App;