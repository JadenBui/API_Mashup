import React, { useContext } from "react";
import { GeoContext } from "../../contexts/GeoContext";
import { Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const { Link } = Typography;

export default function NewsSection() {
  const { news } = useContext(GeoContext);
  return (
    <div className="news">
      <div className="news-section">
        <h3>Local News</h3>
        {news ? (
          news.map((article, index) => {
            return (
              <div className="news-article" key={article.index}>
                <div className="news-article__headline">
                  <div className="news-article__title">
                    <h4>
                      <Link href={article.url} target="_blank">
                        {article.title}
                      </Link>
                    </h4>
                  </div>
                  <div className="news-article__author">
                    <h5>
                      {article.author} - {article.publishedAt}
                    </h5>
                  </div>
                  <div className="news-article__description">
                    <p>{article.description}</p>
                  </div>
                </div>
                <div className="news-article__image">
                  <img src={article.urlToImage} alt="news images" />
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
