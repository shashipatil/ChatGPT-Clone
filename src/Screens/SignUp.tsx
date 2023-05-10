import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomButton from '../components/Button';
import CustomTextInput from '../components/Input';
import {RouteProp, NavigationProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
type RootStackParamList = {
  SignUp: undefined;
  // Other screen names and their params
};

type SignUpScreenRouteProp = RouteProp<RootStackParamList, 'SignUp'>;
type SignUpScreenNavigationProp = NavigationProp<RootStackParamList, 'SignUp'>;

interface SignUpProps {
  route: SignUpScreenRouteProp;
  navigation: SignUpScreenNavigationProp;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const SignUp: React.FC<SignUpProps> = ({navigation}) => {
  const handleSignUp = (values: {email: string; password: string}) => {
    // Navigate to another screen
    storeData(values);
    navigation.navigate('Login');
  };

  const storeData = async (value: any): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (error) {
      // Saving error
      console.log('Error storing data:', error);
    }
  };
  return (
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={handleSignUp}
      validationSchema={validationSchema}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <CustomTextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />

          {errors.email && touched.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}
          <CustomTextInput
            style={styles.input}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {errors.password && touched.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          <CustomButton title="SignUp" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUp;
