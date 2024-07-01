import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useRef } from 'react'
import moment from 'moment';
import DefaultInput from '../../../components/inputs/DefaultInput';
import DefaultButton from '../../../components/buttons/DefaultButton';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types/RootStackParamList';
import { Product } from '../../../infrastructure/types/product';
import DefaultModal, { ModalHandler } from '../../../components/modals/DefaultModal';
import useCreateProduct from '../../../hooks/products/useCreateProduct';


type Props = NativeStackScreenProps<RootStackParamList, 'CreateScreen'>;
export default function CreateServiceScreen({ navigation }: Props): React.JSX.Element {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [reviewDate, setReviewDate] = useState('');
  const [errors, setErrors] = useState({
    id: '',
    name: '',
    description: '',
    releaseDate: '',
    logo: '',
  });
  const { createProduct, loading } = useCreateProduct()
  const modalRef = useRef<ModalHandler>(null);

  const openModal = (type: string, message: string) => {
    modalRef.current?.showModal(type, message);
  };

  const closeModal = () => {
    modalRef.current?.hideModal();
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { id: '', name: '', description: '', logo: '', releaseDate: '' };

    if (!id || id.length < 3 || id.length > 10) {
      newErrors.id = 'ID debe tener entre 3 y 10 caracteres';
      valid = false;
    }
    if (!name || name.length < 5 || name.length > 100) {
      newErrors.name = 'Nombre debe tener entre 5 y 100 caracteres';
      valid = false;
    }
    if (!description || description.length < 10 || description.length > 200) {
      newErrors.description = 'Descripción debe tener entre 10 y 200 caracteres';
      valid = false;
    }

    if (!id) {
      newErrors.id = 'ID no válido';
      valid = false;
    }

    if (!name) {
      newErrors.name = 'Este campo es requerido';
      valid = false;
    }

    if (!description) {
      newErrors.description = 'Este campo es requerido';
      valid = false;
    }

    if (!logo) {
      newErrors.logo = 'Este campo es requerido';
      valid = false;
    }

    const today = new Date();
    const releaseDateObj = new Date(releaseDate);

    today.setHours(0, 0, 0, 0);
    releaseDateObj.setHours(0, 0, 0, 0);


    if (!releaseDate || releaseDateObj < today) {
      newErrors.releaseDate = 'Fecha de liberación debe ser mayor o igual a la fecha actual';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const newProduct: Product = {
        id,
        name,
        description,
        logo,
        date_release: new Date(releaseDate),
        date_revision: new Date(reviewDate),
      };
      const { result, message } = await createProduct(newProduct)
      if (result) {
        openModal("Success", message)
        handleReset()
        return
      }
      openModal("Error", message)

    }
  };

  const handleReset = () => {
    setId('');
    setName('');
    setDescription('');
    setLogo('');
    setReleaseDate('');
    setReviewDate('');
    setErrors({ id: '', name: '', description: '', logo: '', releaseDate: '' });
  };

  const handleDateChange = (text: string) => {
    let formattedText = text.replace(/[^0-9]/g, '');

    if (formattedText.length > 4) {
      formattedText = formattedText.substring(0, 4) + '-' + formattedText.substring(4);
    }
    if (formattedText.length > 7) {
      formattedText = formattedText.substring(0, 7) + '-' + formattedText.substring(7);
    }

    if (formattedText.length === 10) {
      const parts = formattedText.split('-');
      let year = parts[0];
      let month = parts[1];
      let day = parts[2];

      if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
        month = '';
      } else if (month.length === 1) {
        month = `0${month}`;
      }

      const daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
      if (parseInt(day, 10) < 1 || parseInt(day, 10) > daysInMonth) {
        day = '';
      } else if (day.length === 1) {
        day = `0${day}`;
      }

      formattedText = [year, month, day].filter(Boolean).join('-');

      setReleaseDate(formattedText);

      const releaseDateMoment = moment(formattedText, 'YYYY-MM-DD');
      const reviewDateMoment = releaseDateMoment.add(1, 'year');
      const reviewDate = reviewDateMoment.format('YYYY-MM-DD');
      setReviewDate(reviewDate);
    } else {
      setReleaseDate(formattedText);
      setReviewDate('');
    }

    const partsImmediate = formattedText.split('-');
    if (partsImmediate.length > 1) {
      let monthImmediate = partsImmediate[1];
      if (monthImmediate && parseInt(monthImmediate, 10) > 12) {
        monthImmediate = '12';
      }
      partsImmediate[1] = monthImmediate;
    }
    if (partsImmediate.length > 2) {
      let dayImmediate = partsImmediate[2];
      if (dayImmediate) {
        let yearImmediate = partsImmediate[0];
        let monthImmediate = partsImmediate[1];
        const daysInMonthImmediate = moment(`${yearImmediate}-${monthImmediate}`, 'YYYY-MM').daysInMonth();
        if (parseInt(dayImmediate, 10) > daysInMonthImmediate) {
          dayImmediate = daysInMonthImmediate.toString();
        }
        partsImmediate[2] = dayImmediate;
      }
    }
    formattedText = partsImmediate.filter(Boolean).join('-');
    setReleaseDate(formattedText);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DefaultModal ref={modalRef} />
      <Text style={styles.title}>Formulario de Registro</Text>
      <View style={styles.formGroup}>
        <DefaultInput label='ID' value={id} onChangeText={setId} error={errors.id}></DefaultInput>

      </View>
      <View style={styles.formGroup}>
        <DefaultInput label='Nombre' value={name} onChangeText={setName} error={errors.name}></DefaultInput>
      </View>
      <View style={styles.formGroup}>
        <DefaultInput label='Descripción' value={description} onChangeText={setDescription} error={errors.description}></DefaultInput>
      </View>
      <View style={styles.formGroup}>
        <DefaultInput label='Logo' value={logo} onChangeText={setLogo} error={errors.logo}></DefaultInput>

      </View>
      <View style={styles.formGroup}>
        <DefaultInput label='Fecha Liberación' value={releaseDate} onChangeText={handleDateChange} keyboardType="numeric"
          placeholder="YYYY-MM-DD" error={errors.releaseDate}></DefaultInput>
      </View>
      <View style={styles.formGroup}>
        <DefaultInput label='Fecha Revisión' value={reviewDate} onChangeText={handleDateChange} keyboardType="numeric"
          placeholder="YYYY-MM-DD" error={""}></DefaultInput>
      </View>
      <DefaultButton color='#FEDD03' textColor='#000' onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#0000ff" /> :
          <Text>Enviar</Text>}
      </DefaultButton>
      <DefaultButton color='#E9ECF2' textColor='#000' onPress={handleReset} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#0000ff" /> :
          <Text>Reiniciar</Text>}
      </DefaultButton>


    </ScrollView>

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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
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
  },
  submitButton: {
    backgroundColor: '#f0ad4e',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


