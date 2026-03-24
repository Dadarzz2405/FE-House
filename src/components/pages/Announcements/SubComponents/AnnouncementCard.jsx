import React from "react";
import { Card } from "react-bootstrap";

const announcements = [
  {
    title: "Annnounce",
    user: "Admin",
    information: "test354ujf",
    date: "DD MM YYYY",
  },
  {
    title: "Annnounce",
    user: "Admin",
    information: "test354ujf",
    date: "DD MM YYYY",
  },
  {
    title: "Annnounce",
    user: "Admin",
    information: "test354ujf",
    date: "DD MM YYYY",
  },
  {
    title: "Annnounce",
    user: "Admin",
    information: "test354ujf",
    date: "DD MM YYYY",
  },
  {
    title: "Annnounce",
    user: "Admin",
    information: "test354ujf",
    date: "DD MM YYYY",
  },
  {
    title: "Annnounce",
    user: "Admin",
    information: "test354ujf",
    date: "DD MM YYYY",
  },
  {
    title: "Annnounce",
    user: "Admin",
    information: "test354ujf",
    date: "DD MM YYYY",
  },
];

const AnnounceCard = ({ announcement }) => {
  return (
    <div className="announce-card">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{announcement.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {announcement.user} - {announcement.date}
          </Card.Subtitle>
          <Card.Text>{announcement.information}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

const AnnoucesDisplay = () => {
  return (
    <div className="announces-display">
      <div className="announces-group">
        <div className="announces-back">
          {announcements.map((e, i) => {
            return (
              <div key={i}>
                <AnnounceCard announcement={e}></AnnounceCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnnoucesDisplay;
