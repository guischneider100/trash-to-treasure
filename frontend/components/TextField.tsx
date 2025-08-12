import { TextInputProps } from "react-native"
import { TextInput } from "react-native-gesture-handler";

interface TextFieldInputProps extends TextInputProps {
  placeholder?: string,
}

export function TextField({placeholder, ...props}: TextFieldInputProps){
  return (
    <TextInput
      {...props}
      style={[{ fontFamily: 'Fredoka_400Regular' }, props.style]}
      placeholder={placeholder}
    />
  );
}
