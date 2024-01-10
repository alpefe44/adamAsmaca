import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

const maxAttempts = 6;
const words = ["kedi", "kopek"]

const App = () => {

  const [displedWord, setDispledWord] = useState("");
  const [word, setWord] = useState("")

  const [selectedLetters, setSelectedLetters] = useState(new Set())

  const [attempt, setAttempt] = useState(0);

  const [gameOver, setgameOver] = useState(false);

  const randomWord = () => {
    console.log("calisti")
    const word = Math.floor(Math.random() * words.length);
    setWord(words[word]);
  }

  const playAgain = () => {
    const word = Math.floor(Math.random() * words.length);

    setgameOver(false);
    setAttempt(0);
    setDispledWord("_".repeat(words[word].length));
    setWord(words[word]);
    setSelectedLetters(new Set());
  }

  useEffect(() => {
    randomWord();
  }, [])



  const handleLetterClick = (letter: string) => {
    if (attempt === maxAttempts) {
      Alert.alert("Oyunu Kaybettin Tekrar Oynamak için Yeniden Oynaya Tıkla !!");
      setgameOver(true)
      return
    }

    if (selectedLetters.has(letter) || gameOver) {
      return
    }

    const newSelectedLetters = new Set(selectedLetters);
    newSelectedLetters.add(letter);
    setSelectedLetters(newSelectedLetters);
    //console.log(newSelectedLetters)

    if (!word.includes(letter)) {
      //console.log("giris")
      setAttempt((prev) => prev + 1);
    }

    if (word.includes(letter)) {
      const newDisplayword = word.split("").map((letter) => newSelectedLetters.has(letter) ? letter : '_').join("");
      console.log(newDisplayword, "new")
      setDispledWord(newDisplayword);
      console.log(displedWord, "old")

      if (newDisplayword === word) {
        Alert.alert("Oyunu kazandın !!");
        //console.log("girdi")
        setgameOver(true);
        return
      }
    }


  }

  const renderAlphabetButtons = (): any => {
    const alphabet = 'abcdefghijklmnoprstuvyz';

    return alphabet.split("").map((letter) => {
      return (
        <TouchableOpacity
          onPress={() => handleLetterClick(letter)}
          style={[styles.button, { backgroundColor: selectedLetters.has(letter) ? 'gray' : styles.button.backgroundColor }]}
          key={letter}
          disabled={gameOver}

        >
          <Text style={{ fontWeight: 'bold', color: 'black' }}>{letter.toUpperCase()}</Text>
        </TouchableOpacity>
      )

    })

  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 26, color: 'green' }}>Adam Asmaca</Text>
      <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 22, letterSpacing: 5 }}>{displedWord}</Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>{renderAlphabetButtons()}</View>

      <View style={{ marginTop: 25 }}>
        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18 }}>Attempt : {maxAttempts - attempt}</Text>
      </View>

      {
        gameOver && (
          <TouchableOpacity onPress={playAgain}>
            <View style={{ padding: 15, backgroundColor: 'lightblue' }}>
              <Text style={{ fontWeight: 'bold', color: 'green' }}>Play Again</Text>
            </View>
          </TouchableOpacity>
        )
      }
    </View>
  )
}


const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: 'green',
    margin: 5
  }
})

export default App