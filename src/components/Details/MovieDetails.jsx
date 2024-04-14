import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie } from "../actions/Movieactions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { removemovie } from "../Redux/Movieslice";
import Loader from "../Loader";
import HorizontalCard from "../HorizontalCard";
export default function Movie({data}) {
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);
  
  return info ? (
    <div
      style={{
        background: `url(https://image.tmdb.org/t/p/original${info.detail.backdrop_path || info.detail.profile_path || info.detail.poster_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width:"100%",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[150vh] relative"
    >
      <nav className="w-full text-zinc-400 flex gap-10 text-xl px-[5vw]">
        <Link
          onClick={() => navigate(-1)}
          className=" text-[2vw] hover:text-[#6556CD] cursor-pointer text-zinc-700 ri-arrow-left-line"
        ></Link>

        <a href={info.detail.homepage} target="_blank">
          <i className="ri-exterl-link-fill"></i>
        </a>
        <a
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          target="_blank"
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imbd_id}/`}
        >
          <i className="">imdb</i>
        </a>
      </nav>

      <div className="w-full  flex  px-20">
        <img
          className="w-[20vw]  shadow-lg  h-[50vh] object-cover"
          src={`https://image.tmdb.org/t/p/original${info.detail.backdrop_path || info.detail.profile_path || info.detail.poster_path}`}
          alt="img"
        />
        <div className="content   text-white ml-[5%] font-bold">
          <h1 className="text-5xl flex ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-[1.5vw] text-zinc-300 ml-5">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex  items-center  gap-x-10 text-zinc-100">
            <span className=" bg-yellow-600 text-white rounded-full sm:w-[20px] sm:h-[20px] w-[50px] h-[50px] flex justify-center items-center font-semibold">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="font-semibold text-[1.5vw] w-[50px] leading-5">
              user score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>

          <h1 className="text-1xl font-semibold italic capitallize">
            {info.detail.tagline}
          </h1>

          <h1 className="text-2xl mt-3 mb-2">overview</h1>
          <p>
            {info.detail.overview.slice(0, 200)}...
            <Link className=" text-blue-500">more</Link>
          </p>

          <h1 className="text-2xl mt-3 mb-2">Languages</h1>

          <p className="mb-5">{info.translations.slice(0, 5).join(",")}...</p>

          <Link
            className=" bg-[#6556CD] py-2   rounded-lg px-4"
            to={`${pathname}/trailer`}
          >
            <i className="text-xl ri-play-fill mr-3"></i>
            Play Tralier
          </Link>

          <Link
            className=" bg-[#6556CD] py-2  rounded-lg px-4 m-10"
            to={`${pathname}/providers/movie`}
          >
            <i className="text-xl ri-play-fill mr-3"></i>
            Watch Live
          </Link>

        </div>
      </div>

      <div className=" w-[80%] flex flex-col  gap-y-10 mt-5">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex items-center text-white gap-x-5 px-10">
            <h1>Available on Platform</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                className="w-[3vw] ml-5"
                title={w.provider_name}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt="img"
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex items-center text-white gap-x-5 px-10">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w) => (
              <img
                title={w.provider_name}
                className="w-[3vw] ml-5"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt="img"
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex items-center text-white gap-x-5 px-10 ">
            <h1>Available to buy</h1>
            {info.watchproviders.buy.map((w) => (
              <img
                title={w.provider_name}
                className="w-[3vw] ml-5"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt="img"
              />
            ))}
          </div>
        )}
      </div>

      <hr className="mt-10 mb-3 ml-5 mr-5 border-none h-[1px] bg-zinc-500"></hr>
      <h1 className="text-3xl font-bold text-white ml-5">
        Recommendations & Similar stuff
      </h1>
      <HorizontalCard
        data={info.recommendations.length >0 ? info.recommendations : info.similar}
      />
      <Outlet />
    </div>
  ) : (
    <Loader />
  );
}
