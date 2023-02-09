import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Title, TextInput, Button} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

const Customer = ({buyer, setBuyer}) => {
  const [open, setOpen] = useState(false);

  const onChangeHandler = (e, value) => {
    const temp = {...buyer};
    temp[value] = e;
    setBuyer(temp);
  };

  return (
    <View style={{margin: 10}}>
      <Title style={{margin: 10}}>Buyer</Title>
      {/* BUYER NAME */}
      <TextInput
        label="Name"
        mode="outlined"
        value={buyer.name}
        onChangeText={text => onChangeHandler(text, 'name')}
        activeOutlineColor="black"
        style={{margin: 5}}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{width: '49.5%'}}>
          {/* PHONE NUMBER */}
          <TextInput
            label="Phone no."
            mode="outlined"
            keyboardType="numeric"
            value={buyer.number}
            onChangeText={text => onChangeHandler(text, 'number')}
            activeOutlineColor="black"
            style={{margin: 5}}
          />
        </View>
        <View style={{width: '49.5%'}}>
          {/* DATE */}
          <Pressable onPress={() => setOpen(true)}>
            <TextInput
              label="Date"
              mode="outlined"
              disabled
              value={`${new Date(buyer.date).getDate()}/${
                new Date(buyer.date).getMonth() + 1
              }/${new Date(buyer.date).getFullYear()}`}
              onChangeText={text => onChangeHandler(text, 'date')}
              activeOutlineColor="black"
              style={{margin: 5}}
              right={
                <TextInput.Affix
                  text={`${new Date(buyer.date).getHours()}:${new Date(
                    buyer.date,
                  ).getMinutes()}`}
                />
              }
            />
          </Pressable>
          {/* DATE PICKER */}
          <DatePicker
            modal
            mode="datetime"
            open={open}
            date={new Date(buyer.date)}
            onConfirm={date => {
              setOpen(false);
              const temp = {...buyer};
              temp.date = `${date}`;
              setBuyer(temp);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        {/* <View style={{width: '49.5%', position:"relative"}}>
          <Button mode="contained" onPress={() => setOpen(true)} style={styles.dateButton}>
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
          </Button>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateButton: {
    borderWidth: 2,
    top: 5,
    margin: 5,
    // position:"absolute",
  },
});

export default Customer;
