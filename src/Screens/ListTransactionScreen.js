import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import TransactionsActions from '../Redux/TransactionsRedux'
import { Colors, Metrics } from '../Themes/'
import TextUtil from '../Util/TextUtil'
import ModalFilter, { FILTER_TYPE } from './ModalFilter'

const DATA = [
  {
    id: "FT45115",
    amount: 2739464,
    unique_code: 788,
    status: "SUCCESS",
    sender_bank: "bni",
    account_number: "1529828024",
    beneficiary_name: "Selin Dawe",
    beneficiary_bank: "muamalat",
    remark: "sample remark",
    created_at: "2021-01-09 11:47:42",
    completed_at: "2021-01-09 11:47:42",
    fee: 0
  },
  {
    id: "FT69844",
    amount: 3380924,
    unique_code: 158,
    status: "SUCCESS",
    sender_bank: "bni",
    account_number: "1390677145",
    beneficiary_name: "Shanice Harwood",
    beneficiary_bank: "bri",
    remark: "sample remark",
    created_at: "2021-01-09 11:46:42",
    completed_at: "2021-01-09 11:47:42",
    fee: 0
  },
  {
    id: "FT6565",
    amount: 1574619,
    unique_code: 852,
    status: "PENDING",
    sender_bank: "bni",
    account_number: "8714126865",
    beneficiary_name: "Rhiannan Simmons",
    beneficiary_bank: "muamalat",
    remark: "sample remark",
    created_at: "2021-01-09 13:16:19",
    completed_at: "2021-01-09 13:17:19",
    fee: 0
  }

]

const ListTransactionScreen = ({
  navigation,
  getTransactions,
  sortTransactions,
  transactions }) => {

  const [isModalVisible, setModalVisible] = useState(false);
  const [filterSelected, setFilterSelected] = useState(FILTER_TYPE.nameAsc);

  useEffect(() => {
    getTransactions();
  }, []);

  const renderItem = ({ item }) => {
    const {
      sender_bank,
      beneficiary_bank,
      beneficiary_name,
      amount,
      created_at,
      status
    } = transactions.payload[item]

    let indicatorColor = Colors.orange
    let btnStatusStyle = styles.btnPending
    let textStatusColor = Colors.black
    let textStatus = "Pengecekan"

    if (status == "SUCCESS") {
      indicatorColor = Colors.green
      btnStatusStyle = styles.btnSuccess
      textStatusColor = Colors.white
      textStatus = "Berhasil"
    }

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', { data: transactions.payload[item] })}
        style={styles.item}>
        <View style={[styles.itemIndicator, { backgroundColor: indicatorColor }]} />
        <View style={styles.itemContent}>
          <View style={{ flex: 1 }}>
            <View style={styles.itemContainerBank}>
              <Text style={styles.itemTextBank}>{sender_bank && sender_bank.toUpperCase()}</Text>
              <Icon name="arrowright" size={Metrics.icons.small} color={Colors.black} />
              <Text style={styles.itemTextBank}>{beneficiary_bank && beneficiary_bank.toUpperCase()}</Text>
            </View>
            <Text>{beneficiary_name && beneficiary_name.toUpperCase()}</Text>
            <View style={styles.itemContainerBank}>
              <Text>Rp{TextUtil.formatMoney(amount)}</Text>
              <View style={styles.dot} />
              <Text>{TextUtil.formatDate(created_at)}</Text>
            </View>
          </View>
          <TouchableOpacity style={btnStatusStyle}>
            <Text style={{ color: textStatusColor }}>{textStatus}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  onSelectFilter = (selected) => {
    sortTransactions()
    setFilterSelected(selected)
  };

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: Colors.background, flex: 1 }}>

        <View style={styles.containerHeader}>
          <Icon name="search1" size={Metrics.icons.small} color={Colors.grey} />
          <TextInput
            style={{ flex: 1 }}
            placeholder={'Cari nama, bank, atau nominal'}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.containerFilter}>
            <Text style={styles.textFilter}>{filterSelected}</Text>
            <Icon name="down" size={Metrics.icons.small} color={Colors.orange} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={transactions && transactions.payload ? Object.keys(transactions.payload) : []}
          refreshing={transactions.fetching}
          renderItem={renderItem}
          keyExtractor={item => item.toString()}
        // ListHeaderComponent={renderHeader}
        />
        <ModalFilter
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          filterSelected={filterSelected}
          onSelect={(selected) => onSelectFilter(selected)}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: Metrics.baseMargin,
    borderRadius: Metrics.buttonRadius,
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
    alignItems: 'center'
  },
  containerFilter: {
    flexDirection: 'row'
  },
  textFilter: {
    color: Colors.orange,
    fontWeight: 'bold',
    marginHorizontal: Metrics.smallMargin
  },
  item: {
    borderRadius: Metrics.buttonRadius,
    backgroundColor: Colors.white,
    marginHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
    flexDirection: 'row',
  },
  itemIndicator: {
    backgroundColor: Colors.orange,
    width: 6,
    borderTopLeftRadius: Metrics.buttonRadius,
    borderBottomLeftRadius: Metrics.buttonRadius,
  },
  itemContent: {
    margin: Metrics.baseMargin,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  itemTextBank: {
    fontWeight: 'bold'
  },
  itemContainerBank: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 4,
    backgroundColor: Colors.black,
    marginHorizontal: Metrics.smallMargin
  },
  btnSuccess: {
    backgroundColor: Colors.green,
    padding: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
    borderRadius: Metrics.buttonRadius,
    height: 35,
    justifyContent: 'center'
  },
  btnPending: {
    backgroundColor: Colors.white,
    padding: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
    borderRadius: Metrics.buttonRadius,
    height: 35,
    justifyContent: 'center',
    borderColor: Colors.orange,
    borderWidth: 2
  },

});

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTransactions: (value) => {
      dispatch(TransactionsActions.getTransactionsRequest(value));
    },
    sortTransactions: (value) => {
      dispatch(TransactionsActions.sortTransactions(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTransactionScreen);