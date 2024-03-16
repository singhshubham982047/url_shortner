import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistory, deleteUrl } from "../store/url.slice";
import { TiDeleteOutline } from "react-icons/ti";

const UrlList = () => {
  const dispatch = useDispatch();

  const { urls } = useSelector((state) => state.urls);

  const handleUrlClick = (e, urlId) => {
    dispatch(getHistory(urlId));
  };

  const handleDelete = (e, urlId) => {
    e.preventDefault();
    dispatch(deleteUrl(urlId));
  };

  return (
    <>
      {urls.map((i, index) => (
        <div
          key={i._id}
          className="m-2 space-y-1 text-center flex justify-around items-center"
        >
          <span>{`${index + 1}.`}</span>

          <a
            className="hover:text-gray-400 font-light text-base"
            key={i.urlId}
            href={i.redirectUrl}
            target="_blank"
            onClick={(e) => handleUrlClick(e, i._id)}
          >
            {i.urlId}
          </a>
          <div className="w-1/2">
            <span className="font-extralight text-sm">
              {i.redirectUrl.slice(0, 30) + "..."}
            </span>
          </div>
          <span className="font-thin text-sm">{`Clicks - ${
            i.visitedHistory?.length || ""
          }`}</span>

          <TiDeleteOutline
            onClick={(e) => {
              handleDelete(e, i._id);
            }}
            className="cursor-pointer"
          />
        </div>
      ))}
    </>
  );
};

export default UrlList;
