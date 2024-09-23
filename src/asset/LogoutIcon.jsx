import Svg, { Line, Path, Polyline } from "react-native-svg"; // Import SVG components from react-native-svg

export const LogoutIcon = () => {
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
      className='feather feather-log-out'
    >
      <Path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></Path>
      <Polyline points='16 17 21 12 16 7'></Polyline>
      <Line x1='21' y1='12' x2='9' y2='12'></Line>
    </Svg>
  );
};
