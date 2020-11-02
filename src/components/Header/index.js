import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

const HeaderLeft = styled.div`
  width: 100%;
  height: 100%;
  .Krikri-Select {
    width: 90%;
    height: 50px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    border: 3px solid rgba(255, 170, 177, 1);
    border-radius: 30px;
    margin-right: 28px;
  }

  /* 검색 부분 */
  .Search {
    height: 50px;
    display: flex;
  }
  /* 검색 버튼 부분 */
  .Img-Button {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 50px;
    height: 44px;
    border: none;
    background: transparent;
    outline: none;
    color: #555555;
    background-color: white;
    border-radius: 30px 0px 0px 30px / 30px 0px 0px 30px;
  }
  .Img-Button:focus {
    outline: none !important;
  }
  /* 검색 이미지 hover 부분 */
  .Img-Button img:hover {
    cursor: pointer;
  }
  /* 검색 input 부분 */
  .Search-Keyword {
    width: 95%;
    height: 44px;
    font-size: 16px;
    border: none;
    vertical-align: middle;
    border-radius: 0px 30px 30px 0px / 30px 30px 30px 30px;
  }
  /* 검색 input:focus 부분 */
  .Search-Keyword:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderRight = styled.div`
  width: 100%;
  height: 100%;
  .Krikri-Header {
    margin-left: 28px;
    height: 70px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .Krikri-Name {
    position: relative;
    top: 25%;
    transform: translateY(-25%);
    font-size: 150%;
    font-weight: bold;
  }

  .Krikri-Date {
    margin-top: 8px;
    font-size: 18px;
    color: rgba(181, 181, 183, 1);
  }

  .Krikri-Header-Alram {
    /* width: 35px;
    height: 35px; */
    width: 5%;
    height: 50%;
    position: relative;
    top: -80%;
    right: -80%;
  }

  .Krikri-Header-Profile {
    /* width: 35px;
    height: 35px; */
    width: 5%;
    height: 50%;
    position: relative;
    top: -80%;
    right: -83%;
  }
  .Krikri-Header-Alram:hover,
  .Krikri-Header-Profile:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .Krikri-Header {
      width: 90%;
      margin: 0 auto;
      height: 70px;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
    .Krikri-Name {
      font-size: 100%;
    }
    .Krikri-Header-Alram {
      position: relative;
      top: -80%;
      right: -88%;
    }
    .Krikri-Header-Profile {
      position: relative;
      top: -80%;
      right: -91%;
    }
    .Krikri-Header-Alram,
    .Krikri-Header-Profile {
      position: relative;
      top: -60%;
    }
  }
`;

function Header() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = year + "년 " + month + "월 " + day + "일";
  return (
    <>
      <Col md={5} className="m-0 p-0">
        <HeaderLeft>
          <div className="Krikri-Select" id="Krikri-Select">
            <form className="Search" id="Search">
              <button
                className="Img-Button"
                id="Img-Button"
                type="submit"
                name="click"
                value=""
              >
                <BsSearch />
              </button>
              <input
                className="Search-Keyword"
                type="text"
                name="search"
                placeholder="Google 검색"
                autoComplete="off"
              />
            </form>
          </div>
        </HeaderLeft>
      </Col>
      <Col md={7} className="m-0 p-0">
        <HeaderRight>
          <div className="Krikri-Header">
            <div className="Krikri-Name">우리들만의 끼리끼리:）</div>
            <div className="Krikri-Date">{today}</div>
            <img
              src={require("../../images/alram.png")}
              alt="알림"
              className="Krikri-Header-Alram"
            />
            <img
              src={require("../../images/profile.png")}
              alt="프로필"
              className="Krikri-Header-Profile"
            />
          </div>
        </HeaderRight>
      </Col>
    </>
  );
}

export default Header;
