import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../config/config";

function MovieDetailPage(props) {
  const [MovieDetail, setMovieDetail] = useState([]);
  const [ReleaseDates, setReleaseDates] = useState([]);
  const [SimilarMovieData, setSimilarMovieData] = useState([]);
  const [Cast, setCast] = useState([]);
  let movieId = props.match.params.movieId;

  const minutes = Math.floor(MovieDetail.runtime / 60);
  const seconds = MovieDetail.runtime - minutes * 60;

  useEffect(() => {
    const movieDetail = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
    const movieReleaseDates = `${API_URL}movie/${movieId}/release_dates?api_key=${API_KEY}&language=ko-KR`;
    const movieCredits = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`;
    const similarMovie = `${API_URL}movie/${movieId}/similar?api_key=${API_KEY}&language=ko-KR`;
    axios.get(movieDetail).then((res) => {
      console.log("movie detail : ", res.data);
      setMovieDetail(res.data);
    });
    axios.get(movieReleaseDates).then((res) => {
      console.log("movieReleaseDates : ", res.data);

      if (res.data.results) {
        console.log("movieReleaseDates 2222 : ", res.data.results.length);
        for (let i = 0; i < res.data.results.length; i++) {
          if (res.data.results[i].iso_3166_1 === "KR") {
            console.log("res.data.results[i]", res.data.results[i]);
            setReleaseDates(
              res.data.results[i].release_dates[0].release_date.slice(0, 10)
            );
            break;
          }
        }
      }
    });
    axios.get(movieCredits).then((res) => {
      //console.log("movieCredits : ", res.data);
      //console.log("cast : ", res.data.cast);
      setCast([
        res.data.cast[0],
        res.data.cast[1],
        res.data.cast[2],
        res.data.cast[3],
      ]);
    });
    axios.get(similarMovie).then((res) => {
      //console.log("similar : ", res.data.results);
      setSimilarMovieData([
        res.data.results[0],
        res.data.results[1],
        res.data.results[2],
        res.data.results[3],
      ]);
    });
  }, [movieId]);

  console.log("ReleaseDates : ", ReleaseDates);

  const detailMivieImage = `${IMAGE_BASE_URL}w200${MovieDetail.poster_path}`;
  console.log("Cast : ", Cast);

  const castimg = Cast.map((cast, index) => (
    <div key={index} className="col-3 text-center">
      <img
        style={{ width: "200px", height: "300px" }}
        src={
          cast.profile_path
            ? `${IMAGE_BASE_URL}w200${cast.profile_path}`
            : "/image/userimg.png"
        }
        alt="err"
      ></img>
      <div>{cast.name}</div>
    </div>
  ));
  const similar = SimilarMovieData.map((similar, index) => (
    <div key={index} className="col-3 text-center">
      <Link className="text-decoration-none" to={`/movie/detail/${similar.id}`}>
        <img
          style={{ width: "200px", height: "300px" }}
          src={
            similar.poster_path
              ? `${IMAGE_BASE_URL}w200${similar.poster_path}`
              : null
          }
          alt="err"
        ></img>
        <div className="text-dark">{similar.title}</div>
      </Link>
    </div>
  ));

  const onClick = (e) => {
    e.preventDefault();
    props.history.push(`/movie/${movieId}/cast`);
  };

  return (
    <div className="mt-4">
      <div style={{ width: "50%" }} className="m-auto">
        <div
          className="d-flex justify-content-between"
          style={{ marginBottom: "8%" }}
        >
          <div>
            <div className="h2">
              {MovieDetail.title}
              <span>
                {ReleaseDates.length ? `(${ReleaseDates.slice(0, 4)})` : ""}
              </span>
            </div>
            <div className="h5">{MovieDetail.tagline}</div>
            <div>
              러닝타임 : {minutes}h {seconds}m ({MovieDetail.runtime}min)
            </div>
            <div>평점 : {MovieDetail.vote_average} / 10.0</div>
            <div>개봉 날짜 : {ReleaseDates} 개봉</div>
            {MovieDetail.production_countries ? (
              <div>
                생산국 : {MovieDetail.production_countries[0].iso_3166_1}
              </div>
            ) : null}
            <div className="d-flex">
              <div>장르 :</div>
              <div className="w-50">
                {MovieDetail.genres &&
                  MovieDetail.genres.map((genres, index) => (
                    <React.Fragment key={index}>
                      <div style={{ paddingLeft: "20%" }}>{genres.name}</div>
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
          {MovieDetail.poster_path && (
            <img src={detailMivieImage} alt={MovieDetail.title} />
          )}
        </div>
        <div
          className="border-bottom border-2 border-dark"
          style={{ marginBottom: "3%" }}
        >
          <span
            className="text-decoration-none text-dark h5"
            style={{ paddingRight: "5%" }}
          >
            주요 내용
          </span>
          <span
            className="text-decoration-none text-dark h5"
            style={{ paddingRight: "5%" }}
          >
            출연진
          </span>
          <span
            className="text-decoration-none text-dark h5"
            style={{ paddingRight: "5%" }}
          >
            비슷한 영화
          </span>
        </div>
        <div className="h4"> 주요 내용 </div>
        <span className="justify-content-center">{MovieDetail.overview}</span>
        <br /> <br />
        <div className="d-flex justify-content-between">
          <div className="h4 ">출연진</div>
          <button className="border-0 outline-0" onClick={onClick}>
            더보기
          </button>
        </div>
        <br />
        <div className="row">{castimg}</div>
        <br />
        <div className="h4 ">비슷한 영화</div>
        <br />
        <div className="row">{similar}</div>
      </div>
    </div>
  );
}

export default withRouter(MovieDetailPage);
