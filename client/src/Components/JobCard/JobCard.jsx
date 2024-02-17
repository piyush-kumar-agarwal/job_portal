import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import "./jobCard.scss";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../Redux/Store";
const JobCard = ({
  jobTitle,
  jobLocation,
  jobDes,
  jobType,
  salary,
  postAt,
  profileImg,
  jobId,
}) => {
  const [difHours, setDifHours] = useState("");
  const [difMinutes, setDifMinutes] = useState("");
  const [difSecond, setDifSecond] = useState("");
  const currentDateAndTime = new Date();

  useEffect(() => {
    if (postAt) {
      const jobDate = new Date(postAt);
      const timeDifference = currentDateAndTime - jobDate;

      // Convert the time difference to hours, minutes, and seconds
      setDifHours(Math.floor(timeDifference / (1000 * 60 * 60)));
      setDifMinutes(
        Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      );
      setDifSecond(Math.floor((timeDifference % (1000 * 60)) / 1000));
    }
  }, [postAt, currentDateAndTime]);

  return (
    <Link to={`/job/${jobId}`}>
      <div className="jobCard">
        <div className="card_head">
          <img src={`${BASE_URL}/uploads/${profileImg}`} alt="" />
          <div className="head_right">
            <h2>{jobTitle}</h2>
            <p>
              <FaLocationDot />
              <span>{jobLocation}</span>
            </p>
          </div>
        </div>

        <div className="card_mid">
          <p>{jobDes}</p>
        </div>

        <div className="card_bottom">
          <button>{jobType}</button>
          <p>
            $<span>{salary}</span>
          </p>
          <div className="date">
            <MdDateRange />
            <p id="jobs">
              {difHours
                ? `${difHours} Hours`
                : difMinutes
                ? `${difMinutes} Minutes`
                : `${difSecond} Second`}{" "}
              ago
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
