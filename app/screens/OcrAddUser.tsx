import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { wp } from '../config/dimension';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import colors from '../config/colors';
import { useDispatch, useSelector } from 'react-redux';
import { setUserList } from '../redux/slice/OcrUserSlice';
import { useNavigation } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  idNumber: Yup.string()
    .required('ID Number is required')
    .matches(/^\d+$/, 'ID Number must only contain digits'),
  dob: Yup.string()
    .required('Date of Birth is required')
    .matches(
      /^\d{2}\/\d{2}\/\d{4}$/,
      'Date of Birth must follow DD/MM/YYYY format',
    ),
  nameConfidence: Yup.string()
    .required('Name confidence is required')
    .min(0, 'Confidence must be at least 0')
    .max(100, 'Confidence must not exceed 100'),
  idNumberConfidence: Yup.string()
    .required('ID Number confidence is required')
    .min(0, 'Confidence must be at least 0')
    .max(100, 'Confidence must not exceed 100'),
  dobConfidence: Yup.string()
    .required('Date of Birth confidence is required')
    .min(0, 'Confidence must be at least 0')
    .max(100, 'Confidence must not exceed 100'),
});

export default function OcrAddUser() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const formikRef = useRef<FormikProps<any>>(null) as any;
  const dispatch = useDispatch() as any;
  const navigation = useNavigation() as any;
  const { userList } = useSelector((state: any) => state.ocrUser);
  const pickImage = async (fromCamera: boolean) => {
    try {
      const result: any = fromCamera
        ? await ImagePicker.openCamera({ mediaType: 'photo' })
        : await ImagePicker.openPicker({ mediaType: 'photo' });
      runOCR(result.path);
      if (result.path) {
        setImageUri(result.path);
      }
    } catch (error) {
      console.warn('Image picker failed:', error);
    }
  };

  function parseSimpleIdCard(result: string) {
    const parts = result
      .split('\n')
      .map(p => p.trim())
      .filter(Boolean);
    const randomScore = () => Math.floor(Math.random() * 100).toString();

    return {
      name: parts[0] || '',
      dob: parts[1] || '',
      idNumber: parts[2] || '',
      nameConfidence: randomScore(),
      dobConfidence: randomScore(),
      idNumberConfidence: randomScore(),
    };
  }

  // Run OCR on image
  const runOCR = async (uri: string) => {
    try {
      const result = await TextRecognition.recognize(uri);
      const parsed: any = parseSimpleIdCard(result.text);
      formikRef.current?.setFieldValue('name', parsed.name);
      formikRef.current?.setFieldValue('dob', parsed.dob);
      formikRef.current?.setFieldValue('idNumber', parsed.idNumber);
      formikRef.current?.setFieldValue('nameConfidence', parsed.nameConfidence);
      formikRef.current?.setFieldValue('dobConfidence', parsed.dobConfidence);
      formikRef.current?.setFieldValue(
        'idNumberConfidence',
        parsed.idNumberConfidence,
      );
    } catch (error) {
      console.warn('OCR failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OCR Capture & Validation</Text>

      <ScrollView style={{ flex: 1, paddingBottom: wp(10) }}>
        <View style={styles.buttonRow}>
          <Button
            mode="contained"
            onPress={() => pickImage(false)}
            style={styles.button}
          >
            Upload ID
          </Button>
          <Button
            mode="outlined"
            onPress={() => pickImage(true)}
            style={styles.button}
          >
            Capture ID
          </Button>
        </View>
        <Formik
          initialValues={{
            name: '',
            idNumber: '',
            dob: '',
            nameConfidence: '',
            idNumberConfidence: '',
            dobConfidence: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            dispatch(setUserList([values, ...userList]));
            navigation.goBack();
          }}
          innerRef={formikRef}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <View style={{ gap: wp(10) }}>
              {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
              )}
              <View>
                <TextInput
                  label="Name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  mode="outlined"
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>
              <View>
                <TextInput
                  label="ID Number"
                  onChangeText={handleChange('idNumber')}
                  onBlur={handleBlur('idNumber')}
                  value={values.idNumber}
                  mode="outlined"
                />
                {touched.idNumber && errors.idNumber && (
                  <Text style={styles.errorText}>{errors.idNumber}</Text>
                )}
              </View>
              <View>
                <TextInput
                  label="Date of Birth"
                  onChangeText={handleChange('dob')}
                  onBlur={handleBlur('dob')}
                  value={values.dob}
                  mode="outlined"
                />
                {touched.dob && errors.dob && (
                  <Text style={styles.errorText}>{errors.dob}</Text>
                )}
              </View>
              <View>
                <TextInput
                  label="Name Confidence"
                  onChangeText={handleChange('nameConfidence')}
                  onBlur={handleBlur('nameConfidence')}
                  value={values.nameConfidence}
                  mode="outlined"
                  keyboardType="numeric"
                />
                {touched.nameConfidence && errors.nameConfidence && (
                  <Text style={styles.errorText}>{errors.nameConfidence}</Text>
                )}
              </View>
              <View>
                <TextInput
                  label="ID Number Confidence"
                  onChangeText={handleChange('idNumberConfidence')}
                  onBlur={handleBlur('idNumberConfidence')}
                  value={values.idNumberConfidence}
                  mode="outlined"
                  keyboardType="numeric"
                />
                {touched.idNumberConfidence && errors.idNumberConfidence && (
                  <Text style={styles.errorText}>
                    {errors.idNumberConfidence}
                  </Text>
                )}
              </View>
              <View>
                <TextInput
                  label="Date of Birth Confidence"
                  onChangeText={handleChange('dobConfidence')}
                  onBlur={handleBlur('dobConfidence')}
                  value={values.dobConfidence}
                  mode="outlined"
                  keyboardType="numeric"
                />
                {touched.dobConfidence && errors.dobConfidence && (
                  <Text style={styles.errorText}>{errors.dobConfidence}</Text>
                )}
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: colors.primaryButton,
                  borderRadius: 8,
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={{
                    color: '#fff',
                    padding: wp(12),
                    textAlign: 'center',
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: wp(16), backgroundColor: '#fff' },
  title: { fontSize: wp(20), fontWeight: 'bold', marginBottom: wp(16) },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: wp(16),
  },
  button: { flex: 1, marginHorizontal: 4 },
  imagePreview: {
    width: '100%',
    height: wp(200),
    marginBottom: wp(16),
    borderRadius: 8,
  },
  card: { padding: wp(8) },
  errorText: {
    color: 'red',
    fontSize: wp(12),
    marginTop: wp(10),
    marginBottom: wp(5),
  },
  saveButton: { marginTop: wp(12) },
});
