import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css';

// 1. Square 元件 (投影片 P.45) 
// [cite: 2564, 2565, 2567, 2568, 2570, 2572, 2574, 2576]
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// 2. Board 元件 (投影片 P.44)
// [cite: 2497, 2499, 2500, 2504, 2507, 2509, 2511, 2513, 2518, 2520, 2523, 2525, 2527, 2529, 2531, 2533, 2535, 2537, 2539, 2542, 2544, 2548, 2552, 2553, 2556, 2558]
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// 3. 判斷贏家的函式 (投影片 P.39)
// [cite: 2250, 2256, 2260, 2264, 2268, 2272, 2274, 2278, 2282, 2286, 2288, 2290, 2293, 2296, 2299]
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// 4. Game 元件主體 (結合 P.36, P.40, P.41, P.43)
class Game extends React.Component {
  // 建構子紀錄遊戲歷史狀態 (投影片 P.36) [cite: 2051, 2056, 2058, 2060, 2063, 2065, 2069, 2071, 2073]
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  // 處理滑鼠點擊事件 (投影片 P.40) [cite: 2305, 2308, 2312, 2314, 2316, 2318, 2322, 2324, 2326, 2328, 2330, 2336, 2338]
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  // 跳轉到特定步驟 (投影片 P.41) [cite: 2346, 2349, 2351, 2353, 2354]
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  // 渲染遊戲畫面與歷史紀錄 (投影片 P.43) [cite: 2418, 2419, 2420, 2421, 2422, 2423, 2424, 2425, 2426, 2428, 2445, 2475, 2476, 2477, 2478, 2479, 2480, 2482, 2484, 2486, 2487, 2488, 2489, 2490, 2491]
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        '回到#' + move + '步' :
        '遊戲開始';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "贏家是:" + winner;
    } else {
      status = "下一位玩家:" + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// 5. 渲染掛載 (投影片 P.34) [cite: 2021, 2026]
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);