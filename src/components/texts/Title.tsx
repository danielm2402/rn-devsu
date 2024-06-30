import { StyleSheet, Text, TextProps } from 'react-native'
import React from 'react'


interface TitleProps extends TextProps {
    color?: string;
}

const Title: React.FC<TitleProps> = ({ color = "inherit", children }) => {
    return (
        <Text style={[styles.title, { color }]}>{children}</Text>
    )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})