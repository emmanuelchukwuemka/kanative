import Svg, { Rect, Path } from "react-native-svg"; // Import SVG components from react-native-svg

export const LockIcon = () => {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='#B5B8C6'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='feather feather-lock'
    >
      <Rect x='3' y='11' width='18' height='11' rx='2' ry='2'></Rect>
      <Path d='M7 11V7a5 5 0 0 1 10 0v4'></Path>
    </Svg>
  );
};
