import { StyleSheet, Text, TextProps } from 'react-native'
import React from 'react'


interface TitleProps extends TextProps {
    color?: string;
}

const Subtitle: React.FC<TitleProps> = ({ color = "gray", children, ...props }) => {
    return (
        <Text style={[styles.subtitle, { color }]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
})

export default Subtitle