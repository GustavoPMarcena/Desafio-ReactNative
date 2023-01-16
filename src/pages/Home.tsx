import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';


interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasksCounter, setTaskCounter] = useState(0)
  const [task, setTask] = useState('');
  const [dictasks, setDictasks] = useState<Task[]>([]);


  function handleAddNewTask() {
    const newTask = {
      id: dictasks.length + 1,
      title: task,
      done: false,
    };
    setDictasks([...dictasks, newTask]);
    setTask('')

  }



  function removeTask(id: number) {
    const updatedTasks = dictasks.filter((task) => task.id !== id);
    setDictasks(updatedTasks);
  }

  const marktaskdone = (id: number) => {
    const newArray = dictasks.map((item) => {
      if (item.done === false) {
        if (item.id === id) {
          return { ...item, done: true }
        }

      } else {
        if (item.id === id) {
          return { ...item, done: false }

        }
      }
      return item
    })
    setDictasks(newArray)
  }

  return (
    <View >

      {/*  Header  */}

      <View style={styles.container}>
        <Text style={{ color: 'white', fontSize: 30, fontWeight: "bold" }}>to.do</Text>

        <View style={styles.tasks}>
          <Text style={styles.tasksCounter}>Você tem </Text>
          {<Text style={styles.tasksCounterBold}>{dictasks.length} tarefas</Text>}
        </View>

      </View>

      {/*  Inputs  */}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adicionar novo todo..."
          placeholderTextColor="#B2B2B2"
          returnKeyType="send"
          selectionColor="#666666"
          value={task}
          onChangeText={setTask}
        //TODO - use value, onChangeText and onSubmitEditing props

        />

        <TouchableOpacity
          testID="add-new-task-button"
          activeOpacity={0.7}
          style={styles.addButton}
          onPress={handleAddNewTask}
        >
          <Feather name="chevron-right" size={24} color="#B2B2B2" />
        </TouchableOpacity>
      </View>

      {/*  Flat list  */}
      <View >
        <FlatList
          data={dictasks}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgba(199, 184, 184, 0.753)', 'rgba(196, 196, 196, 0)']} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                <TouchableOpacity testID={`button-${index}`} activeOpacity={0.7} style={styles.taskButton} onPress={() => marktaskdone(item.id)}>
                  <View
                    testID={`marker-${index}`}
                    style={styles.taskMarker}
                  >
                    {item.done && (
                      <Feather
                        name="check"
                        size={12}
                        color="#FFF"
                      />
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={[styles.taskTitle, item.done && styles.taskTextDone]}>
                  {item.title}
                </Text>

                <TouchableOpacity onPress={() => removeTask(item.id)} style={{ paddingHorizontal: 24 }}>
                  <Image source={require('../assets/icons/trash/trash@3x.png')} style={{ width: 32, height: 32 }} />
                </TouchableOpacity>
              </LinearGradient>
            )
          }}
        ></FlatList>
      </View >
    </View >


  )
}

const styles = StyleSheet.create({

  container: {
    paddingTop: getStatusBarHeight(true) + 16,
    paddingHorizontal: 24,
    paddingBottom: 60,
    backgroundColor: '#8257E5',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  tasks: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  tasksCounter: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'Inter_400Regular',
  },
  tasksCounterBold: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'Inter_700Bold',
  },
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginTop: -28,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 1,
    borderRightColor: '#EBEBEB',
    color: '#666666'
  },
  addButton: {
    backgroundColor: '#FFF',
    height: 56,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  taskButton: {
    flex: 0.1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',

  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',

    alignItems: 'center',
    justifyContent: 'center',

  },
  taskTitle: {
    flex: 1,
    color: '#666',
    fontFamily: 'Inter-Medium',
    marginLeft: 10,
    fontSize: 18,


  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})
