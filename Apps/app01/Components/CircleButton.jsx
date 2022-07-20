import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const myWidth = Dimensions.get("window").width
const myHeight = Dimensions.get("window").height


/**@typedef {import('react-native').StyleProp<import('react-native').ViewStyle>} styleDef*/

/**@extends {Component<{source, pressHandler, myStyles?:styleDef}>} */
export default class CircleButton extends Component {
   render() {
      const { source, pressHandler, myStyles = {} } = this.props

      return (
         <TouchableOpacity
            style={{ ...styles.touchableStyle, ...myStyles }}
            onPress={pressHandler}
         >
            <Image source={source} style={{ width: "80%", height: "80%" }} />
         </TouchableOpacity>
      )
   }
}

const styles = StyleSheet.create({
   touchableStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#393939",
      width: myWidth * 0.2,
      height: myWidth * 0.2,
      borderRadius: myWidth * 0.5
   },
   TouchableText: {
      textAlign: "center",
      color: "white",
      fontSize: myWidth * 0.05,
   },

   cameraStyle: {
      width: myWidth,
      height: myWidth * 1.25,
      // opacity:1
   }
})