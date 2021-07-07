import React from 'react';
import {StyleSheet, View, Text, Button, Image } from 'react-native';
import  Colors from '../constants/colors';

const GameOverScreen = props => {
return (
<View style={styles.screen}>
  <Text> The Game is Over! </Text>
  <View style={styles.imageContainer}>
  <Image 
  style={styles.image} 
  //source={require('../constants/success.png')}
  source={{uri: 'https://mcdn.wallpapersafari.com/medium/1/62/2Dzs6j.jpg'}}
  resizeMode="cover" />
  </View>
  <View style={styles.resultContainer}>
  <Text style={styles.resultText}>Your Phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></Text>
  </View>
  <Button style={styles.buttonstyle} title= "NEW GAME" onPress={props.onRestart} color={Colors.secondaryAccent}/>
</View>
);
};

const styles = StyleSheet.create({
screen : {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
image: {
  width: '100%',
  height: '100%',
},
imageContainer: {
  width: 250,
  height: 250, 
  borderRadius: 125,
  borderWidth: 3,
  borderColor: 'black',
  overflow: 'hidden',
  marginVertical: 30
},
highlight:{
  color: Colors.primary,
  fontWeight: 'bold'
},
resultContainer:{
  marginVertical: 15,
  marginHorizontal: 20,
},
resultText:{
fontSize: 20,
textAlign: 'center'
}
});

export default GameOverScreen
