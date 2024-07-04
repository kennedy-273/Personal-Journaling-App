import useGlobalStore from "../../store"
import { getColors } from "../../utils/helpers"
import { Theme } from "@react-navigation/native"
import { Box, Text } from "../../utils/theme"
import { Picker } from "@react-native-picker/picker"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "@shopify/restyle"
import { nanoid } from "nanoid/non-secure"
import React, { useState, useEffect } from "react"
import { Pressable, TextInput } from "react-native"
import SafeAreaWrapper from "../../components/safe-are-wrapper"
import NavigateBack from "../../components/navigate-back"

const COLORS = getColors()

const CreateCategory = () => {
  const navigation = useNavigation()

  const [newCategory,  setNewCategory] = useState({
    name: "",
    id: `category_${nanoid()}`,
    color: {
      code: "",
      id: "",
      name: "",
    },
  })

  const { addCategory, categories,updateSelectedCategory } = useGlobalStore()

  const theme = useTheme<Theme>()

  useEffect(() => {
    setNewCategory((prev) => ({
      ...prev,
      id: `category_${nanoid()}`,
    }))
  }, [])

  const handleCreateCategory = () => {
    addCategory(newCategory)

    setNewCategory({
      name: "",
      id: `category_${nanoid()}`,
      color: {
        code: "",
        id: "",
        name: "",
      },
    })

      const currentCategory = categories.find(
        (categoryItem) => categoryItem.id === newCategory.id
      )
      if (currentCategory) {
        updateSelectedCategory(newCategory)
        navigation.navigate("Home")
      }
    
  }

  return (
    <SafeAreaWrapper>
    <Box flex={1} bg="gray200" p="4" pb="10">
    <NavigateBack />
    <Box height={20} />
      <Box
        flex={1}
        flexDirection="column"
        justifyContent="space-between"
        
      >
        <Box flexDirection="column" width={"100%"}>
          <Box bg="white" borderRadius="rounded2Xl" mt="5">
            <TextInput
              placeholder="Create new category"
              value={newCategory.name}
              onChangeText={(text) => {
                setNewCategory((prev) => ({
                  ...prev,
                  name: text,
                }))
              }}
              style={{
                padding: 16,
                fontSize: 20,
                width: "100%",
              }}
            />
          </Box>
          <Box height={20} />
          <Picker
            selectedValue={newCategory.color.id}
            onValueChange={(itemValue, itemIndex) => {
              const currentColor = COLORS.find(
                (color) => color.id === itemValue
              )
              if (currentColor) {
                setNewCategory((prev) => ({
                  ...prev,
                  color: currentColor,
                }))
              } else {
                console.log("Color not found")
              }
            }}
            style={{
              backgroundColor: theme.colors.white,
              borderRadius: 16,
            }}
          >
            {COLORS.map((colorItem) => (
              <Picker.Item
                key={colorItem.id}
                label={colorItem.name}
                value={colorItem.id}
                style={{
                  borderWidth: 2,
                  borderRadius: 40,
                }}
              />
            ))}
          </Picker>
        </Box>
        <Pressable onPress={handleCreateCategory}>
          <Box bg="blu500" py="4" borderRadius="rounded2Xl" alignItems="center">
            <Text color="blu200" variant="textXl">
              Create
            </Text>
          </Box>
        </Pressable>
      </Box>
    </Box>
    </SafeAreaWrapper>
  )
}

export default CreateCategory