import {
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTodo = ({ navigation, route }) => {
  const editTodo = route.params?.todo;
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    id: editTodo?.id || '',
    title: editTodo?.title || '',
    detail: editTodo?.detail || '',
    complete: editTodo?.complete || '',
  });

  const addTodo = async todo => {
    if (todo.detail === '' && todo.title === '') return;

    const stored = await AsyncStorage.getItem('todo');
    const existingTodos = stored ? JSON.parse(stored) : [];
    let updatedTodos;
    if (editTodo) {
      updatedTodos = existingTodos.map(todo =>
        todo.id === newTodo.id ? newTodo : todo,
      );
    } else {
      updatedTodos = [
        { ...todo, id: Date.now().toString(), complete: false },
        ...existingTodos,
      ];
    }
    await AsyncStorage.setItem('todo', JSON.stringify(updatedTodos));

    setNewTodo({ title: '', detail: '' });
    console.log('f', updatedTodos);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#EFEBE9' }}>
      <View
        style={{
          marginTop: 30,
          padding: 15,
          gap: 40,
          color: 'black',
        }}
      >
        <TextInput
          placeholder="Title"
          placeholderTextColor="grey"
          style={{ padding: 5, borderBottomWidth: 1, color: 'black' }}
          value={newTodo.title}
          onChangeText={text => setNewTodo({ ...newTodo, title: text })}
        />

        <TextInput
          placeholder="Detail"
          placeholderTextColor="grey"
          value={newTodo.detail}
          style={{ padding: 5, borderBottomWidth: 1, color: 'black' }}
          onChangeText={text => setNewTodo({ ...newTodo, detail: text })}
        />

        <TouchableOpacity
          onPress={() => addTodo(newTodo)}
          style={{
            backgroundColor: '#82B1FF',
            height: 60,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={0.8}
        >
          <Text style={{ fontSize: 18, color: 'lightblack' }}>
            {newTodo.id ? 'UPDATE' : 'ADD'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTodo;
