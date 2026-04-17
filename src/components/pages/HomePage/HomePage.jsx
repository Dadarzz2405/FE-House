import { useEffect, useRef, useState } from "react";
import Home from "./Sub-Components/Home";

function HomePage() {
  return (
    <div className="home-page w0-[100%]">
      <Home></Home>
      {/* Overview Section */}
      <div className="bg-[#0f0f0f] py-20 px-6">
        <div className="container mx-auto">
          {/* Section heading */}
          <h2
            className="elegant-text text-white text-3xl mb-2"
            style={{ textShadow: "0 0 10px var(--color-main)" }}
          >
            What's Inside
          </h2>
          <p className="body-text text-white/40 text-sm mb-10">
            Everything you need to stay updated with Darsa Houses
          </p>

          {/*
            Grid layout:
              - Left column : House Rank (top) + Announcements (bottom)
              - Right column: Upcoming Events — spans both rows
          */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[480px]">
            {/* Card 1 — House Rank */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 hover:border-white/20 transition-colors">
              <div className="text-2xl">🏆</div>
              <h3 className="heading-text text-white text-lg">House Rank</h3>
              <p className="body-text text-white/50 text-sm leading-relaxed">
                See the current standing of all houses. Points are updated live
                so you always know who's on top.
              </p>
              <button className="btn-darsa-blank-blue mt-auto self-start text-xs">
                View Standings →
              </button>
            </div>

            {/* Card 2 — Announcements */}
            <div className="row-start-2 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 hover:border-white/20 transition-colors">
              <div className="text-2xl">📢</div>
              <h3 className="heading-text text-white text-lg">Announcements</h3>
              <p className="body-text text-white/50 text-sm leading-relaxed">
                Stay in the loop with the latest news, updates, and messages
                posted by house captains and admins.
              </p>
              <button className="btn-darsa-blank-blue mt-auto self-start text-xs">
                Read More →
              </button>
            </div>

            {/* Card 3 — Upcoming Events (spans 2 rows, right column) */}
            <div className="col-start-2 row-start-1 row-span-2 bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-4 hover:border-white/20 transition-colors">
              <div className="text-3xl">📅</div>
              <h3 className="heading-text text-white text-xl">
                Upcoming Events
              </h3>
              <p className="body-text text-white/50 text-sm leading-relaxed">
                Don't miss a thing. Browse all scheduled competitions,
                activities, and house events coming up across the school
                calendar.
              </p>

              {/* Placeholder event list */}
              <div className="flex flex-col gap-3 mt-2">
                {[
                  { label: "Inter-House Debate", date: "Apr 20" },
                  { label: "Science Olympiad", date: "Apr 25" },
                  { label: "Sports Day", date: "May 3" },
                ].map((event) => (
                  <div
                    key={event.label}
                    className="flex justify-between items-center bg-white/5 rounded-lg px-4 py-3 border border-white/5"
                  >
                    <span className="body-text text-white/80 text-sm">
                      {event.label}
                    </span>
                    <span
                      className="body-text text-xs px-2 py-0.5 rounded border"
                      style={{
                        color: "var(--color-highlight)",
                        borderColor: "var(--color-highlight)",
                      }}
                    >
                      {event.date}
                    </span>
                  </div>
                ))}
              </div>

              <button className="btn-darsa-blank-yellow mt-auto self-start text-xs">
                See All Events →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
