import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg";

export const HospitalIcon = (props) => {
  return (
    <Svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Path fill="url(#pattern0_48_614)" d="M0 0H48V48H0z" />
      <Defs>
        <Pattern
          id="pattern0_48_614"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_48_614" transform="scale(.01111)" />
        </Pattern>
        <Image
          id="image0_48_614"
          width={90}
          height={90}
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB4UlEQVR4nO2cO04DQRBEOwKOAJgj8smwT8gnAo6C7MTRQys5sAiQ1mjbpZp6sYNX5dGspqWZqhBCCCGEEEIIIYRQwBXwBLwDO3zZAW/AI3DZ+tcDd8AX4/E5Ze9cySOWfFz28iv7sF2MzkNH0dOePDqvHUVvz51SgG1H0QFI0U2k6CZSdBMpuokU3YRb0XvgGbj9w+cWWB9+24Zb0esZXlPZbbgVfTPD67pTzKroMnIrpzAIu5VTGITdyikMwm7lFAZht3IKg7BbOYVB2K2cwiDsVk5hEHYrpzAIu5VTGITdyikMwm6zWWLUeS7+M2LtkFts1HkuThmxdkgtNuo8F6eMWDuktIRcc8kJueaSE3LNJSfkmktOyDWXnJBrrrlCigeV3wArh6LXJQ6wcSh6fzh5ya1styP4yTi5lVMYhN3KKQzCbuUUBmG3cgqDsFs5hUHYrZzCIOxWTmEQdiunMAi7lVMYhN3KKQzCbuUUBmG3Ug7DjEHUKaPO/zDy9bdNp5jjhc51LnQOTJmtaFlSdBMpuokU3USKNio6z7HBd0fReWCQngcGp1dnR+e+o+jLw0Ooo/IBXCxe9NGzxp+DlrxqKfnXyn6Y9ivzD+QWeJm2i7aVHEIIIYQQQgghhFDa/ABHp6G8KjLzsAAAAABJRU5ErkJggg=="
        />
      </Defs>
    </Svg>
  );
};

export const DogIcon = (props) => (
  <MaterialCommunityIcons name="dog" size={24} color="white" {...props} />
);

export const MarkerIcon = (props) => (
  <MaterialCommunityIcons
    name="map-marker"
    size={24}
    color="white"
    {...props}
  />
);

export const MenuIcon = (props) => (
  <MaterialCommunityIcons name="menu" size={24} color="white" {...props} />
);

export const AddIcon = (props) => (
  <MaterialCommunityIcons
    name="plus-circle"
    size={24}
    color="black"
    {...props}
  />
);

export const EditIcon = (props) => (
  <MaterialCommunityIcons name="pencil" size={24} color="white" {...props} />
);

export const FilterIcon = (props) => (
  <MaterialCommunityIcons
    name="filter-outline"
    size={24}
    color="white"
    {...props}
  />
);

export const BellIcon = (props) => (
  <MaterialCommunityIcons
    name="bell-outline"
    size={24}
    color="white"
    {...props}
  />
);

export const HomeIcon = (props) => (
  <MaterialCommunityIcons
    name="home-outline"
    size={24}
    color="white"
    {...props}
  />
);

export const ErrorIcon = (props) => (
  <MaterialIcons name="error" size={24} color="red" {...props} />
);

export const TriangleIcon = (props) => (
  <MaterialCommunityIcons name="triangle" size={32} color="black" {...props} />
);

export const LoadingIcon = (props) => (
  <MaterialCommunityIcons name="loading" size={24} color="black" {...props} />
);
