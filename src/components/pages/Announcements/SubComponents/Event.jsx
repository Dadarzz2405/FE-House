import React, { useState, useEffect, useRef } from "react";

const Event = () => {
  const [activeEvent, setActiveEvent] = useState(1);
  const events = useRef();
  const maxEvent = 3;

  useEffect(() => {
    events.current.style.width = `${100 * maxEvent}%`;
    const event = events.current.querySelectorAll(".event-slide");
    event.forEach((e) => {
      e.style.width = `${100 / maxEvent}%`;
    });
  }, []);

  useEffect(() => {
    events.current.style.left = `${-100 * (activeEvent - 1)}%`;
    events.current.style.right = `${100 * (activeEvent - 1)}%`;
    events.current.style.transition = "all .5s ease-in-out";
  }, [activeEvent]);

  const leftClick = () => activeEvent > 1 && setActiveEvent(activeEvent - 1);
  const rightClick = () =>
    activeEvent < maxEvent && setActiveEvent(activeEvent + 1);

  return (
    <div className="flex flex-col justify-between w-[600px] h-full mr-1">
      <div className="w-full h-full bg-gray-200 rounded-[20px] overflow-hidden relative">
        {activeEvent > 1 && (
          <button
            onClick={leftClick}
            className="absolute w-[30px] h-[30px] rounded-full z-[99] bg-black/20 border-none text-white flex justify-center items-center top-1/2 -translate-y-1/2 left-5"
          >
            {"<"}
          </button>
        )}
        {activeEvent < maxEvent && (
          <button
            onClick={rightClick}
            className="absolute w-[30px] h-[30px] rounded-full z-[99] bg-black/20 border-none text-white flex justify-center items-center top-1/2 -translate-y-1/2 right-5"
          >
            {">"}
          </button>
        )}
        <div className="flex absolute" ref={events}>
          <div className="event-slide h-[50vh] bg-teal-300 flex items-center justify-center">
            <h2>Event 1</h2>
          </div>
          <div className="event-slide h-[50vh] bg-blue-300 flex items-center justify-center">
            <h2>Event 2</h2>
          </div>
          <div className="event-slide h-[50vh] bg-green-300 flex items-center justify-center">
            <h2>Event 3</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
