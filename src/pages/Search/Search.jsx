import styled from '@emotion/styled';
import { SearchOutlined } from '@mui/icons-material';
import { InputBase, Paper, Box, Typography, Stack, Chip, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSearchHistory, setSearchHistory } from '../../apis/Login/localStorage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
`;

const Search = () => {
  const [searchLog, setSearchLog] = useState([]);
  const [search, setSearch] = useState('');
  // useEffect(() => {
  //   setSearchLog(getSearchHistory());

  //   return () => {
  //     setSearchHistory(searchLog);
  //   };
  // }, []);

  useEffect(() => {
    setSearchLog(search);
  }, [search]);

  return (
    <Container>
      <SearchBar setSearch={setSearch} />
      {/* {searchLog.length !== 0 ? <SearchLog setSearch={setSearch} searchLog={searchLog} /> : <></>} */}
      <div>{search}</div>
    </Container>
  );
};

const SearchBar = ({ setSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 폼 제출을 통한 페이지 리로드 방지
      setSearch(event.target.value); // 엔터 키 입력 시 검색 값 설정
    }
  };

  return (
    <Box sx={{ width: '100%', padding: '1rem' }}>
      <Paper
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'seperator.light',
          padding: '0.5rem',
        }}
        onSubmit={(e) => e.preventDefault()} // 폼 제출 이벤트 방지
      >
        <InputBase
          sx={{ width: '100%' }}
          placeholder="레시피를 입력하세요"
          inputProps={{ 'aria-label': 'search' }}
          onKeyPress={handleKeyPress}
        />

        <SearchOutlined />
      </Paper>
    </Box>
  );
};

const SearchLogContainer = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
`;

const SearchLog = ({ setSearch, searchLog }) => {
  return (
    <SearchLogContainer>
      <Typography variant="h5">다양한 요리 카테고리</Typography>
      <Stack direction="row" spacing={1}>
        {searchLog.map((log) => (
          <Chip key={log} label={log} onClick={() => setSearch(log)} variant="outlined" />
        ))}
      </Stack>
    </SearchLogContainer>
  );
};

export default Search;
