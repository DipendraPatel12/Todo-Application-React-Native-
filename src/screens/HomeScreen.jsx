import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
const HomeScreen = ({ navigation }) => {
  const [todos, setTodos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadTodos = async () => {
        const stored = await AsyncStorage.getItem('todo');
        if (stored) setTodos(JSON.parse(stored));
        else setTodos([]);
      };

      loadTodos();
    }, [completeIt]),
  );

  const deleteTodo = async id => {
    const data = todos.filter(todo => todo.id !== id);
    await AsyncStorage.setItem('todo', JSON.stringify(data));
    setTodos(data);
  };

  const completeIt = async id => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo,
    );
    setTodos(updatedTodos);
    await AsyncStorage.setItem('todo', JSON.stringify(updatedTodos));
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#EFEBE9' }}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              margin: 12,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              elevation: 5,
            }}
          >
            <View style={{ gap: 5 }}>
              <Text
                style={{
                  textDecorationLine: item.complete ? 'line-through' : 'none',
                  fontSize: 15,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  textDecorationLine: item.complete ? 'line-through' : 'none',
                  fontSize: 12,
                }}
              >
                {item.detail}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Icon
                name="edit"
                size={24}
                color="blue"
                onPress={() => navigation.navigate('ADD TO-DO', { todo: item })}
              />
              <Icon
                name="delete"
                size={24}
                color="red"
                onPress={() => deleteTodo(item.id)}
              />
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={item.complete ? 'green' : 'grey'}
                onPress={() => completeIt(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
