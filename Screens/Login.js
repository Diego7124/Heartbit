import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../database/firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mostrar errores

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Correo electrónico no válido')
      .required('El correo electrónico es obligatorio'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es obligatoria'),
  });

  const handleLogin = async (values) => {
    setLoading(true);
    setErrorMessage(''); // Resetea el mensaje de error

    try {
      // Recuperar los datos del usuario desde Firestore
      const userDocRef = doc(db, 'users', values.email);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Verifica si la contraseña coincide
        if (userData.password === values.password) {
          setLoading(false);
          alert('¡Bienvenido!');
          navigation.navigate('Home');
        } else {
          setLoading(false);
          setErrorMessage('Contraseña incorrecta');
        }
      } else {
        setLoading(false);
        setErrorMessage('Usuario no encontrado');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
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

            {loading ? (
              <Text>Iniciando sesión...</Text>
            ) : (
              <Button title="Iniciar sesión" onPress={handleSubmit} />
            )}

            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate</Text>
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
  errorMessage: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  registerText: {
    color: '#1E90FF',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default LoginScreen;
