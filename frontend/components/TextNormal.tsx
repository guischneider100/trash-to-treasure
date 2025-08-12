import { Text, TextProps } from "react-native"

export function TextNormal(props: TextProps){
  return (
    <Text
      {...props}
      style={[{ fontFamily: 'Fredoka_400Regular' }, props.style]}
    />
  );
}
