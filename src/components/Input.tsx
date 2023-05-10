import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Text,
} from 'react-native';

interface CustomTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={label}
        onChangeText={onChangeText}
        onBlur={typeof onBlur === 'function' ? onBlur : undefined}
        value={value}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default CustomTextInput;
