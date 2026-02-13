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
            headerTintColor: '#000',
          }}
        >
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'TODO APP',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddTodo')}
                >
                  <Icon name="add" size={24} color="black" />
                </TouchableOpacity>
              ),
            })}
            
          />

          <Stack.Screen name="AddTodo" component={AddTodo} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
