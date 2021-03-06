import React, {useState} from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  Button, 
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import  Card from '../components/Card';
import  Input from '../components/Input';
import  NumberContainer from '../components/NumberContainer';
import  Colors from '../constants/colors';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState ('');
  const [confirmed, setConfirmed] = useState (false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt (enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber >99){
      Alert.alert(
      'Invalid Number!', 
      'Number has to be between 1 and 99', 
      [{text: 'Okay', 
      style: 'destructive', 
      onPress:resetInputHandler }]
      )
      return;
    }
    setConfirmed(true);
    setSelectedNumber(parseInt(enteredValue));
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
    <View style={styles.summaryContainer}>
      <Text>You Have Selected</Text>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <Button title="START GAME" color={Colors.secondaryAccent} onPress={() => props.onStartGame(selectedNumber)}/>
      </View>
    );
  }

return(
  <TouchableWithoutFeedback 
  onPress={() => {
   Keyboard.dismiss ();
  }}>
  <View style={styles.screen}>
 <Text styles={styles.title}>Start a New Game!</Text>
<Card style={styles.inputContainer}>
  <Text>Enter a Two-Digit Number</Text>
  <Input 
  style={styles.input} 
  blurOnSubmit
   autoCapitalize='none' 
   autoCorrect={false} 
   keyboardType='number-pad' 
   maxLength={2}
   onChangeText={numberInputHandler}
   value= {enteredValue}
   />
  <View style={styles.buttonContainer}>
    <View style={styles.button}>
      <Button 
      title= "Reset" 
      onPress={resetInputHandler} 
      color={Colors.accent}/>
      </View>
    <View style={styles.button}>
      <Button 
      title= "Confirm" 
      onPress={confirmInputHandler} 
      color={Colors.primary}/>
      </View>
  </View>
</Card>
{confirmedOutput}
</View>
</TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
screen: {
flex: 1,
padding: 10,
alignItems: 'center'
},

title: {
fontSize: 50,
marginVertical: 10,
marginTop: 20,
},

inputContainer: {
width: 300,
maxWidth: '80%',
alignItems:'center',
marginTop: 30
},

buttonContainer: {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  paddingHorizontal: 15
},

button: {
width: 100,
},

input:{
  width: 50,
  textAlign: 'center',
  fontSize: 10
},

summaryContainer:{
  margin: 20,
  alignItems: 'center'
}
});

export default StartGameScreen;