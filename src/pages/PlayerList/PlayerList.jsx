import "./PlayerList.css";
import React from "react";
import Player from "./Player/Player"

const Background = () => {
  return (
    <div className="lists-bg absolute top-0 left-0"></div>
  )
}
const PlayerList = () => {
  return (
    <div className="player">
      <Background />

      <Player></Player>
    </div>
  );
};

export default PlayerList;