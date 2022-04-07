import React from 'react';
import styled from "styled-components";
import { NavLink, useNavigate } from 'react-router-dom';

const MenuLink = styled(NavLink)`
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
    padding-bottom:2px;
    color: #222;
    line-height: 40px;

    &:hover {
        color: #22b8cf;
    }

    &:after {
        content: '|';
        display: inline-block;
        padding: 0 7px;
        color: #ccc;
    }

    &:last-child {
        &:after {
            color: #fff;
        }
    }

    &.active {
        text-decoration: underline;
        color: #22b8cf;
        &:after {
            border-bottom: 4px solid #fff !important;
        }
    }
`;

const SeacrchBox = styled.div`
width: 100%;
font-size: 14px;
`;

const Title = styled.p`
font-size: 32px;
text-align: center;
font-style: bold;
`;

const FormBox = styled.form`
height: 90px;
text-align: center;
margin-top: 100px;
`;

const Input = styled.input`
width: 400px;
height: 40px;
padding: 10px;
border-radius: 5px;
`;

const SearchButton = styled.button`
padding: 10px;
margin: 0 20px 0 0;
background-color: white;
border-radius: 5px;
`;
const Top = () => {

    // 1 -1 )HTML 태그에 접근할 수 있는 참조변수를 생성
    const inputQuery = React.useRef();

    // 2 - 1 ) 검색어 상태변수 -> 기본값은 빈 문자열
    const [query, setQuery] = React.useState("");

    // 3-1) 페이지 강제 이동 함수 생성
    const navigate = useNavigate();

    /** 검색폼에 대한 이벤트 핸들러 */
    const handleSubmit = (e) => {
        e.preventDefault();

        // 1-3) input 태그의 입력값 가져오기
        const value = inputQuery.current.value;

        if (!value) {
            inputQuery.current.focus();
            alert('검색어를 입력하세요.');
            return;
        }

        // 2-2) 입력된 검색어를 상태변수에 등록한다.
        setQuery(value);

        // 3-2) 웹 검색 페이지로 강제 이동
        navigate(`/book?query=${encodeURIComponent(value)}`);

    };

    return (
        <SeacrchBox>
            <Title>Kakao Search</Title>

            {/* 4-2 ) submit 이벤트 리스너에 미리 준비한 핸들러 연결 */}
            <FormBox onSubmit={handleSubmit}>
                {/* 1-2 ) 참조변수를 지정하여 입력요소에 접근할 수 있도록 처리 */}
                <Input type='search' name='query' ref={inputQuery} />
                <SearchButton type='submit'>검색</SearchButton>
            </FormBox>

            {/* 2-3 ) query값이 존재할 때만 메뉴를 노출한다. */}
            {query && (
                <nav>
                    <MenuLink to={`/web?query=${encodeURIComponent(query)}`}>웹</MenuLink>
                    <MenuLink to={`/blog?query=${encodeURIComponent(query)}`}>블로그</MenuLink>
                    <MenuLink to={`/cafe?query=${encodeURIComponent(query)}`}>카페</MenuLink>
                    <MenuLink to={`/book?query=${encodeURIComponent(query)}`}>책</MenuLink>
                </nav>
            )}
        </SeacrchBox>
    );
};

export default Top;