import Svg, { Circle, Line } from "react-native-svg"; // Import SVG components from react-native-svg

export const SearchIcon = () => {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='#B5B8C6'
      strokeWidth='2.5'
      strokeLinecap='round'
      stroke-Linejoin='round'
      className='feather feather-search'
    >
      <Circle cx='11' cy='11' r='8'></Circle>
      <Line x1='21' y1='21' x2='16.65' y2='16.65'></Line>
    </Svg>
  );
};
