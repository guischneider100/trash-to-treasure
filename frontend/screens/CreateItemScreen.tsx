import { Alert, Pressable, Text, View, Image, ScrollView, TextInput } from "react-native";
import { globalStyle } from "../styles/globalStyles";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { createItem } from "../services/itemService";
import { NewItem } from "../types/Item";
import { Picker } from "@react-native-picker/picker";
import { ItemType } from "../types/ItemType";

//@ts-ignore
export default function CreateItemScreen({}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [condition, setCondition] = useState("New");

    const handleSend = async () => {
        const photoUrl: string = "";
        const latitude: number = 0.00;
        const longitude: number = 0.00;
        const postedByUserId: number = 5;
        console.error(condition);
        const newItem: NewItem = {title, description, photoUrl, condition, latitude, longitude, postedByUserId};

        await createItem(newItem);
        setTitle("");
        setDescription("");
        setCondition("New");
    }

    const [imageUri, setImageUri] = useState<string|null>(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(status !== 'granted'){
            Alert.alert("Permissão negada", "Precisamos de acesso da galeria!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if(!result.canceled && result.assets.length > 0){
            setImageUri(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permissão negada', 'Precisamos de acesso à câmera!');
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
            <ScrollView contentContainerStyle={globalStyle.container}>
                <TextInput style={globalStyle.input} placeholderTextColor="#999" placeholder="Title" value={title} onChangeText={setTitle}/>
                <TextInput style={globalStyle.input} multiline={true} placeholderTextColor="#999" placeholder="Description" value={description} onChangeText={setDescription}/>
                
                <View style={globalStyle.picker}>
                    <Picker selectedValue={condition} onValueChange={(itemValue) => setCondition(itemValue)}>
                        {Object.values(ItemType).map((type) => (
                            <Picker.Item key={type} label={type} value={type} style={globalStyle.pickerItem}/>
                        ))}
                    </Picker>
                </View>

                {!imageUri && <Pressable style={[globalStyle.photoButton]} onPress={takePhoto}>
                    <Text style={globalStyle.simpleButtonText}>Add photo</Text>
                </Pressable>}

                {imageUri && <Image source={{ uri: imageUri }} style={globalStyle.photoDisplay} />}
            </ScrollView>

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