import React, { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { SongRowStyles } from "./SongRow.styles";
import formatMinutes from "utils/formatMinutes";
import formatDateDDMMYY from "utils/formatDateDDMMYY";
import ActionPlay from "components/ui/ActionPlay";
import ActionIcon from "components/ui/ActionIcon";
import LoadingIcon from "components/ui/LoadingIcon";
import ArtistLinks from "./ArtistLinks";
import { useSongRow } from "./useSongRow";

const SongRow = ({ isRadio, isDisk, classDisk, item, isArtist }) => {
  const {
    isLike,
    handleLike,
    handlePlay,
    handleCoverClick,
    resume,
    pause,
    isActiveSong,
    isActiveAlbum,
    playing,
    isReady,
    thumbnail,
    timeRelease,
  } = useSongRow({ item, isRadio, isDisk, isArtist });

  const isActive = isActiveSong || isActiveAlbum;

  return (
    <SongRowStyles
      className={`player_queue-item ${isActiveAlbum ? "active-album" : ""} ${
        isActiveSong ? "active" : ""
      } ${isArtist ? "is-artist" : ""}  ${isDisk ? "is-disk" : ""}`}
    >
      <div className="player_queue-item-left">
        <div className="relative z-[1]">
          <div className="player_queue-left">
            <LazyLoadImage className="player_queue-img" src={thumbnail} alt="" />
            <div onClick={handleCoverClick} className="player_queue-img-hover">
              {!isActive && (
                <span onClick={handlePlay}>
                  <i className="icon action-play ic-play" />
                </span>
              )}
              {isActive && !isReady && <LoadingIcon notLoading />}
              {isActive && isReady && (
                <span onClick={playing ? pause : resume}>
                  {playing ? <ActionIcon /> : <ActionPlay />}
                </span>
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
            item?.streamingStatus === 2 ? "is-vip" : ""
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
                <ArtistLinks artists={item?.artists} />
              </div>
              <div className="player_queue-time">{timeRelease} trước</div>
            </>
          )}

          {isRadio && (
            <>
              <div className="player_queue-name">{item?.album?.title || ""}</div>
              <div className="player_queue-time">
                {formatDateDDMMYY(item?.releaseDate)} •{" "}
                {formatMinutes(item?.duration)} phút
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
          <div onClick={handleLike} className="player_queue-btn player_btn zm-btn">
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
    </SongRowStyles>
  );
};

export default memo(SongRow);
