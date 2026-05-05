import { Alert, Pressable, Text, View, Image, TextInput, ActivityIndicator, Dimensions } from "react-native"
import { globalStyle, windowWidth } from "../styles/globalStyles"
import { useEffect, useState } from "react"
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { createItem } from "../services/itemService"
import { NewItem } from "../types/Item"
import { ItemConditionList } from "../types/ItemCondition"
import { colors } from "../styles/colors"
import DropDownPicker from "react-native-dropdown-picker"
import { getUserLocation } from "../utils/globalFunctions"

type ItemTypeKey = keyof typeof ItemConditionList

//@ts-ignore
export default function CreateItemScreen({navigation}){
    
    const [isFocused, setFocused] = useState<string|null>(null)
    const [open, setOpen] = useState(false)
    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [condition, setCondition] = useState<ItemTypeKey|null>("NEW")

    const [sending, setSending] = useState(false)

    useEffect(() => {
        open ? setFocused("condition") : setFocused(null)
    }, [open])

    const [itemConditions, setItemConditions] = useState(Object.entries(ItemConditionList).map(([key, label]) => ({
        label,
        value: key as ItemTypeKey
    })))

    const handleSend = async () => {
        setSending(true)
        const newItem = new FormData()
        const loc = await getUserLocation()

        newItem.append("data", JSON.stringify({
            title: title,
            description: description,
            condition: condition!,
            latitude: loc?.latitude,
            longitude: loc?.longitude
        }))

        newItem.append("file", {
            uri: imageUri,
            name: `treasure-photo-${Date.now()}.jpeg`,
            type: "image/jpeg",
        } as any)

        await createItem(newItem).then(
            (response) => {
                navigation.navigate("AppTabs", { screen: "Home" })
            }
        ).catch(
            (error) =>
                console.log(error)
        )
    }

    const [imageUri, setImageUri] = useState<string|null>(null)

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        
        if (status !== 'granted') {
            Alert.alert('Permission dennied', 'We need access!')
            return
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 1,
            aspect: [1,1]
        })

        if (!result.canceled && result.assets.length > 0) {
            const manipulated = await ImageManipulator.manipulateAsync(
                result.assets[0].uri,
                [{resize: { width: 750 }}],
                { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
            )

            setImageUri(manipulated.uri)
        }
    }

    return(
        <View style={globalStyle.body}>
            <View style={globalStyle.container}> 
                <TextInput style={[globalStyle.input, isFocused === "title" && globalStyle.inputFocused]} placeholderTextColor={isFocused === "title" ? colors.darkLightText : "#999"} placeholder="Title" value={title} onChangeText={setTitle} onFocus={() => setFocused("title")} onBlur={() => setFocused(null)}/>
                
                <TextInput style={[globalStyle.input, isFocused === "description" && globalStyle.inputFocused]} multiline={true} placeholderTextColor={isFocused === "description" ? colors.darkLightText : "#999"} placeholder="Description" value={description} onChangeText={setDescription} onFocus={() => setFocused("description")} onBlur={() => setFocused(null)}/>
                
                <DropDownPicker open={open} value={condition} items={itemConditions} setOpen={setOpen} setValue={setCondition} setItems={setItemConditions} style={[globalStyle.picker, isFocused === "condition" ? {borderColor: colors.primary}: {}]} textStyle={globalStyle.pickerItem} dropDownContainerStyle={globalStyle.pickerDropBox}/>
  
                {!imageUri && <Pressable style={[globalStyle.photoButton]} onPress={takePhoto}>
                    <Text style={globalStyle.simpleButtonText}>Add photo</Text>
                </Pressable>}

                {imageUri && <Image source={{ uri: imageUri }} style={globalStyle.photoDisplay} />}
            </View>

            <View style={globalStyle.footer}>
                <View style={globalStyle.bottomInputContainer}>
                <Pressable style={[globalStyle.mainButton, {width: 260}]} disabled={sending} onPress={handleSend}>
                    {sending ? (<ActivityIndicator size={30} color={colors.secondaryBackground}></ActivityIndicator>)
                        :
                    (<Text style={globalStyle.buttonText}>Create Trash</Text>)}
                </Pressable>
                </View>
            </View>
        </View>
    )
}