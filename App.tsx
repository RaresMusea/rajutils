import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, Modal, Pressable, TextInput } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startHour, setStartHour] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endHour, setEndHour] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmStartDate = (time: Date) => {
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setStartHour(formattedTime);
    setStartDate(time);
    hideDatePicker();
  };

  const handleConfirmEndDate = (time: Date) => {
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setEndHour(formattedTime);
    hideDatePicker();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')}></Image>
      <Button title='Set alarms' onPress={toggleModal}></Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!isModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View>
            <Text style={styles.ModalHeading}>Alarm range setter</Text>
            <View>
              <Pressable onPress={showDatePicker}>
                <Text style={styles.FromPress}>From: {startDate.toDateString()}</Text>
                <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmStartDate}
                onCancel={hideDatePicker}
              />
                <TextInput readOnly value={startHour} style={styles.TextInput}></TextInput></Pressable>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirmStartDate}
                onCancel={hideDatePicker}
              />

              <Pressable onPress={showDatePicker}>
                <Text style={styles.FromPress}>To: {endDate.toDateString()}</Text>
                <TextInput readOnly value={endHour} style={styles.TextInput}></TextInput></Pressable>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirmEndDate}
                onCancel={hideDatePicker}
              />

            </View>
            <Button title='Close' onPress={() => setModalVisible(!isModalVisible)}></Button>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fad02c',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: 'orange',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  centeredView: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start',
  },
  ModalHeading: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 20,
  },
  TextInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  FromPress: {
    textDecorationLine: 'underline',
    fontSize: 15,
    padding: 10
  }
});
