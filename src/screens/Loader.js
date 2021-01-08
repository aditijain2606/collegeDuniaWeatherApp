
import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native';

const Loader = (props) => {
    return(
        <View style={{flex: 1}}>
            <LottieView source={require('../assets/loader.json')} autoPlay loop />
        </View>
        
    )
}

export default Loader