import React, { Component } from 'react'
// @ts-ignore
import { ActivityIndicator, BackHandler, Dimensions, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, Animated, FlatList, ScrollView, SafeAreaView } from 'react-native'
import { Camera } from "expo-camera";

import * as MediaLibrary from "expo-media-library";


// @ts-ignore
import rotate from "../assets/rotate.png"
// @ts-ignore
import cross from "../assets/cross1.png"
// @ts-ignore
import settings from "../assets/settings.png"


import CircleButton from './CircleButton';
import RadioGroup from './Radios/RadioGroup';

const myWidth = Dimensions.get("window").width
const myHeight = Dimensions.get("window").height

export default class CameraScreen extends Component {
   constructor(props) {
      super(props)

      Camera.Constants.VideoQuality
      this.state = {
         takingPhoto: false,

         hasCameraPermission: null,
         type: Camera.Constants.Type.back,

         // @ts-ignore


         /**@type {[string,any][]} */
         constantsArr: Object.entries(Camera.Constants).filter(el => el[0] != "Type" && el[0] != "VideoQuality" && el[1] != undefined && Object.keys(el[1]).length != 0).map(el => {
            let strTab = [...el[0]];
            strTab[0] = strTab[0].toLowerCase()
            return [strTab.join(""), el[1]]
         }),

         pos: new Animated.Value(myHeight),

         ratios: { "4:3": "4:3", "16:9": "16:9" },
         selectedRatio: "4:3",
         isHidden: true
      };

      this.handleBackPress = this.handleBackPress.bind(this)

      /**
       * references
       */

      /**@type {RadioGroup[]} */
      this.radioGroups = []

   }


   // -------------------------
   // component life cycle
   // -------------------------
   async componentDidMount() {

      let { status } = await Camera.requestCameraPermissionsAsync();
      this.setState({ hasCameraPermission: status == 'granted' });


      BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
   }

   async componentWillUnmount() {
      this.props.route.params.refresh();
      BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress)
   }

   handleBackPress() {
      this.props.navigation.goBack()

      return true
   }

   // ---------------------------
   // camera
   // ---------------------------
   rotateCamera() {
      this.setState({
         type: this.state.type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back,
      });
   }

   async takePicture() {
      if (this.camera) {
         this.setState({ takingPhoto: true })

         let photo = await this.camera.takePictureAsync();
         // @ts-ignore
         let asset = await MediaLibrary.createAssetAsync(photo.uri);

         this.setState({ takingPhoto: false })

         ToastAndroid.showWithGravity(
            "Zrobiono zdjęcie",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
         );

      }
   }

   async getSizes() {
      if (this.camera) {
         let ratioObj = (await this.camera.getSupportedRatiosAsync()).reduce((prv, curr) => {
            prv[curr] = curr
            return prv
         }, {})

         // @ts-ignore
         this.state.ratios = ratioObj;

         const sizes = await this.camera.getAvailablePictureSizesAsync(this.state.selectedRatio)

         let sizeObj = {}

         sizes.forEach(el => {
            sizeObj[el] = el
         })

         this.state.constantsArr = this.state.constantsArr.filter(el => el[0] != "pictureSize")
         this.state.constantsArr.push(["pictureSize", sizeObj])
         this.setState({})


      }
   };


   async toggle() {
      this.getSizes()

      let toPos;

      if (this.state.isHidden) toPos = 0; else toPos = myHeight

      //animacja

      Animated.spring(
         this.state.pos,
         {
            toValue: toPos,
            velocity: 1,
            tension: 0,
            friction: 10,
            useNativeDriver: true
         }
      ).start();

      this.state.isHidden = !this.state.isHidden;
      this.setState({})
   }

   render() {
      const { hasCameraPermission, type, takingPhoto, constantsArr, ratios } = this.state



      if (hasCameraPermission == null) {
         return (
            <View style={styles.container}>
               <View />
            </View>
         )
      }
      else if (hasCameraPermission == false) {
         return (
            <View style={styles.container}>
               <Text>brak dostępu do kamery</Text>
            </View>
         )
      }
      else {

         let obj = {
            pictureSize: "640x480"
         }

         this.radioGroups.forEach(el => {
            if (el != undefined) {

               let found = el.radioButtonsArray.find(el1 => el1?.props?.selected)
               if (found) {
                  obj[el.props.data[0]] = found.props.value
               }
            }
         })
         this.radioGroups = [];

         return (
            <View style={styles.container}>
               <Camera
                  ref={ref => {
                     this.camera = ref;
                  }}
                  style={{ ...styles.cameraStyle, opacity: takingPhoto ? 0.4 : 1 }}

                  {...obj}
                  type={type}

               >

                  <View style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-around", padding: 10, position: "relative" }}>

                     <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", position: "absolute", left: 0, top: 0, }}>
                        <ActivityIndicator style={{ display: takingPhoto ? "flex" : "none" }} size={100} color="#0000ff" />
                     </View>

                     {/* 
                        Container for Buttons
                     */}

                     <View style={{ width: myWidth, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", padding: 10 }}>
                        <CircleButton source={rotate} pressHandler={this.rotateCamera.bind(this)} />
                        <CircleButton
                           source={cross}
                           pressHandler={this.takePicture.bind(this)}
                           myStyles={{ width: myWidth * 0.25, height: myWidth * 0.25, }}
                        />
                        <CircleButton
                           source={settings}
                           pressHandler={() => this.toggle()}
                           myStyles={{ width: myWidth * 0.25, height: myWidth * 0.25, }}
                        />

                     </View>
                  </View>
               </Camera>


               {/* 
                  Animated View 
               */}
               <Animated.View style={[
                  styles.settings,
                  {
                     transform: [
                        { translateY: this.state.pos }
                     ]
                  }]}>

                  <View style={styles.setTextView}>
                     <Text style={styles.setText}>SETTINGS</Text>
                  </View>
                  <SafeAreaView style={styles.setRadioCont}>
                     <ScrollView >
                        {constantsArr.map((item, index) => (
                           <RadioGroup
                              getFromState={false}
                              changeType={"toParentR"}
                              ref={ref => this.radioGroups.push(ref)}
                              key={index}
                              data={item}
                              camera={this.camera}
                              parent={this}
                           />
                        ))}

                        <RadioGroup
                           getFromState={true}
                           changeType={"toParentC"}
                           data={["ratios", ratios]}
                           change={(value) => {
                              this.setState({ selectedRatio: value }, () => {
                                 this.getSizes()
                              });
                           }}
                           camera={this.camera}
                           parent={this}
                        />
                     </ScrollView>
                  </SafeAreaView>

               </Animated.View>
            </View>
         )
      }

   }
}

const styles = StyleSheet.create({
   container: {
      height: "100%",
      width: "100%",
      backgroundColor: "#393939",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
   },

   // ------------------------
   // TOUCHABLE CONTAINER 
   // ------------------------
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

   // ------------------------
   // camera
   // ------------------------
   cameraStyle: {
      height: "100%",
      aspectRatio: 3 / 4,
   },

   // ------------------------
   // settings
   // ------------------------
   settings: {
      width: 200,
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "#3939397c",
      height: "100%",
      display: "flex",
   },
   setTextView: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "10%",
   },
   setText: {
      textAlign: "center",
      color: "white",
      fontSize: myWidth * 0.05,
   },
   setRadioCont: {
      height: "90%",
   }
})