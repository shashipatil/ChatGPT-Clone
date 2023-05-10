import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/Screens/Login';
import Chat from './src/Screens/Chat';
import SignUp from './src/Screens/SignUp';
import 'react-native-url-polyfill/auto';
type RootStackParamList = {
  Login: undefined;
  Chat: undefined;
  SignUp: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        {/* Define other screens in the stack */}
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
