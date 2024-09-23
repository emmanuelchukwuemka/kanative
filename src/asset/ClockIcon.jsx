import Svg, { Circle, Polyline } from "react-native-svg"; // Import SVG components from react-native-svg

export const ClockIcon = () => {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width='11'
      height='11'
      viewBox='0 0 24 24'
      fill='none'
      stroke='#000'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='feather feather-clock'
    >
      <Circle cx='12' cy='12' r='10'></Circle>
      <Polyline points='12 6 12 12 16 14'></Polyline>
    </Svg>
  );
};
