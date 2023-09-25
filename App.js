import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomPaperTextInput from './src/Components/Common/CustomPaperTextInput'
import { icons } from './src/Helpers/ImageHelper'

const App = () => {
  const [text,setText] = useState('')
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
     <CustomPaperTextInput
     label='From'
     placeholder='Origin'
     onChangeText={(txt)=>setText(txt)}
     width='90%'
     icon={icons.takeOff}
     />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})