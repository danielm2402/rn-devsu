import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types/RootStackParamList';
import Title from '../../../components/texts/Title';
import Subtitle from '../../../components/texts/Subtitle';
import Label from '../../../components/texts/Label';
import Value from '../../../components/texts/Value';
import DefaultButton from '../../../components/buttons/DefaultButton';
import DefaultBottomSheet from '../../../components/bottomsheets/DefaultBottomSheet';

const URI = 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg'

interface DetailProps {
  id: string;
  name: string;
  description: string;
  logo: string;
  releaseDate: string;
  reviewDate: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'DetailScreen'>;


function DetailScreen({ route, navigation }: Props) {

  const { id, name, description, logo, releaseDate, reviewDate } = route.params;
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const imageWidth = 300;
  const [open, setOpen] = useState(false)

  useEffect(() => {
    Image.getSize(URI, (width, height) => {
      const aspectRatio = height / width;
      setImageHeight(imageWidth * aspectRatio);
    });
  }, [URI]);

  return (
    <>
      <DefaultBottomSheet open={open} callbackOnClossing={() => setOpen(false)} />


      <View style={styles.container}>



        <View style={styles.content}>
          <View style={styles.containerTitle}>
            <Title>ID: {id}</Title>
            <Subtitle>Información extra</Subtitle>
          </View>
          <View style={styles.containerItemInformation}>
            <Label>Nombre</Label>
            <Value>{name}</Value>
          </View>
          <View style={styles.containerItemInformation}>
            <Label>Descripción</Label>
            <Value>{description}</Value>
          </View>
          <View style={styles.containerItemInformation}>
            <Label>Logo</Label>
            <Image source={{ uri: URI }} style={[styles.logo, { width: imageWidth, height: imageHeight }]} />
          </View>

          <View style={styles.containerItemInformation}>
            <Label>Fecha liberación</Label>
            <Value>{releaseDate}</Value>
          </View>

          <View style={styles.containerItemInformation}>
            <Label>Fecha revisión</Label>
            <Value>{reviewDate}</Value>
          </View>
        </View>
        <View style={styles.containerButtons}>
          <DefaultButton color='#E9ECF2' textColor='#000' onPress={() => { navigation.goBack() }}>
            <Text>Volver</Text>
          </DefaultButton>
          <DefaultButton color='#E9ECF2' textColor='#000' onPress={() => { }}>
            <Text>Editar</Text>
          </DefaultButton>

          <DefaultButton color='#D40708' textColor='#fff' onPress={() => { setOpen(true) }}>
            <Text>Eliminar</Text>
          </DefaultButton>
        </View>
      </View>

    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingTop: 50
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    resizeMode: "stretch",
    marginVertical: 40
  },
  containerTitle: {
    width: "100%",
    alignItems: "flex-start"
  },
  containerItemInformation: {
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    textAlign: "center",
    paddingVertical: 10,
  },
  containerButtons: {
    width: '100%',
    paddingBottom: 20
  },
  buttonEdit: {
    width: '80%',
    padding: 15,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonDelete: {
    width: '80%',
    padding: 15,
    backgroundColor: '#d9534f',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailScreen;