import styled from '@emotion/styled';
import { Close, SearchOutlined } from '@mui/icons-material';
import { InputBase, Paper, Box, Stack, Chip, IconButton, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getSearchHistory, setSearchHistory } from '../../apis/Login/localStorage';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Loading from '../../components/Loading';
import { getPopularKeywords } from '../../apis/Search/getPopularKeywords';
import SearchResult from './SearchResult';

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
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const searchHistory = getSearchHistory();
    console.log('searchHistory', searchHistory);
    setSearchLog(searchHistory);
  }, []);

  useEffect(() => {
    searchValue !== '' && setSearchLog([searchValue, ...searchLog]);
  }, [searchValue]);

  useEffect(() => {
    console.log('saved searchLog', searchLog);
    setSearchHistory(searchLog);
  }, [searchLog]);

  return (
    <>
      {searchValue !== '' ? (
        <SearchResult keyword={searchValue} />
      ) : (
        <Container>
          <SearchBar setSearchValue={setSearchValue} />
          {searchLog.length > 0 && (
            <SearchLog setSearchValue={setSearchValue} searchLog={searchLog} />
          )}
          <PopularSearch setSearchValue={setSearchValue} />
        </Container>
      )}
    </>
  );
};
const PopularSearchHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const PopularSearch = ({ setSearchValue }) => {
  const today = new Date();
  const formattedDate = format(today, 'yyyy.MM.dd');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keywordsData, setKeyWrodsData] = useState([]);

  useEffect(() => {
    const fetchPopularKeywords = async () => {
      try {
        const data = await getPopularKeywords();
        setKeyWrodsData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPopularKeywords();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        padding: '1rem',
        gap: '1rem',
      }}>
      <PopularSearchHeader>
        <Typography variant="h5">인기 검색어</Typography>
        <Typography variant="caption" sx={{ color: 'subbackground.main' }}>
          {formattedDate} 기준
        </Typography>
      </PopularSearchHeader>
      {keywordsData.slice(0, 5).map((keyword, index) => (
        <Box
          key={keyword}
          onClick={() => setSearchValue(keyword)}
          sx={{
            cursor: 'pointer',
            width: '100%',
          }}>
          <Typography variant="body1">
            {index + 1}. {keyword}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const SearchBar = ({ setSearchValue }) => {
  const [inputValue, setInputValue] = useState(''); // 입력값을 로컬 상태로 관리
  let navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // 폼 제출을 통한 페이지 리로드 방지
      setSearchValue(inputValue); // 상위 컴포넌트의 검색 상태를 업데이트
      setInputValue(''); // 입력 필드 초기화
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value); // 입력값 변경 감지
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
          inputProps={{ 'aria-label': 'searchValue' }}
          value={inputValue} // 입력값 상태 바인딩
          onChange={handleChange} // 입력값 변경 핸들러
          onKeyPress={handleKeyPress} // 엔터 키 이벤트 핸들러
        />
        <IconButton
          type="submit"
          aria-label="searchValue"
          onClick={(e) => {
            e.preventDefault();
            setSearchValue(inputValue);
            setInputValue(''); // 버튼 클릭 시 검색 실행 및 입력 필드 초기화
          }}>
          <SearchOutlined />
        </IconButton>
        <Divider
          sx={{ height: 28, m: 0.5, color: 'black', borderLeft: '1px solid black' }}
          orientation="vertical"
        />

        <IconButton onClick={() => navigate(-1)}>
          <Close />
        </IconButton>
      </Paper>
    </Box>
  );
};

const SearchLogContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0rem 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  overflow-x: auto;
`;

const SearchLog = ({ setSearchValue, searchLog }) => {
  return (
    <SearchLogContainer>
      <Stack direction="row" spacing={1}>
        {searchLog.map((log) => (
          <Chip key={log} label={log} onClick={() => setSearchValue(log)} variant="outlined" />
        ))}
      </Stack>
    </SearchLogContainer>
  );
};

export default Search;
