import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Title, TextInput, Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ShopName = ({open, setOpen, shopName, setShopName, addr, setAddr}) => {
  const [tshop, setTShop] = useState(shopName);
  const [taddr, setTaddr] = useState(addr);
  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    setShopName(tshop);
    setAddr(taddr);
    setOpen(false);
  };

  return (
    <View>
      <TextInput
        value={tshop}
        label="Shop Name"
        mode="outlined"
        autoFocus
        onChangeText={setTShop}
      />
      <TextInput
        value={taddr}
        label="Address"
        mode="outlined"
        onChangeText={setTaddr}
        style={{marginTop: 20}}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15,
        }}>
        <Button
          onPress={() => onClose()}
          style={{backgroundColor: 'red', ...styles.iconStyle}}
          color="white">
          <Ionicons name="close-sharp" size={30} />
        </Button>
        <Button
          onPress={() => onSubmit()}
          style={{backgroundColor: 'green', ...styles.iconStyle}}
          color="white">
          <Ionicons name="checkmark-sharp" size={30} />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    color: 'white',
    borderRadius: 5,
  },
});

export default ShopName;
