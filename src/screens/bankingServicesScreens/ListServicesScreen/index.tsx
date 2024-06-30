import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import DefaultButton from '../../../components/buttons/DefaultButton'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types/RootStackParamList';
interface Item {
    id: string;
    name: string;
}

const data: Item[] = [
    { id: '123455', name: 'Nombre' },
    { id: '123456', name: 'Nombre' },
    { id: '123457', name: 'Nombre' },
    { id: '123458', name: 'Nombre' },
    { id: '123459', name: 'Nombre' },
    { id: '123460', name: 'Nombre' },
    { id: '123461', name: 'Nombre' },
];

type Props = NativeStackScreenProps<RootStackParamList>;

export default function ListServicesScreen({ navigation }: Props): React.JSX.Element {
    return (
        <View style={styles.container}>
            <TextInput style={styles.searchBar} placeholder="Search..." />
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("DetailScreen", {
                        id: "123245",
                        name: "test",
                        description: "prueba124",
                        logo: "url",
                        releaseDate: "12/22/24",
                        reviewDate: "12/45/12",
                    })}>
                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.id}>ID: {item.id}</Text>
                        </View>

                    </TouchableOpacity>
                )}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    searchBar: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    id: {
        fontSize: 14,
        color: '#888',
    },
});
