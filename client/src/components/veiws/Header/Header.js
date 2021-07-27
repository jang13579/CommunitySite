import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

function Header(props) {
  const [name, setname] = useState("");

  useEffect(() => {
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
        window.location.replace("/login"); //login페이지로 넘어갈 때 새로고침을 한다.
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  return (
    <nav
      className="menu"
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
      }}
    >
      <div className="menu__logo">
        <a style={{ margin: "20px 20px" }} href="/">
          Logo
        </a>
        <span> CommunitySite</span>
      </div>
      <div className="menu__container"></div>
      {name ? (
        <div
          style={{
            display: "flex",
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
          <div style={{ height: "50%" }}>
            <button
              style={{
                background: "black",
                color: "white",
                marginRight: "20px",
                borderRadius: "5px",
                border: 0,
                outline: 0,
              }}
              onClick={onClickLogout}
            >
              로그아웃
            </button>
            <button
              style={{
                background: "black",
                color: "white",
                marginRight: "20px",
                borderRadius: "5px",
                border: 0,
                outline: 0,
              }}
              onClick={onClickAddPost}
            >
              게시물 작성하기
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            style={{
              background: "black",
              color: "white",
              marginRight: "20px",
              borderRadius: "5px",
              border: 0,
              outline: 0,
            }}
            onClick={onClickRegister}
          >
            회원가입
          </button>
          <button
            style={{
              background: "black",
              color: "white",
              marginRight: "20px",
              borderRadius: "5px",
              border: 0,
              outline: 0,
            }}
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
