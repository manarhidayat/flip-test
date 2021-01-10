import React from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Text, FlatList } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Metrics, } from '../../src/Themes';

export const FILTER_TYPE = {
  nameAsc: 'Nama A-Z',
  nameDesc: 'Name Z-A',
  dateAsc: 'Tanggal Terbaru',
  dateDesc: 'Tanggal Terlama',
};

const ModalFilter = props => {
  const { visible, onClose, filterSelected, onSelect } = props;

  const renderItem = ({ item }) => {
    let radioStyle = "radio-button-off-outline"
    if (FILTER_TYPE[item] == filterSelected) {
      radioStyle = "radio-button-on-outline"
    }

    return (
      <TouchableOpacity
        onPress={() => {
          onClose();
          onSelect(FILTER_TYPE[item]);
        }}
        style={styles.itemList}>
        <Icon name={radioStyle} size={Metrics.icons.small} color={Colors.orange} />
        <Text style={styles.itemText}>{FILTER_TYPE[item]}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={onClose}
        style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <FlatList
            data={Object.keys(FILTER_TYPE)}
            keyExtractor={item => item}
            renderItem={renderItem}
          />

        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  modalContainer: {
    backgroundColor: Colors.white,
    height: 170,
    margin: Metrics.doubleBaseMargin,
    borderRadius: 10,
    padding: Metrics.doubleBaseMargin,
    justifyContent: 'center',
  },
  itemList: {
    flexDirection: 'row',
    height: 35
  },
  itemText: {
    marginLeft: Metrics.baseMargin,
  }

});


export default ModalFilter;
