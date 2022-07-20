import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';


const myWidth = Dimensions.get("window").width
const myHeight = Dimensions.get("window").height


export default class Main extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   render() {
      return (
         <TouchableOpacity
            style={styles.container}
            onPress={() => { this.props.navigation.navigate("Gallery") }}
         >
            <View style={styles.titleView}>
               <Text style={styles.titleText}> Camera App </Text>
            </View>
            <View style={styles.descriptionView}>
               <Text style={styles.descriptionText}>
                  show gallery pictures
                  take pictures from camera
                  save photo to device
                  delete photo to device
                  delete photo from device
                  share photo
               </Text>
            </View>
         </TouchableOpacity>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      // width: '100%',
      // height: '100%',
      flex: 1,
      display: "flex",
      // flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: "#eb8334"
      backgroundColor: "#393939"
   },
   titleView: {
      flex: 1,
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
   },
   titleText: {
      // width: '100%',
      // height: '100%',
      // fontSize: 80,
      fontSize: myWidth*0.15,
      color: "white"
   },
   descriptionView: {
      flex: 1,
      display: "flex",
      justifyContent: "flex-start",
      padding: 25
   },
   descriptionText: {
      fontSize: myWidth*0.05,
      textAlign: "center",
      color: "white"
   }
})
