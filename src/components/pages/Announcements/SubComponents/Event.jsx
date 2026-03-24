import React, { useState, useEffect, useRef } from "react";

const Event = () => {
  const [activeEvent, setActiveEvent] = useState(1);
  const events = useRef();
  const maxEvent = 3;

  useEffect(() => {
    events.current.style.width = `${100 * maxEvent}%`;
    const event = document.querySelectorAll(
      ".announcement .event-frame .event",
    );
    event.forEach((e) => {
      e.style.width = `${100 / maxEvent}%`;
    });
  }, [maxEvent]);

  useEffect(() => {
    events.current.style.left = `${-100 * (activeEvent - 1)}%`;
    events.current.style.right = `${100 * (activeEvent - 1)}%`;
    events.current.style.transition = `all .5s ease-in-out`;
  }, [activeEvent]);

  const leftClick = () => {
    let nextActive = activeEvent - 1;
    if (nextActive < 1) {
      return;
    }
    setActiveEvent(nextActive);
  };

  const rightClick = () => {
    let nextActive = activeEvent + 1;
    if (nextActive > maxEvent) {
      return;
    }
    setActiveEvent(nextActive);
  };

  return (
    <div className="event-container">
      <div className="event-frame">
        {activeEvent > 1 && (
          <button onClick={leftClick} className="left-btn">
            {"<"}
          </button>
        )}
        {activeEvent < maxEvent && (
          <button onClick={rightClick} className="right-btn">
            {">"}
          </button>
        )}
        <div className="events" ref={events}>
          <div className="event event1">
            <h2>Event 1</h2>
          </div>
          <div className="event event2">
            <h2>Event 2</h2>
          </div>
          <div className="event event3">
            <h2>Event 3</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
