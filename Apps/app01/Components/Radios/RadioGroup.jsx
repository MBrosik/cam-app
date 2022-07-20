import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from "expo-camera";
import RadioButton from './RadioButton';

/**@typedef {import("../CameraScreen").default} CameraScreen */

/**
 * @extends {Component<{getFromState:boolean, changeType:"toParentC"|"toParentR", data:[keyof Camera.Constants|"pictureSize", Camera.Constants[keyof Camera.Constants]], camera:Camera, parent:CameraScreen, change?:(value)=>void}>} 
 */
export default class RadioGroup extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selected: null
      };

      /**@type {RadioButton[]} */
      this.radioButtonsArray = []      
   }
   componentDidMount() {
      const { data, camera, getFromState, parent } = this.props;

      if (getFromState) {         
         this.setState({
            selected: parent.state.selectedRatio
         })         
      }
      else {
         if (this.state.selected == null) {            
            this.state.selected = camera ? camera.props[data[0]] : null
            this.setState({})
         }
      }
   }
  

   render() {
      this.radioButtonsArray = []
      const { data, camera, getFromState, changeType } = this.props;      
      
      return (
         <View style={styles.container}>
            <Text style={styles.title}> {data[0].toUpperCase()} </Text>
            

            {Object.entries(data[1]).map((el, ind) => (
               <RadioButton
                  ref={el => this.radioButtonsArray.push(el)}
                  key={ind}

                  selected={this.state.selected == el[1]}
                  propertyName={data[0]}
                  name={el[0]}
                  value={el[1]}
                  camera={camera}

                  parent={this}

                  getFromState={getFromState}
                  changeType={changeType}
               />
            ))}

         </View>
      );
   }
}


const styles = StyleSheet.create({
   container: {
      // marginTop:15,
      padding: 5,
   },
   title: {
      color: "white",
      textAlign: "center",
   }
})