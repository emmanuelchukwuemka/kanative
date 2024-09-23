import Svg, { G, Path } from "react-native-svg"; // Import SVG components from react-native-svg

export const PlusIcon = ({ color }) => {
  return (
    <Svg width='12' height='12' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <G id='plus'>
        <Path id='Vector 1302 (Stroke)' fill-rule='evenodd' clip-rule='evenodd' d='M3.6665 7.33335V0.666687H4.33317V7.33335H3.6665Z' fill={color || "white"} />
        <Path
          id='Vector 1303 (Stroke)'
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M7.33317 4.33335H0.666504V3.66669H7.33317V4.33335Z'
          fill={color || "white"}
        />
      </G>
    </Svg>
  );
};
