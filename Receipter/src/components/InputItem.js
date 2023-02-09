import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {TextInput, Title, List, HelperText} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InputItem = ({id, items, setItems, total, setTotal, er, ermsg}) => {
  const onChangeHandler = (e, value) => {
    const temp = [...items];
    temp[id - 1][value] = e;
    setItems(temp);
    if (
      items[id - 1].quantity &&
      items[id - 1].ppq &&
      items[id - 1].discount &&
      items[id - 1].gst
    ) {
      const temp = [...items];
      let ttotal = total;
      ttotal -= parseFloat(temp[id - 1].total);
      let t =
        parseFloat(items[id - 1].quantity) * parseFloat(items[id - 1].ppq);
      t = t - (parseFloat(items[id - 1].discount) * t) / 100;
      t = t + (parseFloat(items[id - 1].gst) * t) / 100;
      temp[id - 1].total = t.toFixed(2);
      setItems(temp);
      ttotal += t;
      setTotal(ttotal.toFixed(2));
    } else if (items[id - 1].total != '0') {
      let ttotal = total;
      ttotal -= parseFloat(temp[id - 1].total);
      setTotal(ttotal.toFixed(2));
      const temp2 = [...items];
      temp2[id - 1].total = '0';
      setItems(temp2);
    }
  };

  const deleteItem = () => {
    const temp = [...items];
    let ttotal = total;
    ttotal -= parseFloat(temp[id - 1].total);
    setTotal(ttotal.toFixed(2));
    temp.splice(id - 1, 1);
    setItems(temp);
  };

  return (
    <View
      style={{
        backgroundColor: 'rgb(235,235,235)',
        borderRadius: 10,
        margin: 10,
      }}
      key={id}>
      <HelperText
        type="error"
        visible={er === id}
        style={{position: `${er === id ? 'relative' : 'absolute'}`}}>
        {'ermsg'}
      </HelperText>
      <List.Accordion
        title={`${items[id - 1].name || 'Item' + id}`}
        description={`TOTAL = ₹ ${items[id - 1].total}`}
        style={{
          backgroundColor: 'rgb(235,235,235)',
        }}
        id={id}>
        {/* ITEM NAME */}
        <TextInput
          label="Item name"
          mode="outlined"
          value={items[id - 1].name}
          onChangeText={e => onChangeHandler(e, 'name')}
          activeOutlineColor="black"
          style={{margin: 5}}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '49.5%'}}>
            {/* QUANTITY */}
            <TextInput
              label="Quantity"
              mode="outlined"
              keyboardType="numeric"
              value={items[id - 1].quantity}
              onChangeText={e => onChangeHandler(e, 'quantity')}
              activeOutlineColor="black"
              style={{margin: 5}}
            />
          </View>
          <View style={{width: '49.5%'}}>
            {/* PPQ */}
            <TextInput
              label="Price per quantity"
              mode="outlined"
              keyboardType="numeric"
              value={items[id - 1].ppq}
              onChangeText={e => onChangeHandler(e, 'ppq')}
              activeOutlineColor="black"
              style={{margin: 5}}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '49.5%'}}>
            {/* DISCOUNT */}
            <TextInput
              label="Discount %"
              mode="outlined"
              keyboardType="numeric"
              value={items[id - 1].discount}
              onChangeText={e => onChangeHandler(e, 'discount')}
              activeOutlineColor="black"
              style={{margin: 5}}
            />
          </View>
          <View style={{width: '49.5%'}}>
            {/* GST */}
            <TextInput
              label="GST %"
              mode="outlined"
              keyboardType="numeric"
              value={items[id - 1].gst}
              onChangeText={e => onChangeHandler(e, 'gst')}
              activeOutlineColor="black"
              style={{margin: 5}}
            />
          </View>
        </View>
        {/* TOTAL ROW */}
        <View style={styles.itemTotal}>
          {/* TOTAL AMT */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'rgb(163, 163, 163)',
              padding: 10,
              borderRadius: 7,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                marginRight: 10,
                color: 'white',
                fontWeight: '700',
              }}>
              TOTAL :
            </Text>
            <Text style={{fontSize: 18, color: 'white', fontWeight: '700'}}>
              ₹ {items[id - 1].total}
            </Text>
          </View>
          {/* DELETE ITEM */}
          <Pressable onPress={id => deleteItem(id)}>
            <View style={styles.itemDelete}>
              <Ionicons name="trash" size={25} color="white" />
            </View>
          </Pressable>
        </View>
      </List.Accordion>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 2,
    borderRadius: 5,
  },
  itemTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    alignItems: 'center',
  },
  itemDelete: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    fontWeight: 50,
  },
});

export default InputItem;
