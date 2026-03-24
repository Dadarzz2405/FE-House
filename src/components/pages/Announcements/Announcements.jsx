import React from "react";
import { useEffect, useState } from "react";
import api from "../../../API/axios";
import "./Announcements.css";

import Event from "./SubComponents/Event";
import AnnoucesDisplay from "./SubComponents/AnnouncementCard";

const Announcements = () => {
  const [announce, setAnnounce] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAnnounceData = async () => {
      try {
        const data = await api.get("/api/announcements");

        let finalData = [];
        data.data.forEach((a) => {
          finalData.push({
            title: a.title,
            content: a.content,
            image_url: a.image_url,
            date: a.created_at,
            house: a.house?.name ?? "Unknown",
            captain: {
              name: a.captain?.name ?? "Unknown",
              username: a.captain?.username ?? "-",
            },
          });
        });

        setAnnounce(finalData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setLoading(false);
      }
    };
    getAnnounceData();
  }, []);
  return (
    <div className="announcement">
      <h1>Announcements</h1>
      <div className="headings">
        <h3 className="events">Upcomming Events</h3>
        <h3 className="announcements">Announcements</h3>
      </div>
      <div className="content-container">
        <Event />
        <AnnoucesDisplay />
      </div>
    </div>
  );
};

export default Announcements;
