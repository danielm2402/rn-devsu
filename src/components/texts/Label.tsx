import { StyleSheet, Text, TextProps } from 'react-native'
import React from 'react'


interface TitleProps extends TextProps {
    color?: string;
}

const Label: React.FC<TitleProps> = ({ color = "gray", children }) => {
    return (
        <Text style={[styles.label, { color }]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        color: 'gray',

    },
})

export default Label