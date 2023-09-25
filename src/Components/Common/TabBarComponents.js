import { Image, StyleSheet } from 'react-native'
import React from 'react'
import { TabHomeIcon } from '../../Helpers/IconConstant'
import { wp } from '../../Helpers/helper'

const TabBarComponents = (props) => {
  console.log(props);
  return (
    <Image
    source={props?.focused!==true?props?.ActiveIcon:props?.Icon}
    style={[styles.icons]}
    />
  )
}
const styles = StyleSheet.create({
    icons:{
        height:wp(5),
        width:wp(5),
    }
})
export default TabBarComponents