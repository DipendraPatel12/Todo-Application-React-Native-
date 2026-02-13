import { View, TextInput, Button, Alert } from 'react-native';
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

  const getTodo = async () => {
    const todosFromAsync = await AsyncStorage.getItem('todo');
    setTodos([...JSON.parse(todosFromAsync)]);
    console.log(JSON.parse(todosFromAsync));
    console.log('todos from state', todos);
  };

  return (
    <View style={{ flex: 1, gap: 40, padding: 20, backgroundColor: '#EFEBE9' }}>
      <TextInput
        placeholder="Title"
        style={{ padding: 5, borderBottomWidth: 1, color: 'black' }}
        value={newTodo.title}
        onChangeText={text => setNewTodo({ ...newTodo, title: text })}
      />

      <TextInput
        placeholder="Detail"
        value={newTodo.detail}
        style={{ padding: 5, borderBottomWidth: 1, color: 'black' }}
        onChangeText={text => setNewTodo({ ...newTodo, detail: text })}
      />

      <Button
        title={newTodo.id ? 'Update' : 'Add'}
        onPress={() => addTodo(newTodo)}
      
      />
    </View>
  );
};

export default AddTodo;
