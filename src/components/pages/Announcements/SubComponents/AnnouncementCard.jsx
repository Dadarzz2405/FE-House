import React from "react";

const announcements = [
  {
    title: "Announce",
    user: "Admin",
    information: "test354ujf",
    date: "DD MM YYYY",
  },
  {
    title: "Announce",
    user: "Admin",
    information: "test354ujf",
    date: "DD MM YYYY",
  },
  {
    title: "Announce",
    user: "Admin",
    information: "test354ujf",
    date: "DD MM YYYY",
  },
  {
    title: "Announce",
    user: "Admin",
    information: "test354ujf",
    date: "DD MM YYYY",
  },
  {
    title: "Announce",
    user: "Admin",
    information: "test354ujf",
    date: "DD MM YYYY",
  },
  {
    title: "Announce",
    user: "Admin",
    information: "test354ujf",
    date: "DD MM YYYY",
  },
  {
    title: "Announce",
    user: "Admin",
    information: "test354ujf",
    date: "DD MM YYYY",
  },
];

const AnnounceCard = ({ announcement }) => (
  <div className="w-full mb-0.5">
    <div className="bg-white border border-gray-200 rounded p-3 w-72">
      <h5 className="font-semibold text-[#003876] mb-1">
        {announcement.title}
      </h5>
      <p className="text-sm text-gray-500 mb-1">
        {announcement.user} - {announcement.date}
      </p>
      <p className="text-sm text-gray-700">{announcement.information}</p>
    </div>
  </div>
);

const AnnoucesDisplay = () => (
  <div className="w-[500px] h-[50vh]">
    <div className="w-full h-full overflow-y-scroll relative border-l border-black">
      {announcements.map((e, i) => (
        <AnnounceCard key={i} announcement={e} />
      ))}
    </div>
  </div>
);

export default AnnoucesDisplay;
