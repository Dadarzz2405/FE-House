import React from "react";
import { useEffect, useState } from "react";
import api from "../../../API/axios";
import Event from "./SubComponents/Event";
import AnnoucesDisplay from "./SubComponents/AnnouncementCard";

const Announcements = () => {
  const [announce, setAnnounce] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAnnounceData = async () => {
      try {
        const data = await api.get("/api/announcements");
        setAnnounce(
          data.data.map((a) => ({
            title: a.title,
            content: a.content,
            image_url: a.image_url,
            date: a.created_at,
            house: a.house?.name ?? "Unknown",
            captain: {
              name: a.captain?.name ?? "Unknown",
              username: a.captain?.username ?? "-",
            },
          }))
        );
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };
    getAnnounceData();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-center font-semibold mt-20 tracking-wide text-[#003876] text-3xl">
        Announcements
      </h1>
      <div className="w-4/5 flex justify-center items-center">
        <h3 className="w-[625px] text-[#003876]">Upcoming Events</h3>
        <h3 className="w-[500px] text-[#003876]">Announcements</h3>
      </div>
      <div className="w-4/5 h-[50vh] flex justify-between items-start">
        <Event />
        <AnnoucesDisplay announcements={announce} loading={loading} />
      </div>
    </div>
  );
};

export default Announcements;