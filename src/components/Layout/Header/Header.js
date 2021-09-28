import React from "react";
import { Fragment } from "react";

import mealsImage from "../../../assets/meals.jpg";
import Image from "../../UI/Image/Image";
import Head from "../../UI/Head/Head";

const Header = () => {
  return (
    <Fragment>
      <Head headerLabel="React Meals" buttonText="Cart" />
      <Image src={mealsImage} alt="A table full of food" />
    </Fragment>
  );
};

export default Header;
