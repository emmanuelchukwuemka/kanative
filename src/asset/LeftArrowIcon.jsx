import Svg, { Rect, Line, Circle, Polyline } from "react-native-svg"; // Import SVG components from react-native-svg

export const LeftArrowIcon = ({ color }) => {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={color || "#000000"}
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='feather feather-arrow-right-circle'
    >
      <Circle cx='12' cy='12' r='10'></Circle>
      <Polyline points='12 16 16 12 12 8'></Polyline>
      <Line x1='8' y1='12' x2='16' y2='12'></Line>
    </Svg>
  );
};
