import React from 'react';
import Icons from "biings-ds/build/bds-icons.min.svg";

const Icon = ({icon, color = "black", size = 30, className}) => (
   <svg className={`icon ${className}`} fill={color} width={size} height={size}>
      <use href={`${Icons}#${icon}-g`} />
   </svg>
);

export default Icon;