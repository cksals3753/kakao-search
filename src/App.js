import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Meta from './components/Meta';
import Top from './components/Top';
import qs from 'qs';
import BlogPage from './pages/BlogPage';
import BookPage from './pages/BookPage';
import CafePage from './pages/CafePage';
import WebPage from './pages/WebPage';

import style from './assets/scss/style.module.scss';

const App = () => {
  //top.js에서 클릭된 링크에 의해 전달되는 QueryString을 추출
  const { search } = useLocation();

  //추출괸 querystring을 json 객체로 파싱하고 key가 query인 값만 추출
  const { query } = qs.parse(search, { ignoreQueryPrefix: true });


  return (
    <div className={style.container}>
      <Meta />
      <Top />

      <Routes>
        <Route path="book" element={<BookPage query={query} />} />
        <Route path="blog" element={<BlogPage query={query} />} />
        <Route path="cafe" element={<CafePage query={query} />} />
        <Route path="web" element={<WebPage query={query} />} />
      </Routes>
    </div>
  );
};

export default App;
