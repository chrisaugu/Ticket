import React from 'react';

import Icons from "biings-ds/build/bds-icons.min.svg";

const Icon = ({icon, color, size, className}) => (
   <svg className={`icon ${className}`} fill={color} width={size} height={size}>
      <use href={`${Icons}#${icon}-g`} />
   </svg>
);

Icon.defaultProps = {
   size: 30,
   color: 'black',
};

export default Icon;