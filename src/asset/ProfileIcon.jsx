import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export const ProfileIcon = () => {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='#0FBADD'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='feather feather-user'
    >
      <Path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></Path>
      <Circle cx='12' cy='7' r='4'></Circle>
    </Svg>
  );
};
