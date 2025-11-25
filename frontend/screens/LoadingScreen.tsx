import { Text, View } from "react-native";
import { globalStyle } from "../styles/globalStyles";
import LottieView from 'lottie-react-native';

export default function LoadingScreen({}) {

    const phrases = ["Leave the world a little bit better than you found it","This app is not about you... It's about the others"];
    
    return(
        <View style={globalStyle.body}> 
            <View style={globalStyle.container}> 
                <LottieView source={require('../assets/map-loading.json')} autoPlay loop style={{width: 300, height: 300}}/>

                <Text style={[globalStyle.title, {fontSize: 30}]}>LOADING...</Text> 
                <Text style={[globalStyle.normalText, {paddingBottom: 10}]}>{phrases[Math.floor(Math.random() * phrases.length)]}</Text>
            </View>
        </View>
    );
}