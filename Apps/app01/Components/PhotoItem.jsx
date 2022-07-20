import React, { Component, createRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import * as MediaLibrary from "expo-media-library";

// @ts-ignore
import cross from "../assets/cross1.png"

/**@extends {Component<{photoData:MediaLibrary.Asset, width:number, height:number, parentNavigation, refresh: ()=>void}>} */
export default class PhotoItem extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selected: false
      };
      this.pressHandler = this.pressHandler.bind(this)
   }

   pressHandler() {
      this.state.selected = !this.state.selected
      this.setState({})
   }

   render() {
      const { photoData, width, height, parentNavigation, refresh } = this.props;
      const { selected } = this.state
      return (
         <TouchableOpacity
            onLongPress={() => parentNavigation.navigate("BigPhoto", { photoData, refresh })}
            onPress={this.pressHandler}
            style={{ ...styles.imageContainer, width, height }}
         >
            <Image style={{ ...styles.imageStyle, opacity: (selected ? 0.4 : 1) }} source={{ uri: photoData.uri }} />
            <Image style={{ ...styles.imageStyle, opacity: (selected ? 0.8 : 0), zIndex: 20 }} source={cross} />
            <Text style={styles.imageText}> {photoData.id} </Text>
         </TouchableOpacity>
      );
   }
}

const styles = StyleSheet.create({
   imageContainer: {
      width: 100,
      height: 100,
      margin: 2,
   },
   imageStyle: {
      width: "100%",
      height: "100%",
      borderRadius: 10,
      position: 'absolute',
      left: 0,
      top: 0,
   },
   imageText: {
      color: "white",
      textAlign: "center",
   }
})