import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Task = (props) => {
  const [imageUri, setImageUri] = useState(null);

  const selectImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission denied');
      }

      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        const { assets } = result;
        if (assets.length > 0) {
          setImageUri(assets[0].uri);
        }
      }
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  return (
    <View style={styles.container}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <View style={styles.content}>
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          <Text style={styles.itemText}>{props.text}</Text>
        </View>
        <TouchableOpacity onPress={selectImage} style={styles.attachButton}>
          <Text style={styles.buttonText}>Vedhæft billede</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    marginRight: 10,
  },
  itemText: {
    maxWidth: '80%',
    color: '#000',
  },
  attachButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#55BCF6',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Task;
