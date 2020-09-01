import React, { useState, useEffect } from "react";
import { Grid, Progress, Icon, Image, Input } from "semantic-ui-react";
import "./Player.scss";
import ReactPlayer from "react-player";
export default function Player(props) {
  const { songData } = props;
  //console.log(songData);
  const [playing, setPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(120);
  const [volume, setVolume] = useState(0.3);
  const [song, setSong] = useState(null);
  useEffect(() => {
    if (songData.url) {
      setSong(songData.url);
      onStart();
    }
  }, [songData]);
  const onStart = () => {
    setPlaying(true);
  };
  const onPause = () => {
    setPlaying(false);
  };
  const onProgress = data => {
    setPlayedSeconds(data.playedSeconds);
    setTotalSeconds(data.loadedSeconds);
  };

  return (
    <div className="player">
      <Grid>
        <Grid.Column width={4} className="left">
          <Image src={songData.image} />
          {songData.name}
        </Grid.Column>
        <Grid.Column width={8} className="center">
          <div className="controls">
            {playing ? (
              <Icon onClick={onPause} name="pause circle outline" />
            ) : (
              <Icon onClick={onStart} name="play circle outline" />
            )}
          </div>
          <Progress
            progress="value"
            value={playedSeconds}
            total={totalSeconds}
            size="tiny"
          />
        </Grid.Column>
        <Grid.Column width={4} className="right">
          <Input
            label={<Icon name="volume up" />}
            type="range"
            min={0}
            step={0.01}
            max={1}
            name="volume"
            onChange={(e, data) => setVolume(data.value)}
            value={volume}
            onProgress={e => onProgress(e)}
          />
        </Grid.Column>
      </Grid>
      <ReactPlayer
        className="react-player"
        url={song}
        playing={playing}
        volume={volume}
        height="0"
        width="0"
      />
    </div>
  );
}
