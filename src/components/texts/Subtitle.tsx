import { StyleSheet, Text, TextProps } from 'react-native'
import React from 'react'


interface TitleProps extends TextProps {
    color?: string;
}

const Subtitle: React.FC<TitleProps> = ({ color = "gray", children }) => {
    return (
        <Text style={[styles.subtitle, { color }]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
})

export default Subtitle