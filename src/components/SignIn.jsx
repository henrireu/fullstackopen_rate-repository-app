import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required')
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      const username = values.username
      const password = values.password
      Alert.alert(username + " " + password)
    }
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.errors.username && styles.redBorder
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red', padding: 5 }}>{formik.errors.username}</Text>
      )}
      <TextInput
        secureTextEntry={true}
        style={[
          styles.input,
          formik.errors.password && styles.redBorder
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red', padding: 5}}>{formik.errors.password}</Text>
      )}
      <Button onPress={formik.handleSubmit} title="Sign in" />
    </View>
  )
};

const styles = StyleSheet.create({
    container:  {
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 4,
    }, 
    redBorder: {
        borderColor: 'red',
    }
})

export default SignIn;