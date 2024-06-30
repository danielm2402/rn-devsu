import React from 'react';
import { TextInput, Text, StyleSheet, TextInputProps, View } from 'react-native';

interface DefaultInputProps extends TextInputProps {
    error: string;
    value: string;
    label: string;
    onChangeText: (text: string) => void;
}

const DefaultInput: React.FC<DefaultInputProps> = ({ error, value, label, onChangeText, style, ...props }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error ? styles.errorInput : null]}
                value={value}
                onChangeText={onChangeText}
                {...props}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    label: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    }
});

export default DefaultInput;