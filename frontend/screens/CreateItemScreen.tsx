import { Alert, Pressable, Text, View, Image, ScrollView, TextInput } from "react-native";
import { globalStyle } from "../styles/globalStyles";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { createItem } from "../services/itemService";
import { NewItem } from "../types/Item";
import { ItemType } from "../types/ItemType";
import { colors } from "../styles/colors";
import DropDownPicker from "react-native-dropdown-picker";

type ItemTypeKey = keyof typeof ItemType;

//@ts-ignore
export default function CreateItemScreen({}){
    
    const [isFocused, setFocused] = useState<string|null>(null);
    const [open, setOpen] = useState(false);
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [condition, setCondition] = useState<ItemTypeKey|null>("NEW");

    useEffect(() => {
        open ? setFocused("condition") : setFocused(null);
    }, [open]);

    const [itemConditions, setItemConditions] = useState(Object.entries(ItemType).map(([key, label]) => ({
        label,
        value: key as ItemTypeKey
    })));

    const handleSend = async () => {
        const photoUrl: string = "";
        const latitude: number = 0.00;
        const longitude: number = 0.00;
        const postedByUserId: number = 5;
        const newItem: NewItem = {title, description, photoUrl, condition: condition!, latitude, longitude, postedByUserId};

        await createItem(newItem);
    }

    const [imageUri, setImageUri] = useState<string|null>(null);

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permission dennied', 'We need access!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };

    return(
        <View style={globalStyle.body}>
            <View style={globalStyle.container}> 
                <TextInput style={[globalStyle.input, isFocused === "title" && globalStyle.inputFocused]} placeholderTextColor={isFocused === "title" ? "#000" : "#999"} placeholder="Title" value={title} onChangeText={setTitle} onFocus={() => setFocused("title")} onBlur={() => setFocused(null)}/>
                
                <TextInput style={[globalStyle.input, isFocused === "description" && globalStyle.inputFocused]} multiline={true} placeholderTextColor={isFocused === "description" ? "#000" : "#999"} placeholder="Description" value={description} onChangeText={setDescription} onFocus={() => setFocused("description")} onBlur={() => setFocused(null)}/>
                
                <DropDownPicker open={open} value={condition} items={itemConditions} setOpen={setOpen} setValue={setCondition} setItems={setItemConditions} style={[globalStyle.picker, isFocused === "condition" ? {borderColor: colors.primary}: {}]} textStyle={globalStyle.pickerItem} dropDownContainerStyle={globalStyle.pickerDropBox}/>
  
                {!imageUri && <Pressable style={[globalStyle.photoButton]} onPress={takePhoto}>
                    <Text style={globalStyle.simpleButtonText}>Add photo</Text>
                </Pressable>}

                {imageUri && <Image source={{ uri: imageUri }} style={globalStyle.photoDisplay} />}
            </View>

            <View style={globalStyle.footer}>
                <View style={globalStyle.bottomInputContainer}>
                <Pressable style={[globalStyle.mainButton, {width: 260}]} onPress={handleSend}>
                    <Text style={globalStyle.buttonText}>Create Trash</Text>
                </Pressable>
                </View>
            </View>
        </View>
    );
}