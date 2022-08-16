import React from "react"

const BottomControlsCenter = () => {
   return (
      <div className="player_controls-center">
         <div className="player_top">
            <div id="randomMusic" className="player_btn playing_random ">
               <i className="icon ic-shuffle"></i>
               <div className="playing_title-hover">Bật phát ngẫu nhiên</div>
            </div>
            <div id="prevMusic" className="player_btn playing_back">
               <i className="icon ic-pre"></i>
            </div>
            <div className="player_playing-input ">
               <i className="icon ic-play-circle-outline"></i>
            </div>
            <div id="nextMusic" className="player_btn playing_next">
               <i className="icon ic-next"></i>
            </div>
            <div id="loopMusic" className="player_btn playing_replay">
               <i className="icon ic-repeat"></i>

               <div className="playing_title-hover">Bật phát lại</div>
            </div>
         </div>
         <div className="player_bottom">
            <p className="playing_time-left">0:02</p>
            <div className="playing_time-up2 progress-area">
               <div className="progress-bar" style={{ width: "1.78051%" }} />
               <audio id="main-audio" src="http://api.mp3.zing.vn/api/streaming/audio/ZWBIFCUE/320/"></audio>
            </div>
            <p className="playing_time-right">2:48</p>
         </div>
      </div>
   )
}

export default BottomControlsCenter
