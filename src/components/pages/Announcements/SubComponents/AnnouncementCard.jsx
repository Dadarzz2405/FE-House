import React from "react";

const AnnounceCard = ({ announcement }) => (
  <div className="w-full mb-0.5">
    <div className="bg-white border border-gray-200 rounded p-3 w-72">
      <h5 className="font-semibold text-[#003876] mb-1">{announcement.title}</h5>
      <p className="text-sm text-gray-500 mb-1">
        {announcement.house} · {announcement.captain.name} ·{" "}
        {new Date(announcement.date).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-700">{announcement.content}</p>
      {announcement.image_url && (
        <img
          src={announcement.image_url}
          alt="announcement"
          className="mt-2 w-full rounded object-cover max-h-40"
          onError={(e) => (e.target.style.display = "none")}
        />
      )}
    </div>
  </div>
);

const AnnoucesDisplay = ({ announcements, loading }) => (
  <div className="w-[500px] h-[50vh]">
    <div className="w-full h-full overflow-y-scroll relative border-l border-black">
      {loading ? (
        <p className="text-sm text-gray-400 p-4">Loading...</p>
      ) : announcements.length === 0 ? (
        <p className="text-sm text-gray-400 p-4">No announcements yet.</p>
      ) : (
        announcements.map((a, i) => (
          <AnnounceCard key={i} announcement={a} />
        ))
      )}
    </div>
  </div>
);

export default AnnoucesDisplay;