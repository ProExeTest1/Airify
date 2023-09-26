import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { fontSize, hp, wp } from '../helpers/helper'
import { AirplaneBlueIcon, BackIcon, MenuIcon } from '../helpers/IconConstant'

const SearchFlights = (props) => {
  return (
    <View style={styles.body}>
        <View style={styles.header}>
            <View style={styles.headerNevBody}>
                <TouchableOpacity><Image style={styles.BackImg} source={BackIcon}/></TouchableOpacity>
                <View style={styles.headerTitleBody}><Text style={styles.headerTitle}>Search Flights</Text></View>
                <TouchableOpacity><Image style={styles.BackImg} source={MenuIcon}/></TouchableOpacity>
            </View>
            <View style={styles.headerNevBody}>
                <View>
                    <Text style={{fontSize:fontSize(22),color:'#fff',fontWeight:'bold',marginBottom:hp(1.5)}}>JFK</Text>
                    <Text style={{color:'#fff'}}>New York</Text>
                </View>
                <View style={{alignItems:'center'}}>
                    <Image style={{height:hp(5),width:wp(40)}} source={AirplaneBlueIcon}/>
                    <Text style={{color:'#fff',fontSize:fontSize(14)}}>1 Seat . Economy</Text>
                </View>
                <View style={{alignItems:'flex-end'}}>
                    <Text style={{fontSize:fontSize(22),color:'#fff',fontWeight:'bold',marginBottom:hp(1.5)}}>JFK</Text>
                    <Text style={{color:'#fff'}}>New York</Text>
                </View>
            </View>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    header:{
        backgroundColor:'#295dff',
        paddingTop:hp(6)
    },
    headerNevBody:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:wp(6),
        alignItems:'center',
        marginBottom:hp(3)
    },
    BackImg:{
        height:wp(8),
        width:wp(8),
    },
    headerTitleBody:{
        position:'absolute',
        width:wp(100),
        alignItems:'center'
    },
    headerTitle:{
        color:"#fff",
        fontSize:fontSize(22),
        fontWeight:'bold',
    }
})
export default SearchFlights