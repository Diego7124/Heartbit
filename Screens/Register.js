import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../database/firebaseConfig';

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Correo electrónico no válido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es obligatoria'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
      .required('La confirmación de la contraseña es obligatoria'),
  });

  const handleRegister = async (values) => {
    setLoading(true); // Activar el estado de carga

    try {
      // Guardar la información del usuario en Firestore
      await setDoc(doc(db, 'users', values.email), {
        email: values.email,
        password: values.password,  // Guardamos la contraseña (en producción usar cifrado)
        createdAt: new Date(),
      });

      setLoading(false); // Desactivar el estado de carga
      alert('¡Datos guardados exitosamente!');
      navigation.navigate('Home');
    } catch (error) {
      setLoading(false); // Desactivar el estado de carga
      alert('Error al guardar los datos: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Confirmar Contraseña"
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : (
              <Button title="Registrarse" onPress={handleSubmit} />
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>¿Ya tienes una cuenta? Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
  loginText: {
    color: '#1E90FF',
    marginTop: 15,
    textAlign: 'center',
  },
  loader: {
    marginVertical: 20,
  },
});

export default RegisterScreen;
