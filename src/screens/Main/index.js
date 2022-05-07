import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
const Main = () => {
  const [images, setImages] = useState();

  const openPicker = async () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then(image => {
        let updateArray = [];
        image.map(async (items, index) => {
          const imageUploadData = new FormData();
          const newData = {
            uri: items?.path,
            name: 'image.jpeg',
            type: 'image/jpeg',
          };
          await imageUploadData.append('image', newData);
          axios({
            method: 'POST',
            url: 'http://10.0.2.2:3000/api/photo',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: imageUploadData,
          })
            .then(res => {
              updateArray.push(res.data);
              if (image.length - 1 === index) {
                setImages(updateArray);
                alert('IMAGE UPLOADED');
              }
            })
            .catch(error => {
              console.log(error, 'error');
            });
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View>
      <TouchableOpacity onPress={openPicker}>
        <Text>Click here to upload Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
