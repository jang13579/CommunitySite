import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

function Header(props) {
  const [name, setname] = useState("");

  useEffect(() => {
    // storage.getitem;
    axios.get("/api/home").then((res) => {
      if (res.data.user) {
        if (res.data.user.name) {
          console.log("res.data : ", res.data);
          setname(res.data.user.name);
        }
      }
    });
  }, []);

  const onClickRegister = () => {
    props.history.push("/register");
  };

  const onClickLogin = () => {
    props.history.push("/login");
  };

  const onClickAddPost = () => {
    props.history.push("/post/add");
  };

  const onClickLogout = () => {
    axios.get("/api/user/logout").then((res) => {
      //console.log(res.data.logoutSuccess);
      if (res.data.logoutSuccess) {
        window.localStorage.removeItem("userId"); // logout할 때 localStorage에 있는 userId 삭제
        window.location.replace("/login"); //login페이지로 넘어갈 때 새로고침을 한다.
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  return (
    <nav
      className="navbar d-flex"
      style={{
        paddingTop: "23px",
        paddingBottom: "23px",
      }}
    >
      <div style={{ paddingLeft: "11%" }}>
        <a className="text-decoration-none text-dark" href="/">
          Logo
        </a>
        {/* <span style={{ marginLeft: "50px" }}> CommunitySite</span> */}
        <a
          className="text-decoration-none text-dark"
          style={{ marginLeft: "50px" }}
          href=""
        >
          공지사항
        </a>
        <a
          className="text-decoration-none text-dark"
          style={{ marginLeft: "30px" }}
          href="/recent"
        >
          최신글
        </a>
        <a
          className="text-decoration-none text-dark"
          style={{ marginLeft: "30px" }}
          href=""
        >
          카테고리2
        </a>
        <a
          className="text-decoration-none text-dark"
          style={{ marginLeft: "30px" }}
          href=""
        >
          카테고리3
        </a>
        <a
          className="text-decoration-none text-dark"
          style={{ marginLeft: "30px" }}
          href=""
        >
          카테고리4
        </a>
      </div>
      {name ? (
        <div
          style={{
            display: "flex",
            paddingRight: "11%",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              marginRight: "20px",
            }}
          >
            환영합니다. {name} 님
          </h3>
          <div className="d-flex" style={{ height: "50%" }}>
            <button
              className="bg-dark text-white rounded border-0 outline-0"
              onClick={onClickLogout}
            >
              로그아웃
            </button>
            <button
              className="bg-dark text-white rounded border-0 outline-0"
              onClick={onClickAddPost}
            >
              게시물 작성하기
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            paddingRight: "11%",
          }}
          className="d-flex"
        >
          <button
            className="bg-dark text-white rounded border-0 outline-0"
            onClick={onClickRegister}
          >
            회원가입
          </button>
          <button
            className="bg-dark text-white rounded border-0 outline-0"
            onClick={onClickLogin}
          >
            로그인
          </button>
        </div>
      )}
    </nav>
  );
}

export default withRouter(Header);