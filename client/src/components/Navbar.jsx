import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/user.slice";
import { createUrl, getAllUrls, getHistory } from "../store/url.slice";
import UrlList from "./UrlList";

const Navbar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [urlData, setUrl] = useState("");
  useEffect(() => {
    dispatch(getAllUrls(id));
  }, [dispatch]);
  const { newUrl } = useSelector((state) => state.urls);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUrl({ url: urlData }));
    dispatch(getAllUrls(id));
    setUrl("");
  };
  const logOutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleUrlClick = (e, urlId) => {
    dispatch(getHistory(urlId));
  };
  const handleRefreshUrl = () => {
    dispatch(getAllUrls(id));
  };
  return (
    <>
      <div className="h-screen bg-gray-700">
        <div className="flex  bg-slate-900 h-14 justify-center items-center">
          <div>
            <div className="flex-none ">
              <h1 className="fixed left-10 bg-gray-400 p-3 hover:shadow-2xl">
                Url | Shortner
              </h1>
            </div>
            <div className="grow" />
            <div className="flex-none ">
              <Link
                className="fixed right-10 bg-gray-900/55 hover:bg-gray-800 text-gray-300 p-3 text-xl shadow-lg w-32 text-center "
                onClick={logOutHandler}
              >
                Log Out
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mt-10">
          <div className=" w-full flex flex-col    md:m-10 items-center   md:p-10 h-48 md:h-96 bg-gray-400 rounded-md">
            <h1 className="p-1 md:p-3 m-2 text-xl md:text-2xl">
              Enter Your Url
            </h1>

            <form
              className="flex flex-col items-center gap-1 md:gap-2 md:flex-row "
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Enter Url"
                className="p-2 md:p-3 bg-transparent border border-gray-600 rounded-sm outline-none  "
                value={urlData}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-gray-900 p-2 md:p-3 rounded-sm text-gray-300 text-xl w-1/2   md:w-32"
              >
                Short
              </button>
            </form>
            <div className="flex my-2 md:my-5 text-gray-800">
              <ul className="list-disc">
                <li>
                  <a
                    href={newUrl?.redirectUrl}
                    target="_blank"
                    onClick={(e) => {
                      handleUrlClick(e, newUrl?._id);
                    }}
                  >
                    {newUrl?.urlId}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full flex flex-col text-gray-300  h-full max-h-96 bg-gray-800 mt-4  md:m-10 rounded-md">
            <button
              onClick={handleRefreshUrl}
              className="cursor-pointer text-center text-gray-800 p-2 bg-gray-400   text-normal font-mono rounded-sm"
            >
              Refresh Your Urls
            </button>
            {/* <button className=" bg-gray-400 p-3">Refresh</button> */}
            <div className="items-center mt-2 h-72 md:h-96 overflow-auto text-xl">
              <UrlList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
