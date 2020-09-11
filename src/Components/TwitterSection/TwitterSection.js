import React, { useContext, Fragment } from "react";
import { GeoContext } from "../../contexts/GeoContext";
import { Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const { Link } = Typography;

export default function NewsSection() {
  const { tweets } = useContext(GeoContext);
  console.log(tweets);
  return (
    <div className="twitter">
      <div className="twitter-section">
        <h3>Local Social Media</h3>
        {tweets ? (
          tweets.map((tweet) => {
            return (
              <div className="tweets" key={tweet.id}>
                <div className="tweets__headline">
                  <div className="tweets__avatar">
                    <img src={tweet.user_image_url} />
                  </div>
                  <div className="tweets__author">
                    <h3>{tweet.name}</h3>
                    <h4>@{tweet.user_name}</h4>
                  </div>
                </div>
                <div className="tweets__content">
                  <p>{tweet.content}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: "center" }}>
            <LoadingOutlined className="map-loading-icon" />
          </div>
        )}
      </div>
    </div>
  );
}
