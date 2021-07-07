import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, Button, Alert, ScrollView} from 'react-native';

import  NumberContainer from '../components/NumberContainer';
import  Card from '../components/Card';
import  Colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max-min)) + min;
  if (rndNum == exclude) {
  return generateRandomBetween (min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess]= useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef (1);
  const currentHigh = useRef (100);

  const {userChoice, onGameOver} = props;

  useEffect(() => {
    if (currentGuess === userChoice){
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver ]);

  const nextGuessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
      Alert.alert ('Don\'t Cheat!', 'You know that the option chosen was wrong', [{text: 'Sorry!', style: 'cancel'}
    ]);
    return;
  } 
  if (direction === 'lower'){
    currentHigh.current = currentGuess;
  } else {
    currentLow.current = currentGuess + 1;
  }
  const nextNumber = generateRandomBetween(
    currentLow.current, 
    currentHigh.current, 
    currentGuess
    );
  setCurrentGuess(nextNumber);
  //setRounds(curRounds => curRounds +1);
  setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
  };

  const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
      <Text>#{numOfRound}</Text>
      <Text>             </Text>
      <Text>{value}</Text>
      </View>
  );

return (
<View style={styles.screen}>
  <Text>Opponent's Guess</Text>
  <NumberContainer>{currentGuess}</NumberContainer>
  <Card style={styles.buttonContainer}>
    <Button title="LOWER" onPress= {nextGuessHandler.bind (this, 'lower')} color={Colors.secondaryAccent}/>
    <Button title="GREATER" onPress={nextGuessHandler.bind (this, 'greater')} color={Colors.secondaryAccent}/>
  </Card>
  <View style={styles.listContainer}>
  <ScrollView contentContainerStyle={styles.list}>
    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length -index))}
  </ScrollView>
  </View>
</View>
);
};

const styles = StyleSheet.create({
screen: {
  flex: 1,
  padding: 10,
  alignItems: 'center',
},

buttonContainer: {
  flexDirection: 'row',
  width: 300,
  maxWidth: '80%',
  justifyContent: 'space-between',
  marginTop: 20
},

listItem :{
borderColor: Colors.primary,
borderWidth: 1,
padding: 15,
marginVertical: 10,
backgroundColor: 'white',
flexDirection: 'row',
justifyContent: 'space-around',
},

listContainer : {
flex: 1,
paddingTop: 15,
width: '80%'
},

list : {
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'flex-end',
}
});

export default GameScreen;
