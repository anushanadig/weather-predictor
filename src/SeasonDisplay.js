import "./SeasonDisplay.css";
import React from "react";

const summerConfig = {
  summer: {
    text: "It's Sunny, let's hit the beach",
    iconName: "sun"
  },
  winter: {
    text: "chilling",
    iconName: "snowflake"
  }
};

const getSeason = lat => {
  const month = new Date().getMonth();
  if (month > 2 && month < 9) {
    return lat > 0 ? summerConfig.summer : summerConfig.winter;
  } else {
    return lat > 0 ? summerConfig.winter : summerConfig.summer;
  }
};

const SeasonDisplay = ({ lat }) => {
  const { text, iconName } = getSeason(lat);
  return (
    <div className={`season-display ${iconName}`}>
      <i className={` icon-left massive ${iconName} icon`} />
      <h1>{text}</h1>
      <i className={` icon-right massive ${iconName} icon`} />
    </div>
  );
};

export default SeasonDisplay;
