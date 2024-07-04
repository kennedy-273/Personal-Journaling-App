import { RootStackParamList } from "../../naviagtion/types"
import useGlobalStore from "../../store"
import { Box, Text } from "../../utils/theme"
import { Picker } from "@react-native-picker/picker"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import React, { useState } from "react"
import { Pressable, TextInput } from "react-native"
import SafeAreaWrapper from "../../components/safe-are-wrapper"
import NavigateBack from "../../components/navigate-back"

type EditTaskRoute = RouteProp<RootStackParamList, "EditTask">

const EditTask = () => {
  const { categories, updateTasks, tasks, updateSelectedCategory } = useGlobalStore()
  const navigation = useNavigation()

  const { params } = useRoute<EditTaskRoute>()

  const [newTask, setNewTask] = useState<ITask>(params.task)

  const handleCreateTask = () => {
    const updatedTasks = tasks.map((taskItem) => {
      if (taskItem.id === newTask.id) {
        return {
          ...newTask,
        }
      } else {
        return taskItem
      }
    })

    updateTasks(updatedTasks)
    navigation.navigate("Home")
  }

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((taskItem) => taskItem.id !== newTask.id)
    updateTasks(updatedTasks)
    const currentCategory = categories.find(categoryItem => categoryItem.id === newTask.category_id)
    
    if (currentCategory) {
      updateSelectedCategory(currentCategory)
    navigation.navigate("Home")

    }
    
  }

  return (
    <SafeAreaWrapper>
    <Box flex={1} bg="gray100" p="4" pb="10">
      <NavigateBack />
      <Box height={20} />

      <Box
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          width={"100%"}
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            width={"100%"}
            bg="white"
            borderRadius="roundedXl"
            alignItems="center"
            justifyContent="center"
            p="4"
          >
            <TextInput
              style={{
                fontSize: 20,
                width: "100%",
              }}
              placeholder="Create new task"
              value={newTask.name}
              onChangeText={(text) => {
                setNewTask((prev) => {
                  return {
                    ...prev,
                    name: text,
                  }
                })
              }}
            />
          </Box>
          <Box height={20} />
          <Box width={"100%"}>
            <Picker
              style={{
                backgroundColor: "white",
                borderRadius: 16,
              }}
              selectedValue={newTask.category_id}
              onValueChange={(itemValue) => {
                const currentCategory = categories.find(
                  (categoryItem) => categoryItem.id === itemValue
                )
                if (currentCategory) {
                  setNewTask((task) => {
                    return {
                      ...task,
                      category_id: currentCategory.id,
                    }
                  })
                }
              }}
            >
              {categories.map((category) => {
                return (
                  <Picker.Item
                    style={{
                      backgroundColor: "white",
                      borderRadius: 16,
                    }}
                    key={category.id}
                    label={category.name}
                    value={category.id}
                  />
                )
              })}
            </Picker>
          </Box>
        </Box>
        <Box
          mx="4"
          bg="red500"
          width={"100%"}
          borderRadius="roundedXl"
          p="4"
          alignItems="center"
          style={{
            marginTop: "60%",
          }}
        >
          <Pressable onPress={handleDeleteTask}>
            <Text variant="textXl" color="blu200">
              Delete
            </Text>
          </Pressable>
        </Box>
        <Box
          mx="4"
          bg="blu500"
          width={"100%"}
          borderRadius="roundedXl"
          p="4"
          alignItems="center"
          style={{
            marginTop: 20,
          }}
        >
          <Pressable onPress={handleCreateTask}>
            <Text variant="textXl" color="blu200">
              Edit
            </Text>
          </Pressable>
        </Box>
      </Box>
    </Box>
    </SafeAreaWrapper>
  )
}

export default EditTask