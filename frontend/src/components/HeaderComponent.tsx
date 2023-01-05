import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AiFillSchedule } from 'react-icons/ai';
import { API, HeaderText, SessionKey } from '../contants';

const HeaderContainer = styled.div`
    background-color: #242424;
    top: 0%;
    right: 0%;
    left: 0%;
    bottom: auto;
    position: fixed;
    z-index: 1;
`;

const Header = styled.div`

    display:flex;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    justify-content: center;
`;

const Name = styled.div`
    color: #ffd32a;
    font-size: 30px;
    height: 40px;
    margin: 5px 10px;
    flex-basis: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const HeaderComponent = () => {
  useEffect(() => {
    if (window.localStorage.getItem(SessionKey) === null) {
      fetch(API.LOGIN)
        .then((res) => res.json())
        .then((data) => {
          window.localStorage.setItem(SessionKey, JSON.stringify(data.token));
          window.location.href = data.url;
        });
    }
  }, []);
  return (
    <HeaderContainer>
      <Header>
        <Name data-testid="headerName">
          <AiFillSchedule />
          { HeaderText }
        </Name>
      </Header>
    </HeaderContainer>
  );
};

export default HeaderComponent;
