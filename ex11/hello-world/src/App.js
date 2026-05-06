import React from 'react';
import './App.css';
import MultiButton from './cgu_multiButton';

// 這是講義要求的文字樣式
const styleArgument = { fontSize: '100px', color: 'red' };

// 這是點擊文字會觸發的動作
const changeText = (event) => {
  console.log(event.target);
  event.target.innerText = event.target.innerText + "被點了";
};

function App() {
  return (
    <div className="App">
      {/* 顯示文字並綁定點擊事件 */}
      <h1 style={styleArgument} onClick={changeText}>
        hello CGU!!
      </h1>
      
      {/* 顯示剛剛建立的 Material-UI 按鈕模組 */}
      { MultiButton(1) } 
    </div>
  );
}

export default App;