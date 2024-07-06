import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';



const Home = ({navigation}) => {

  // console.log('home rendered')
  const [randomQuote, setRandomQuote] = useState([]);

  return (
    <View style={styles.container}>
      <Image
        source={ require('./images/logo-gradient.png') }
        style={{ width: 225, height: 225 }}/>
      <Text 
        style={{
          fontSize: 20,
          color: '#3E4985',
          fontFamily: 'BioRhyme_400Regular'
        }}>
          A Journaling App
        </Text>
     
      <View>
      
        <Text style={{
          textAlign: 'center',
          marginTop: 15,
          paddingRight: 10,
          fontFamily: 'BioRhyme_400Regular',
          color: '#3E4985',
          fontSize: 10}}
        >
          - {randomQuote.a}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#C1F8CF',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

export default Home;