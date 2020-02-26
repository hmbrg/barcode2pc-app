import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";

export default (Icon = ({ name, size }) => {
  let iconImg;
  switch (name) {
    case "torch":
      iconImg = require("../../assets/icons/torch.png");
      break;
    case "torch-active":
      iconImg = require("../../assets/icons/torch-active.png");
      break;
    default:
      iconImg = require("../../assets/icons/torch.png");
      break;
  }

  return (
    <Image
      source={iconImg}
      fadeDuration={0}
      style={{ width: size, height: size }}
    />
  );
});

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
};
