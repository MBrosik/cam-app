import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

import { Camera } from "expo-camera";

/**@typedef {import("./RadioGroup").default} RadioGroup */

/**@extends {Component<{propertyName:string, name:any, value:any,camera:Camera , selected:boolean, parent:RadioGroup, getFromState:boolean, changeType:"toParentC"|"toParentR"}>} */
export default class RadioButton extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   changeValue() {
      const { propertyName, name, value, camera, getFromState } = this.props;

      if (getFromState) {
         this.props.parent.state.selected = value;
         this.props.parent.props.change(value)
      }
      else {
         if (this.props.camera) {
            this.props.parent.setState({ selected: value }, () => {
               this.props.parent.props.parent.setState({})
            });
         }
      }

   }

   render() {
      const { propertyName, name, value, camera, selected } = this.props;
      

      if (camera) {

         return (
            <TouchableOpacity onPress={this.changeValue.bind(this)} style={styles.radioContainer}>
               <View style={styles.radioOuther}>
                  {
                     // camera.props[propertyName] == value
                     selected || camera.props[propertyName] == value
                        // selected
                        ? (
                           <View style={styles.radioSelected}>
                           </View>
                        )
                        : <View />
                  }
               </View>

               <Text style={styles.title}> {name} </Text>
            </TouchableOpacity>
         );
      }
      else {
         return <View />
      }
   }
}


const styles = StyleSheet.create({
   radioContainer: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 5,
      // gap:5,
   },

   radioOuther: {
      width: 25,
      height: 25,

      borderRadius: 50,
      borderColor: "#0277bd",
      borderStyle: "solid",
      borderWidth: 2,
      marginRight: 10,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
   },

   radioSelected: {
      width: "60%",
      height: "60%",
      backgroundColor: "#0277bd",
      borderRadius: 50,
   },

   title: {
      color: "white",
      // textAlign:"center",
   }
})