import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export const webSocketId = 'FFF' + uuidv4() + 'FFF'
const client = new WebSocket(`ws://localhost:6273/${webSocketId}`);

const useClientSocket = () => {
  const [opponent, setOpponent] = useState('');
  const [stepReceivedStr, setStepReceivedStr] = useState('-1@-1');
  const [boardId, setBoardId] = useState(-1);
  const [color, setColor] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  client.onmessage = (message) => {
    const { data } = message
    const [task, payload] = JSON.parse(data)
    // task: Connect, Board, Step
    // Payload: 
    console.log('onMessage:', task, payload)

    switch (task) {
      case 'Connect': {
        break;
      }
      case 'Board info': {
        setOpponent(payload.opponentName);
        setBoardId(payload.boardId);
        setColor(payload.color);
        setIsPlaying(true);
        // console.log(opponent, boardId, color);
        break
      }
      case 'Step': {
        // payload: {stoneColor: playerColor, pos: {row: row, col: col}}

        setStepReceivedStr(payload.pos.row + '@' + payload.pos.col);
        // setStepReceivedCol(payload.pos.col);
        break
      }
      default:{
        break
      }
    }
  }

  client.onclose = () => {
    console.log('I am dead');
  }

  return {
    opponent,
    stepReceivedStr,
    // stepReceivedCol,
    boardId,
    color,
    isPlaying
  }
}

export  {useClientSocket}

