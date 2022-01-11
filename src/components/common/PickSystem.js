import React from "react";

import classes from "./PickSystem.module.css";

const PickSystem = (props) => {
  const changeCategoryHandler = (event) => {
    props.onChangeSystem(event.target.id);
  };

  const changeVariantHandler = (event) => {
    props.onChangeVariant(event.target.id);
  };

  let transformEyeCandy = 0;
  const categories = props.categories.map((category, i) => {
    if (category.name === props.selectedCategory) {
      transformEyeCandy = i;
    }
    const categoryIsSelected =
      category.name === props.selectedCategory
        ? classes["selected-category"]
        : "";
    return (
      <li
        key={category.name}
        className={`${classes[category.name]} ${categoryIsSelected}`}
      >
        <button id={category.name} onClick={changeCategoryHandler}>
          {category.caption}
        </button>
      </li>
    );
  });

  let variants = null;
  if (props.showVariants) {
    variants = props.activeCategoryVariants.map((variant) => {
      const variantIsSelected =
        variant.name === props.selectedVariant
          ? classes["selected-variant"]
          : "";
      return (
        <li key={variant.name} className={variantIsSelected}>
          <button id={variant.name} onClick={changeVariantHandler}>
            {variant.caption}
          </button>
        </li>
      );
    });
  }

  return (
    <div
      className={`${classes["select-box"]} ${classes[props.selectedCategory]} ${
        !props.showVariants ? classes["close-down"] : ""
      }`}
    >
      <div className={classes["eye-candy"]}>
        <div
          style={{ transform: `translate(0em, ${transformEyeCandy * 3}em)` }}
        ></div>
      </div>
      <ul className={classes.categories}>{categories}</ul>
      {props.showVariants && (
        <div className={classes.variants}>
          <h3>Избор на вариант/зона</h3>
          <ul className={classes.variants}>{variants}</ul>
        </div>
      )}
      {props.showImage && <div className={classes.image}>Image</div>}
    </div>
  );
};

export default PickSystem;
