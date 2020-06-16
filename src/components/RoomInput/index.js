import React, { useState } from 'react';

function RoomInput() {
  const [rooms, setRooms] = useState([{}]);
  return (
    <div>
      {rooms && rooms.map((_, idx) => {
        return (
        <div style={{display: "flex", alignItems: "center"}}>
          <label style={{margin: "0 0 0 12px"}} htmlFor="room">Sala <span>*</span></label>
          <input 
            style={{margin: "0 12px"}}
            type="text" id="room"
            onChange={e => {
              let roomsAux = rooms;
              roomsAux[idx].name = e.target.value;
              setRooms(roomsAux); 
            }}
          />
          <label style={{margin: "0 0 0 12px"}} htmlFor="size">Capacidade <span>*</span></label>
          <input 
            style={{margin: "0 12px"}}
            type="number" id="size"
            onChange={e => {
              let roomsAux = rooms;
              roomsAux[idx].capacity = e.target.value;
              setRooms(roomsAux); 
            }}
          />
        </div>
      )})}
      <button onClick={() => {
        setRooms(rooms.splice(0, rooms.length-1));
      }}>-</button>
      <button onClick={() => {
        setRooms(rooms.concat([{}]));
      }}>+</button>
    </div>
  );
}
export default RoomInput;