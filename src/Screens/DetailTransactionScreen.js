import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { Colors, Metrics } from '../Themes/'
import TextUtil from '../Util/TextUtil'

const DetailTransactionScreen = ({ route, navigation }) => {

  const { data } = route.params
  const {
    id,
    beneficiary_name,
    account_number,
    amount,
    sender_bank,
    beneficiary_bank,
    remark,
    created_at,
    unique_code
  } = data

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.background, flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.containerIdTransaction}>
          <Text style={[styles.textTitle, { marginRight: 5 }]}>ID TRANSAKSI: #{id}</Text>
          <Icon name="copy1" size={Metrics.icons.small} color={Colors.orange} />
        </View>
        <View style={styles.line} />
        <View style={styles.containerDetailTransaction}>
          <Text style={styles.textTitle}>DETAIL TRANSAKSI</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Text style={styles.textClose}>Tutup</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.darkLine} />
        <View style={styles.content}>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={styles.textTitle}>{sender_bank && sender_bank.toUpperCase()}</Text>
            <Icon name="arrowright" size={Metrics.icons.small} color={Colors.black} />
            <Text style={styles.textTitle}>{beneficiary_bank && beneficiary_bank.toUpperCase()}</Text>
          </View>
          <View style={{ flexDirection: 'row', }}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.textTitle}>{beneficiary_name}</Text>
              <Text style={styles.textContent}>{account_number}</Text>
              <Text style={styles.textTitle}>BERITA TRANSFER</Text>
              <Text style={styles.textContent}>{remark}</Text>
              <Text style={styles.textTitle}>WAKTU DIBUAT</Text>
              <Text style={styles.textContent}>{TextUtil.formatDate(created_at)}</Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.textTitle}>NOMINAL</Text>
              <Text style={styles.textContent}>Rp{TextUtil.formatMoney(amount)}</Text>
              <Text style={styles.textTitle}>KODE UNIK</Text>
              <Text style={styles.textContent}>{unique_code}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: Metrics.baseMargin
  },
  containerIdTransaction: {
    padding: Metrics.baseMargin,
    flexDirection: 'row',
    paddingVertical: Metrics.doubleBaseMargin
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.lightGrey
  },
  darkLine: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.grey
  },
  textTitle: {
    fontWeight: 'bold'
  },
  textClose: {
    color: Colors.orange
  },
  containerDetailTransaction: {
    padding: Metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Metrics.doubleBaseMargin
  },
  content: {
    padding: Metrics.baseMargin
  },
  textContent: {
    marginBottom: Metrics.baseMargin
  }

});

export default DetailTransactionScreen;
