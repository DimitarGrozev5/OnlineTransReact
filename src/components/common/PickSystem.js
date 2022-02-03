import React from "react";

import classes from "./PickSystem.module.css";

const PickSystem = (props) => {
  const changeCategoryHandler = (event) => {
    props.onChangeSystem(event.target.id);
  };

  const changeVariantHandler = (event) => {
    props.onChangeVariant(event.target.id);
  };

  const categories = props.categories.map((category, i) => {
    const categoryIsSelected =
      category.handle === props.selectedCategory
        ? classes["selected-category"]
        : "";
    return (
      <li
        key={category.handle}
        className={`${classes[category.handle]} ${categoryIsSelected}`}
      >
        <button id={category.handle} onClick={changeCategoryHandler}>
          {category.caption}
        </button>
      </li>
    );
  });

  let variants = null;
  if (props.showVariants) {
    variants = props.activeCategoryVariants.map((variant) => {
      const variantIsSelected =
        variant.handle === props.selectedVariant
          ? classes["selected-variant"]
          : "";
      return (
        <li key={variant.handle} className={variantIsSelected}>
          <button id={variant.handle} onClick={changeVariantHandler}>
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
