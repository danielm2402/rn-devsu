import { StyleSheet, Text, TextProps } from 'react-native'
import React from 'react'


interface TitleProps extends TextProps {
    color?: string;
}

const Value: React.FC<TitleProps> = ({ color = "inherit", children }) => {
    return (
        <Text style={[styles.value, { color }]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    value: {
        fontSize: 18,
        fontWeight: 'bold',

    },
})

export default Value