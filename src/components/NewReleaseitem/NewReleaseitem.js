import React, { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import getConterTimeRelese from "../../utils/getConterTimeRelese";
import getFormartMiute from "../../utils/getFormartMiute";
import getFormartTimeDDYY from "../../utils/getFormartTimeDDYY";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ActionPlay from "../Icon/ActionPlay";
import ActionIcon from "../Icon/ActionIcon";
import LoadingIcon from "../Icon/LoadingIcon";
import { setPlay, setReady } from "../../features/SettingPlay/settingPlay";
import {
  fetchPlayList,
  playSongNotAlbum,
} from "../../features/QueueFeatures/QueueFeatures";
import { pushPlayListsLogged } from "../../features/Logged/loggedFeatures";
import useLikeHook from "../../hook/useLikeHook";

const NewReleaseItemStyle = styled.div`
   &.active {
      background: var(--alpha-bg);
      transition: 0.2s;
      .player_queue-item-right {
         display: flex !important;
      }
      .player_queue-img-hover {
         visibility: visible !important;
      }
   }
   &.active-album {
      background: var(--alpha-bg);
      transition: 0.2s;
      .player_queue-item-right {
         display: flex !important;
      }
      .player_queue-img-hover {
         visibility: visible !important;
      }
   }

   &.is-artist {
      &:hover {
         background: unset;
         transition: unset;
      }
   }
   .media-content {
      p {
         font-size: 12px;
         font-weight: 500;
         line-height: 1.9;
         color: var(--text-item-hover);
      }
      h3 {
         text-transform: none;
         font-size: 14px;
         font-weight: 500;
         line-height: 1.57;
         margin-bottom: 2px;
      }
      h4 {
         font-size: 12px;
         white-space: nowrap;
         text-overflow: ellipsis;
         overflow: hidden;
         max-width: 100%;
         line-height: normal;
      }
   }

   &.is-disk {
      &:hover {
         .disk {
            transform: rotate(90deg);
         }
         .player_queue-left {
            transform: translateX(-10px);
         }
      }
      .player_queue-left {
         min-width: 87px;
         height: 87px;
         margin-left: 1rem;
         margin-right: 2.6rem;
         .player_queue-img-hover {
            min-width: 87px;
            height: 87px;
         }
      }

      .disk {
         width: 87px;
         height: 87px;
         transition: transform 0.3s linear;
         background-color: transparent;
         transform: rotate(0);
         z-index: -1;
         position: absolute;
         top: 0;
         left: 20px;
         right: 0;
         bottom: 0;
      }
   }

   .player_queue-left {
      min-width: 6rem;
      height: 6rem;
      transition: transform 0.3s linear;
      box-shadow: unset;
      .player_queue-img-hover {
         min-width: 6rem;
         height: 6rem;
      }
   }
   .player_queue-name,
   .player_queue-music,
   .player_queue-time {
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      height: auto;
      overflow: hidden;
   }

   .player_queue-name {
      margin-top: 3px;

      a:hover {
         text-decoration: underline !important;
         color: var(--link-text-hover);
      }

      &:hover {
         text-decoration: unset !important;
      }
   }
   .player_queue-time {
      font-size: 12px;
      line-height: 18px;
      font-weight: 400;
      color: var(--text-secondary);
      margin-top: 3px;
   }
   .media-content {
      span {
         font-size: 10px;
         font-weight: 500;
         line-height: 1.9;
         color: var(--text-item-hover);
      }
      h3 {
         text-transform: none;
         font-size: 14px;
         font-weight: 500;
         line-height: 1.57;
      }
      h4 {
         white-space: nowrap;
         text-overflow: ellipsis;
         overflow: hidden;
         max-width: 100%;
         line-height: normal;
      }
   }
`;

const NewReleaseitem = ({ isRadio, isDisk, classDisk, item, isArtist }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { isLike, handleLike } = useLikeHook(item, isDisk ? 1 : 2);

  const img = item?.thumbnailM?.slice(item?.thumbnailM.lastIndexOf("/"));
  console.log(item?.releaseDate);
  const timeRelease = getConterTimeRelese(item?.releaseDate, item?.isAlbum);

  const currentEncodeId = useSelector(
    (state) => state.queueNowPlay.currentEncodeId
  );
  const playlistEncodeId = useSelector(
    (state) => state.queueNowPlay.playlistEncodeId
  );

  const { playing, isReady } = useSelector((state) => state.setting);
  let active = item?.encodeId === currentEncodeId;
  let activeAlbum = playlistEncodeId === item?.encodeId;

  return (
    <NewReleaseItemStyle
      className={`player_queue-item ${activeAlbum ? "active-album" : ""} ${
        active ? "active" : ""
      } ${isArtist ? "is-artist" : ""}  ${isDisk ? "is-disk" : ""}`}
    >
      <div className="player_queue-item-left">
        <div className="relative z-[1]">
          <div className="player_queue-left">
            {!isArtist && (
              <LazyLoadImage
                visibleByDefault={item?.thumbnailM === img}
                className="player_queue-img"
                src={item?.thumbnailM}
                alt=""
              />
            )}

            {isArtist && (
              <LazyLoadImage
                className="player_queue-img"
                src={item?.thumbnailM}
                alt=""
              />
            )}
            <div
              onClick={(e) => {
                if (!isDisk) return;

                if (e.target.className.includes("player_queue-img-hover")) {
                  navigate(`/album/${item?.encodeId}`);
                }
              }}
              className="player_queue-img-hover"
            >
              {!active && !activeAlbum && (
                <span
                  onClick={() => {
                    if (item?.streamingStatus === 2) {
                      return toast("Dành Cho Tài Khoản VIP", {
                        type: "info",
                      });
                    }

                    if (isRadio) {
                      return toast(
                        "Radio đang phát triển , vui lòng thông cảm !",
                        {
                          type: "info",
                        }
                      );
                    }

                    if (isArtist) {
                      const handele = async () => {
                        dispatch(setReady(false));
                        dispatch(setPlay(false));
                        await dispatch(fetchPlayList(item?.encodeId));
                        dispatch(setPlay(true));
                      };
                      handele();
                    }

                    if (!isDisk) {
                      const hi = async () => {
                        dispatch(setReady(false));
                        dispatch(setPlay(false));
                        await dispatch(playSongNotAlbum(item));
                        dispatch(setPlay(true));
                      };
                      hi();
                    }

                    if (isDisk) {
                      const handele = async () => {
                        navigate(`/album/${item?.encodeId}`);
                        dispatch(setReady(false));
                        dispatch(setPlay(false));
                        await dispatch(fetchPlayList(item?.encodeId));
                        dispatch(setPlay(true));
                        if (item.textType === "Playlist") {
                          dispatch(pushPlayListsLogged(item));
                        }
                      };
                      handele();
                    }
                  }}
                >
                  <i className="icon action-play ic-play" />
                </span>
              )}
              {(active || activeAlbum) && (
                <>
                  {isReady && (
                    <>
                      {!playing && (
                        <span onClick={() => dispatch(setPlay(true))}>
                          <ActionPlay></ActionPlay>
                        </span>
                      )}
                      {playing && (
                        <span onClick={() => dispatch(setPlay(false))}>
                          <ActionIcon></ActionIcon>
                        </span>
                      )}
                    </>
                  )}

                  {!isReady && <LoadingIcon notLoading></LoadingIcon>}
                </>
              )}
            </div>
          </div>

          {isDisk && (
            <figure className={`image disk ${classDisk ? classDisk : ""}`}>
              <LazyLoadImage
                src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/album-disk.png"
                alt=""
              />
            </figure>
          )}
        </div>
        <div
          className={`player_queue-music-info ${
            item?.streamingStatus === 1
              ? ""
              : item?.streamingStatus === 2
              ? "is-vip"
              : ""
          }`}
        >
          {!isArtist && (
            <div className="player_queue-music">
              {item?.title} <div className="is-vip_img"></div>
            </div>
          )}

          {!isRadio && !isArtist && (
            <>
              <div className="player_queue-name">
                {item?.artists &&
                  item?.artists?.slice(0, 3)?.map((e, index) => {
                    let prara = ", ";

                    if (index === 2) {
                      prara = "...";
                    }

                    if (item?.artists?.length === 1) {
                      prara = "";
                    }
                    if (item?.artists?.length === 2 && index === 1) {
                      prara = "";
                    }
                    if (item?.artists?.length === 3 && index === 2) {
                      prara = "";
                    }
                    return (
                      <span key={index}>
                        <Link to={`/nghe-si/${e.alias}/`}>{e.name}</Link>
                        {prara}
                      </span>
                    );
                  })}
              </div>
              <div className="player_queue-time">{timeRelease} trước</div>
            </>
          )}
          {isRadio && (
            <>
              <div className="player_queue-name">
                {item?.album?.title || ""}
              </div>
              <div className="player_queue-time">
                {getFormartTimeDDYY(item?.releaseDate)} •{" "}
                {getFormartMiute(item?.duration)} phút
              </div>
            </>
          )}
          {isArtist && (
            <div className="media-content">
              <p>Mới Nhất</p>
              <h3 className="player_queue-music">{item?.title}</h3>
              <h4 className="subtitle">{item?.releaseDate}</h4>
            </div>
          )}
        </div>
      </div>
      {!isRadio && !isArtist && (
        <div className="player_queue-item-right">
          <div
            onClick={handleLike}
            className="player_queue-btn player_btn zm-btn"
          >
            <i className={`icon  ${isLike ? "ic-like-full" : "ic-like"} `}></i>
            <span className="playing_title-hover">
              {" "}
              {isLike ? " Xóa khỏi " : "Thêm vào"} thư viện{" "}
            </span>
          </div>
          <div className="player_queue-btn player_btn zm-btn">
            <i className="icon ic-more" />
            <span className="playing_title-hover">Xem thêm</span>
          </div>
        </div>
      )}
    </NewReleaseItemStyle>
  );
};

export default memo(NewReleaseitem);
