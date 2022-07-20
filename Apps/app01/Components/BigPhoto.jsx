import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Sharing from 'expo-sharing';

import * as MediaLibrary from "expo-media-library";

const myWidth = Dimensions.get("window").width
const myHeight = Dimensions.get("window").height

export default class BigPhoto extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   async sharePhoto() {
      /**@type {MediaLibrary.Asset} */
      const photoData = this.props.route.params.photoData

      if (await Sharing.isAvailableAsync()) {
         Sharing.shareAsync(photoData.uri)
      }

   }

   async removePhotoFromDevice() {
      /**@type {MediaLibrary.Asset} */
      const photoData = this.props.route.params.photoData
      const refresh = this.props.route.params.refresh

      await MediaLibrary.deleteAssetsAsync([photoData.id]);

      refresh();

      this.props.navigation.goBack()
   }

   render() {

      /**@type {MediaLibrary.Asset} */
      const photoData = this.props.route.params.photoData
      const refresh = this.props.route.params.refresh

      return (
         <View style={styles.container}>
            <Image style={styles.imageStyle} source={{ uri: photoData.uri }} />
            <Text style={styles.widthText}> {photoData.height} x {photoData.width}</Text>
            <View style={styles.touchableContainer}>
               <TouchableOpacity style={styles.touchableStyle} onPress={this.sharePhoto.bind(this)}>
                  <Text style={styles.TouchableText}> SHARE</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.touchableStyle} onPress={this.removePhotoFromDevice.bind(this)}>
                  <Text style={styles.TouchableText}> DELETE</Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      display: "flex",
      alignItems: "center",
      width: myWidth,
      height: myHeight,
      backgroundColor: "#393939"
   },

   widthText: {
      color: "white",
      width: "100%",
      textAlign: "center",
      fontSize: 30,
      paddingHorizontal: 50,
   },

   // -------------------
   // Buttons Contaier
   // -------------------
   touchableContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      padding: 20
   },
   touchableStyle: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   TouchableText: {
      textAlign: "center",
      color: "white",
      fontSize: myWidth * 0.05,
   },

   // -------------------
   // Photo
   // -------------------

   imageStyle: {
      width: myWidth * 0.8,
      height: myWidth * 0.8 * 1.25,
      borderRadius: 40,
   },
})