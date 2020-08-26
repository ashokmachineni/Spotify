import React, { useEffect, useState } from "react";
import { map } from "lodash";
import Slider from "react-slick";
import "./BasicSliderItems.scss";
import firebase from "../../../utils/Firebase";
import "firebase/storage";
import { Link } from "react-router-dom";
export default function BasicSliderItems(props) {
  const { title, data, folderImage, urlName } = props;

  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    className: "basic-slider-items__list"
  };

  return (
    <div className="basic-slider-items">
      <h2>{title}</h2>
      <Slider {...settings}>
        {map(data, item => (
          <RenderItem
            key={item.id}
            item={item}
            folderImage={folderImage}
            urlName={urlName}
          />
        ))}
      </Slider>
    </div>
  );
}
function RenderItem(props) {
  const { item, folderImage, urlName } = props;
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    firebase
      .storage()
      .ref(`${folderImage}/${item.banner}`)
      .getDownloadURL()
      .then(url => {
        setImageUrl(url);
      });
  }, [item, folderImage]);

  return (
    <Link to={`/${urlName}/${item.id}`}>
      <div className="basic-slider-items__list-item">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <h3>{item.name}</h3>
      </div>
    </Link>
  );
}
