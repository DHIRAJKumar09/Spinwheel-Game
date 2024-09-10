import React from 'react';
import {View,Text,Button,StyleSheet} from 'react-native';

const HomeScreen = ({navigation})=>{
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Spin Wheel Game !</Text>
                <Button title='Start Game' 
                onPress={()=>navigation.navigate('SpinWheel')}
                ></Button>
            
        </View>
    )
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});
export default HomeScreen;