import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomButton from '../components/Button';
import CustomTextInput from '../components/Input';
import {RouteProp, NavigationProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
type RootStackParamList = {
  Login: undefined;
  // Other screen names and their params
};

type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

interface LoginProps {
  route: LoginScreenRouteProp;
  navigation: LoginScreenNavigationProp;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  key: Yup.string().required('Api key is required'),
});

const Login: React.FC<LoginProps> = ({navigation}) => {
  const handleLogin = (values: {email: any; password: any; key: any}) => {
    // Navigate to another screen
    getData(values);
    storeAPIKeyData(values.key);
  };

  const handleSignUp = () => {
    // Navigate to another screen
    navigation.navigate('SignUp');
  };

  const storeAPIKeyData = async (value: any): Promise<void> => {
    try {
      await AsyncStorage.setItem('@storage_APIKey', value);
    } catch (error) {
      // Saving error
      console.log('Error storing data:', error);
    }
  };

  const getData = async (values: any) => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        const jsonValue = JSON.parse(value);
        console.log('here', jsonValue, values.email);
        if (
          jsonValue.email === values.email &&
          jsonValue.password === values.password
        ) {
          navigation.navigate('Chat');
        } else {
          Alert.alert('No User found');
        }
      }
    } catch (e) {
      console.log('values', e);
      // error reading value
    }
  };

  return (
    <Formik
      initialValues={{email: '', password: '', key: ''}}
      onSubmit={handleLogin}
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

          <CustomTextInput
            style={styles.input}
            onChangeText={handleChange('key')}
            onBlur={handleBlur('key')}
            value={values.key}
          />
          {errors.key && touched.key && (
            <Text style={styles.error}>{errors.key}</Text>
          )}
          <CustomButton title="Login" onPress={handleSubmit} />
          <View style={{marginTop: 5}}>
            <CustomButton title="SignUp" onPress={handleSignUp} />
          </View>
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

export default Login;
