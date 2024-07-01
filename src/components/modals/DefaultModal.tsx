import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Alert } from 'react-native';

export interface ModalHandler {
    showModal: (type: string, text: string) => void;
    hideModal: () => void;
}

const DefaultModal = forwardRef<ModalHandler>((_, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState({ type: "success", message: "" })
    useImperativeHandle(ref, () => ({
        showModal: (type: string, text: string) => { setText({ type, message: text }); setModalVisible(true) },
        hideModal: () => setModalVisible(false),
    }));

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{text.message}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Aceptar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
});

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#FEDD03',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default DefaultModal;