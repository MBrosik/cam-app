import React, { Component, createRef, useRef } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Dimensions, ToastAndroid, FlatList, ActivityIndicator } from 'react-native';

import * as MediaLibrary from "expo-media-library";
import PhotoItem from './PhotoItem';

const myWidth = Dimensions.get("window").width
const myHeight = Dimensions.get("window").height

export default class Gallery extends Component {
   constructor(props) {
      super(props);
      this.state = {
         numColumns: 5,
         /**@type {MediaLibrary.Asset[]} */
         photos: [],
         /**@type {PhotoItem[]} */
         itemRefs: [],

         /**@type {"Grid"|"List"} */
         GridList: "Grid",

         loading: false,
      };
   }

   async componentDidMount() {
      this.setState({ loading: true, photos: [] })
      /**
       * Get permisions
       */
      let { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
         alert('brak uprawnień do czytania zdjęć z galerii')
      }

      // const albumName = "Camera";
      const albumName = "DCIM";
      const getPhotos = await MediaLibrary.getAlbumAsync(albumName);

      /**
       * Get photos
       */
      let obj = await MediaLibrary.getAssetsAsync({
         first: 100,           // ilość pobranych assetów
         mediaType: 'photo',    // typ pobieranych danych, photo jest domyślne
         album: getPhotos,
         sortBy: ['creationTime']
      })

      this.setState({ loading: false })

      /**
       * Alert
       */
      ToastAndroid.showWithGravity(
         "Pobrano zdjęcia",
         ToastAndroid.SHORT,
         ToastAndroid.CENTER
      );

      this.setState({ photos: obj.assets })
   }

   changeGridStatus() {
      this.setState({
         GridList: this.state.GridList == "Grid" ? "List" : "Grid",
         numColumns: this.state.GridList == "Grid" ? 1 : 5
      })
   }

   async removeSelected() {
      this.setState({ loading: true })
      let table = this.state.itemRefs.filter(el => el?.state?.selected).map(el => el.props.photoData.id);
      await MediaLibrary.deleteAssetsAsync(table);
      this.setState({ loading: false })
      this.componentDidMount();
   }

   goToCamera() {
      this.props.navigation.navigate("Camera", { refresh: this.componentDidMount.bind(this) })
   }

   render() {
      const { photos, numColumns, itemRefs, GridList, loading } = this.state;

      itemRefs.splice(0, itemRefs.length);

      return (
         <View style={styles.container}>

            {/* 
               Buttons Contaier 
            */}
            <View style={styles.touchableContainer}>

               <TouchableOpacity style={styles.touchableStyle} onPress={this.changeGridStatus.bind(this)}>
                  <Text style={styles.TouchableText}> GRID/LIST </Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.touchableStyle} onPress={this.goToCamera.bind(this)}>
                  <Text style={styles.TouchableText}>OPEN CAMERA</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.touchableStyle} onPress={this.removeSelected.bind(this)}>
                  <Text style={styles.TouchableText}> REMOVE SELECTED</Text>
               </TouchableOpacity>
            </View>

            {/* 
               Photo container
             */}

            <View style={styles.photoContainer}>
               <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%", position: "absolute", left: 0, top: 0, }}>
                  <ActivityIndicator style={{ display: loading ? "flex" : "none" }} size={100} color="#0000ff" />
               </View>

               <FlatList
                  numColumns={numColumns}
                  key={numColumns}
                  data={photos}
                  renderItem={({ item, index }) => (
                     <PhotoItem
                        ref={el => itemRefs.push(el)}
                        photoData={item}
                        width={myWidth / numColumns * 0.9}
                        height={GridList == "Grid" ? myWidth / numColumns * 0.9 : myHeight * 0.2}
                        parentNavigation={this.props.navigation}
                        refresh={() => { this.componentDidMount() }}
                     />
                  )}
               />

            </View>

         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      width: myWidth,
      height: myHeight,
      backgroundColor: "#393939"
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
   // Photo container
   // -------------------
   photoContainer: {
      width: myWidth,
      height: myHeight * 0.75,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   }
})