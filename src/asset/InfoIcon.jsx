import Svg, { Circle, Line } from "react-native-svg"; // Import SVG components from react-native-svg

export const InfoIcon = () => {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='#2344'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <Circle cx={12} cy={12} r={10} />
      <Line x1={12} y1={16} x2={12} y2={12} />
      <Line x1={12} y1={8} x2={12.01} y2={8} />
    </Svg>
  );
};
