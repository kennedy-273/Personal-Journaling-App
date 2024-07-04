import useGlobalStore from "../../store"
import { Box, Text } from "../../utils/theme"
import { Picker } from "@react-native-picker/picker"
import { useNavigation } from "@react-navigation/native"
import { nanoid } from "nanoid/non-secure"
import React, { useState, useEffect } from "react"
import { Pressable, TextInput } from "react-native"

const CreateTask = () => {
  const { categories, selectedCategory, addTask } = useGlobalStore()
  const navigation = useNavigation()

  const [newTask, setNewTask] = useState({
    id: `task_${nanoid()}`,
    name: "",
    category_id: selectedCategory?.id ?? "",
    completed: false,
  })

  useEffect(() => {
    setNewTask((prev) => ({
      ...prev,
      id: `task_${nanoid()}`,
    }))
  }, [])

  const handleCreateTask = () => {
    addTask(newTask)

    setNewTask({
      id: `task_${nanoid()}`,
      name: "",
      category_id: selectedCategory?.id ?? "",
      completed: false,
    })

    navigation.navigate("Home")
  }

  return (
    <Box flex={1} bg="gray100" p="4" pb="10">
      <Box flexDirection="column" alignItems="center" justifyContent="space-between">
        <Box width={"100%"} flexDirection="column" alignItems="center" justifyContent="space-between">
          <Box width={"100%"} bg="white" borderRadius="roundedXl" alignItems="center" justifyContent="center" p="4">
            <TextInput
              style={{ fontSize: 20, width: "100%" }}
              placeholder="Create new task"
              value={newTask.name}
              onChangeText={(text) => setNewTask((prev) => ({ ...prev, name: text }))}
            />
          </Box>
          <Box height={20} />
          <Box width={"100%"}>
            <Picker
              style={{ backgroundColor: "white", borderRadius: 16 }}
              selectedValue={newTask.category_id}
              onValueChange={(itemValue) => {
                setNewTask((prev) => ({ ...prev, category_id: itemValue }))
              }}
            >
              {categories.map((category) => (
                <Picker.Item key={category.id} label={category.name} value={category.id} />
              ))}
            </Picker>
          </Box>
        </Box>
        <Pressable onPress={handleCreateTask}>
          <Box mx="4" bg="blu500" width={"100%"} borderRadius="roundedXl" p="4" alignItems="center">
            <Text variant="textXl" color="blu200">
              Create
            </Text>
          </Box>
        </Pressable>
      </Box>
    </Box>
  )
}

export default CreateTask