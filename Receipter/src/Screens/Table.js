import React from 'react';
import {Text, View, StyleSheet, PermissionsAndroid} from 'react-native';
import {Button} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import HTML from '../components/Html';

const Table = ({route}) => {
  const {items, buyer, total, shopName, addr} = route.params;
  const date = new Date(buyer.date);

  let h = HTML(shopName, items, addr, date, buyer, total);

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const generatePDF = async () => {
    if (await requestPermission()) {
      const html = h;
      const options = {
        html,
        fileName: 'Receipt',
        directory: 'Documents',
      };
      try {
        const file = await RNHTMLtoPDF.convert(options);
        alert('File Saved to' + file.filePath);
        console.log(file.filePath);
        // navigation.navigate('Preview', {filePath: file.filePath});
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Permission Denied');
    }
  };

  return (
    <>
      <WebView originWhitelist={['*']} source={{html: h}} />
      <View style={styles.bottomBar}>
        <Button
          color="white"
          mode="contained"
          onPress={generatePDF}
          compact
          contentStyle={{padding: 1}}>
          <Ionicons name="document-text" size={20} />
          <Text style={{marginLeft: 15}}> SAVE AS PDF</Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cell: {
    paddingVertical: 5,
    borderRightWidth: 1,
    borderRightColor: 'rgb(166,166,166)',
    paddingRight: 2,
  },
  bottomBar: {
    backgroundColor: 'rgb(76, 158, 55)',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Table;
