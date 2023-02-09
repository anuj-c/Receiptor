import React, {useState, useLayoutEffect} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {
  Headline,
  List,
  Button,
  TouchableRipple,
  HelperText,
  Modal,
  Portal,
} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import InputItem from '../components/InputItem';
import Customer from '../components/Customer';
import ShopName from '../components/ShopName';

const Form = ({navigation}) => {
  const [shopName, setShopName] = useState('Shop Name');
  const [addr, setAddr] = useState('');
  const [items, setItems] = useState([
    {
      name: '',
      quantity: '',
      ppq: '',
      discount: '0',
      gst: '',
      total: '0',
    },
  ]);
  const [total, setTotal] = useState(0);
  const [buyer, setBuyer] = useState({
    name: '',
    number: '',
    date: `${new Date()}`,
  });
  const [error, setError] = useState(-2);
  const [errmsg, setErrmsg] = useState('');
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: shopName,
    });
  }, [navigation, shopName]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Button onPress={() => setOpen(true)}>
            <Ionicons name="create-sharp" size={25} color="black" />
          </Button>
        );
      },
    });
  }, []);

  const addItem = () => {
    setItems([
      ...items,
      {
        name: '',
        quantity: '',
        ppq: '',
        discount: '0',
        gst: '',
        total: '0',
      },
    ]);
  };

  const checkItems = () => {
    let flag = 0;
    items.forEach((item, index) => {
      if (
        item.name == '' ||
        item.quantity == '' ||
        item.ppq == '' ||
        item.gst == ''
      ) {
        flag = index + 1;
      }
    });
    setError(flag);
    return flag;
  };

  const validatePhn = () => {
    let flag = 0;
    if (buyer.number.length != 10) {
      flag = 1;
    }
    return flag;
  };

  const goToNext = () => {
    if (items.length === 1 && items[0].name == '') {
      setError(-1);
      setErrmsg('Please add atleast one item');
    } else if (total == 0) {
      setError(-1);
      setErrmsg('Please add atleast one item');
    } else if (buyer.name == '' || buyer.number == '') {
      setError(0);
      setErrmsg('Please add buyer details');
    } else if (checkItems() != 0) {
      setErrmsg('Please add all the details');
    } else if (validatePhn()) {
      setError(0);
      setErrmsg('Please enter valid phone number');
    } else {
      setError(-2);
      setErrmsg('');
      navigation.navigate('Table', {items, buyer, total, shopName, addr});
    }
  };

  return (
    <View style={{height: '100%'}}>
      <Portal>
        <Modal
          visible={open}
          onDismiss={() => setOpen(false)}
          contentContainerStyle={styles.modalStyle}>
          <ShopName
            open={open}
            setOpen={setOpen}
            shopName={shopName}
            setShopName={setShopName}
            addr={addr}
            setAddr={setAddr}
          />
        </Modal>
      </Portal>
      <ScrollView>
        {/* SHOP NAME */}
        <HelperText
          type="error"
          visible={error === -1}
          style={{
            marginLeft: 5,
            marginBottom: 5,
            position: `${error === -1 ? 'relative' : 'absolute'}`,
          }}>
          <Text style={{fontSize: 15}}>{errmsg}</Text>
        </HelperText>
        {/* BUYER INFO */}
        <View style={styles.customerView}>
          <Customer buyer={buyer} setBuyer={setBuyer} />
          <HelperText
            type="error"
            visible={error === 0}
            style={{
              marginLeft: 5,
              marginBottom: 5,
              position: `${error === 0 ? 'relative' : 'absolute'}`,
            }}>
            <Text style={{fontSize: 15}}>{errmsg}</Text>
          </HelperText>
        </View>
        {/* ITEMS */}
        <List.AccordionGroup>
          {items.map((item, index) => {
            return (
              <InputItem
                key={index}
                id={index + 1}
                items={items}
                setItems={setItems}
                total={total}
                setTotal={setTotal}
                er={error}
                ermsg={errmsg}
              />
            );
          })}
        </List.AccordionGroup>
      </ScrollView>
      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        {/* TOTAL COST */}
        <View style={{marginLeft:13}}>
          <Text style={styles.bottomBarText}>{items.length} ITEMS</Text>
          <Text style={styles.bottomBarText}>Rs. {total}</Text>
        </View>
        {/* NEXT BUTTON */}
        <TouchableRipple
          rippleColor="rgba(0,0,0,0.32"
          onPress={() => goToNext()}
          borderless={true}>
          <Button mode="text" contentStyle={styles.bottomBarButton} style={{marginRight:13}}>
            <Text style={{color: 'white', fontSize: 15}}>Next</Text>
            <Ionicons name="caret-forward-outline" size={15} color="white" />
          </Button>
        </TouchableRipple>
        {/* ADD BUTTON */}
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          onPress={() => {
            console.log('added');
            addItem();
          }}
          style={styles.addButton}
          borderless={true}>
          <Ionicons name="add-outline" size={40} color="white" />
        </TouchableRipple>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: 'rgb(76, 158, 55)',
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomBarText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
  },
  customerView: {
    backgroundColor: 'rgba(155, 231, 255, 0.6)',
    borderRadius: 10,
    margin: 10,
  },
  bottomBarButton: {
    padding:2,
  },
  addButton: {
    position: 'absolute',
    backgroundColor: 'rgb(255, 158, 55)',
    padding: 10,
    borderRadius: 50,
    left: '50%',
    top: '-50%',
    transform: [{translateX: -20}],
    overflow: 'hidden',
    elevation: 10,
  },
  modalStyle: {
    backgroundColor: 'white',
    padding: 20,
  },
});

export default Form;
