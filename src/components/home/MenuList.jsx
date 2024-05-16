import { data } from "../../store/content/DataMenu";
import MenuItem from "./MenuItem";
import React from "react";
const MenuList = () => {
  return (
    <>
      {data.map(({ title, desk, supdesk, img, link, id, collapse_s,collapse_t }) => (
        <MenuItem
          key={id}
          title={title}
          desk={desk}
          supdesk={supdesk}
          img={img}
          link={link}
          collapse_t={collapse_t}
          collapse_s={collapse_s}
          id={data.id}
        />
      ))}
    </>
  );
};

export default MenuList;
