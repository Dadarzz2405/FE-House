import React, { useEffect, useState } from "react";
import api from "../../../API/axios";
import ScoreBar from "./Sub-Component/ScoreBar";

const LiveScores = () => {
  const [housesRank, setHousesRank] = useState([]);
  const [scoreStats, setScoreStats] = useState({});

  useEffect(() => {
    const getScoresData = async () => {
      try {
        const data = await api.get("/api/live-points");
        setHousesRank(
          data.data.map((house) => ({
            rank: house.rank,
            name: house.name,
            score: house.points,
          })),
        );
      } catch (error) {
        console.error("Error fetching live scores:", error);
      }
    };
    getScoresData();
  }, []);

  useEffect(() => {
    if (!housesRank.length) return;
    const scores = housesRank.map((h) => h.score);
    setScoreStats({
      minScore: Math.min(...scores),
      maxScore: Math.max(...scores),
      range: Math.max(...scores) - Math.min(...scores),
    });
  }, [housesRank]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="mt-12 text-center">
        <h1 className="text-[#003876] font-bold text-4xl">
          🏆 Live House Scores
        </h1>
        <p className="text-gray-500 text-lg mt-1">
          Current standings of all Darsanians' Houses
        </p>
      </div>

      <div className="w-4/5 mt-8 flex justify-between">
        {housesRank.map((house, index) => (
          <ScoreBar
            key={index}
            rank={house.rank}
            score={house.score}
            scoreStats={scoreStats}
            house={house.name}
          />
        ))}
      </div>
    </div>
  );
};

export default LiveScores;
