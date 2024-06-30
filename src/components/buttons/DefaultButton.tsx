import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface DefaultButtonProps extends TouchableOpacityProps {
    color: string;
    textColor: string;
    onPress: () => void;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({ color, textColor, onPress, children, style, ...props }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: color }, style]}
            onPress={onPress}
            {...props}
        >
            <Text style={[styles.buttonText, { color: textColor }]}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        marginHorizontal: 12,
        paddingHorizontal: 20,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default DefaultButton;