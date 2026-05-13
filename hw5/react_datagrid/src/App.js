import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { 
  makeStyles, 
  createTheme, 
  ThemeProvider,
  Container, 
  Paper, 
  Typography, 
  TextField, 
  InputAdornment,
  Box
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

// 1. 定義精緻的佈局樣式
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    padding: theme.spacing(4),
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', // 質感灰色漸層背景
    position: 'relative',
    overflow: 'hidden',
  },
  // 背景裝飾球
  blob: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    background: 'rgba(79, 70, 229, 0.1)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    zIndex: 0,
    top: '-100px',
    right: '-100px',
  },
  titleArea: {
    marginBottom: theme.spacing(4),
    position: 'relative',
    zIndex: 1,
  },
  searchPaper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)', // 毛玻璃效果
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
  },
  gridPaper: {
    height: 600,
    width: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    background: '#fff',
  },
  // 自定義 DataGrid 內部的樣式
  dataGrid: {
    border: 'none',
    '& .MuiDataGrid-columnHeader': {
      backgroundColor: '#3f51b5', // 深藍色表頭
      color: '#fff',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    '& .MuiDataGrid-row:nth-child(even)': {
      backgroundColor: '#f9f9ff', // 斑馬紋
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#e8eaf6 !important', // 懸停發光
      transition: '0.3s',
    },
    '& .MuiDataGrid-cell': {
      fontSize: '14px',
      color: '#334155',
    },
  }
}));

// 設定表格欄位
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: '展覽名稱', width: 450 },
  { field: 'location', headerName: '地點', width: 350 },
  { field: 'price', headerName: '票價', width: 200 }
];

function App() {
  const classes = useStyles();
  const [allData, setAllData] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6')
      .then(res => res.json())
      .then(data => {
        const formattedData = data.map((item, index) => ({
          id: index + 1,
          title: item.title,
          location: item.showInfo && item.showInfo[0] ? item.showInfo[0].location : '無',
          price: item.showInfo && item.showInfo[0] ? item.showInfo[0].price : '無'
        }));
        setAllData(formattedData);
        setRows(formattedData);
      })
      .catch(err => console.error("抓取失敗:", err));
  }, []);

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filtered = allData.filter(item => 
      item.title.toLowerCase().includes(keyword)
    );
    setRows(filtered);
  };

  return (
    <Box className={classes.root}>
      {/* 裝飾用的背景球 */}
      <div className={classes.blob} />
      
      <Container maxWidth="lg">
        {/* 標題區 */}
        <div className={classes.titleArea}>
          <Typography variant="h3" component="h1" gutterBottom style={{ fontWeight: 800, color: '#1e293b' }}>
            文化活動 <span style={{ color: '#3f51b5' }}>情報儀表板</span>
          </Typography>
          <Typography variant="subtitle1" style={{ color: '#64748b' }}>
            即時串接文化部開放資料庫 • HW5 DataGrid 進階版
          </Typography>
        </div>

        {/* 搜尋區塊 */}
        <Paper className={classes.searchPaper} elevation={0}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="請輸入關鍵字搜尋，例如：臺灣、藝術、科博館..."
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: '#3f51b5' }} />
                </InputAdornment>
              ),
              style: { borderRadius: '12px', background: '#fff' }
            }}
          />
        </Paper>

        {/* 表格區塊 */}
        <Paper className={classes.gridPaper} elevation={0}>
          <DataGrid 
            className={classes.dataGrid}
            rows={rows} 
            columns={columns} 
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            pagination
            disableSelectionOnClick
          />
        </Paper>
        
        <Box mt={4} textAlign="center">
          <Typography variant="caption" style={{ color: '#94a3b8' }}>
            © 2026 CSIE CGU • Web Programming Homework
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default App;