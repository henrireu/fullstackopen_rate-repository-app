import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import { CREATE_REVIEW } from '../graphql/mutations';

const validationSchema = yup.object().shape({
  owner: yup
    .string()
    .required('Repository owner name is required'),
  name: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required'),
});

const ReviewForm = () => {
  const navigate = useNavigate()

  const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW);

  const formik = useFormik({
    initialValues: {
      owner: '',
      name: '',
      rating: '',
      review: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const {owner, name, rating, review} = values;
      // tästä alkaa apollo
      try {
        await createReview({
          variables: {
            review: {
              repositoryName: name,
              ownerName: owner,
              rating: parseInt(rating, 10),
              text: review,
            }
          }
        })
        navigate(`/${owner}.${name}`);
      } catch (error){
        console.error(error)
      }
    },
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.errors.owner && styles.redBorder
        ]}
        placeholder='Repository owner name'
        value={formik.values.owner}
        onChangeText={formik.handleChange('owner')}
      />
      {formik.touched.owner && formik.errors.owner && (
        <Text style={{ color: 'red', padding: 5 }}>{formik.errors.owner}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.errors.name && styles.redBorder
        ]}
        placeholder='Repository name'
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
      />
      {formik.touched.name && formik.errors.name && (
        <Text style={{ color: 'red', padding: 5 }}>{formik.errors.name}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.errors.rating && styles.redBorder
        ]}
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: 'red', padding: 5 }}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.errors.review && styles.redBorder
        ]}
        placeholder='Review'
        multiline true
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
      />
      <Button onPress={formik.handleSubmit} title="Create a review" />
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

export default ReviewForm;