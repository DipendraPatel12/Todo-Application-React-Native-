import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import AddTodo from './src/screens/AddTodo';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor="#82B1FF"
        barStyle={'dark-content'}
      ></StatusBar>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#82B1FF',
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            },
          }}
        >
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerTitle: 'TODO APP',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('ADD TO-DO')}
                  style={{ marginRight: 20 }}
                >
                  <Icon name="add" size={30} color="black" />
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen name="ADD TO-DO" component={AddTodo} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
