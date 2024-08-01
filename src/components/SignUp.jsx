import { View, TextInput, Button, StyleSheet } from "react-native";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";

import { SIGN_UP } from "../graphql/mutations";
import Text from "./Text";
import { useSignIn } from '../hooks/useSignIn';
import useAuthStorage from '../hooks/useAuthStorage';

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(5)
      .max(30),
    password: yup
      .string()
      .required('Password is required')
      .min(5)
      .max(50),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUp = () => {
  const [signIn] = useSignIn();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const [createUser, { loading, error, data }] = useMutation(SIGN_UP);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;
      console.log(values)
      try {
        await createUser({
          variables: {
            user: {
              username,
              password,
            },
          },
        });

        try {
          const { data } = await signIn({ username, password })
          const token = await authStorage.getAccessToken() 
          if(token) {
            navigate("/");
          }
        } catch (e) {
          console.log(e)  
        }

      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.errors.username && styles.redBorder
        ]}
        placeholder= "username"
        value= {formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red', padding: 5 }}>Username is required</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.errors.password && styles.redBorder
        ]}
        secureTextEntry={true}
        placeholder= "password"
        value= {formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red', padding: 5 }}>Password is required</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.errors.confirmPassword && styles.redBorder
        ]}
        secureTextEntry={true}
        placeholder= "password confirmation"
        value= {formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text style={{ color: 'red', padding: 5 }}>Password confirmation is required</Text>
      )}
      <Button onPress={formik.handleSubmit} title="Sign up" />
    </View>
  )
}

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

export default SignUp;