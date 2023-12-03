import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import penjagaHati from "../audio/penjaga_hati.mp3";

export default function Music() {
  const [isPlaying, setPlaying] = useState(false);
  const audioRef = React.createRef();

  const handleToggle = () => {
    setPlaying((prev) => !prev);

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  return (
    <div className="music">
      <audio ref={audioRef} src={penjagaHati} autoPlay loop />
      <ButtonCustom onClick={handleToggle}>
        {isPlaying ? (
          <i className="fa-solid fa-pause"></i>
        ) : (
          <i className="fa-solid fa-play"></i>
        )}
      </ButtonCustom>
    </div>
  );
}

const ButtonCustom = styled(Button)`
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 4rem;
  min-height: 4rem;
  font-size: 1.5rem;
`;
