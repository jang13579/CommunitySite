import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row } from "reactstrap";
import { everyPost } from "../../../_actions/postAction";
import Page from "./Section/Page";

import { paginate, mainImage } from "../utils";

import SideBar from "../SideBar/SideBar";
import SearchBar from "./Section/SearchBar";

function EveryPost() {
  const dispatch = useDispatch();
  const [EveryPosts, setEveryPosts] = useState([]);
  const [Date, setDate] = useState([]);
  const [PostPage, setPostPage] = useState(1);
  useEffect(() => {
    dispatch(everyPost()).then((res) => {
      console.log("res.payload : ", res.payload);
      if (res.payload.postsSuccess) {
        setEveryPosts(res.payload.rows);
        setDate(res.payload.postDateData);
      } else {
        alert("게시물를 불러오지 못했습니다.");
      }
    });
  }, []);

  const pagePost = paginate(EveryPosts, PostPage, 20);
  console.log("pagePost : ", pagePost);

  console.log("PostPage : ", PostPage);

  const renderPosts = pagePost.map((post, index) => {
    // console.log("post : ", post.date);
    return (
      <div key={index}>
        <a
          className="d-flex w-100 text-decoration-none text-dark"
          href={`/post/${post.postId}`}
        >
          <span style={{ width: "25%" }}>{post.categoryName}</span> <br />
          <span style={{ width: "45%" }}>{post.title}</span> <br />
          <span className="text-center" style={{ width: "15%" }}>
            {Date[index]}
          </span>
          <span style={{ width: "15%" }}>{post.name}</span> <br /> <br />
          <span className="text-center" style={{ width: "10%" }}>
            {post.view}
          </span>
          <br /> <br />
        </a>
      </div>
    );
  });
  return (
    <div>
      <div className="justify-content-center w-100">
        <div className="text-center">{mainImage}</div>
        <div
          style={{ marginTop: "0.5%" }}
          className="d-flex justify-content-center"
        >
          <div style={{ height: "100%", width: "11.5%" }}>
            <SideBar />
          </div>
          <div
            className="border border-dark"
            style={{ width: "51.2%", marginLeft: "0.5%" }}
          >
            <Row
              className="d-flex p-2"
              style={{ background: "white", marginRight: 0, marginLeft: 0 }}
            >
              <h3 className="border-bottom border-3 pt-3 pb-3">최신 게시물</h3>
              <div className="d-flex">
                <span style={{ width: "25%" }}>카테고리</span>
                <span className="text-center" style={{ width: "45%" }}>
                  제목
                </span>
                <span className="text-center" style={{ width: "15%" }}>
                  등록일
                </span>
                <span style={{ width: "15%" }}>글쓴이 </span>
                <span className="text-center" style={{ width: "10%" }}>
                  view(s)
                </span>
              </div>
              <br /> <br />
              {renderPosts}
            </Row>
            <Page
              postLength={EveryPosts.length}
              postPageCount={setPostPage}
              postCount={20}
            />
            <div className="text-center">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(EveryPost);
