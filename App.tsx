import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Switch,
  TextInput,
  Button,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const passwordValidationSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be a minimum of 4 characters')
    .max(16, 'Should be a maximum of 16 characters')
    .required('Length is a required field'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [boundary, setBoundary] = useState(false); // State for boundary switch

  const generatedPasswordString = (passLength: number) => {
    let charset = '';
    if (lowerCase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (upperCase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (number) charset += '0123456789';
    if (symbol) charset += '!@#$%^&*()';

    const passwordResult = createPassword(charset, passLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characterSet: string, passLength: number) => {
    let password = '';
    for (let i = 0; i < passLength; i++) {
      password += characterSet.charAt(
        Math.floor(Math.random() * characterSet.length),
      );
    }
    if (boundary) {
      // Apply boundary conditions if switch is enabled
      if (lowerCase)
        password = ensureBoundary(password, 'abcdefghijklmnopqrstuvwxyz');
      if (upperCase)
        password = ensureBoundary(password, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
      if (number) password = ensureBoundary(password, '0123456789');
      if (symbol) password = ensureBoundary(password, '!@#$%^&*()');
    }
    return password;
  };

  const ensureBoundary = (password: string, charset: string) => {
    if (!new RegExp(`[${charset}]`).test(password)) {
      const randomIndex = Math.floor(Math.random() * password.length);
      const randomChar = charset.charAt(
        Math.floor(Math.random() * charset.length),
      );
      password =
        password.slice(0, randomIndex) +
        randomChar +
        password.slice(randomIndex + 1);
    }
    return password;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPassGenerated(false);
    setUpperCase(false);
    setLowerCase(true);
    setNumber(false);
    setSymbol(false);
    setBoundary(false); // Reset boundary switch
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.title}>Password Generator</Text>
        </View>
        <Formik
          initialValues={{passwordLength: ''}}
          validationSchema={passwordValidationSchema}
          onSubmit={values => {
            generatedPasswordString(Number(values.passwordLength));
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          }) => (
            <View>
              <Text style={styles.label}>Password Length</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter password length"
                onChangeText={handleChange('passwordLength')}
                onBlur={handleBlur('passwordLength')}
                value={values.passwordLength}
              />
              {errors.passwordLength && touched.passwordLength && (
                <Text style={styles.error}>{errors.passwordLength}</Text>
              )}

              <View style={styles.switchContainer}>
                <Text style={styles.label}>Include Lowercase</Text>
                <Switch
                  value={lowerCase}
                  onValueChange={setLowerCase}
                  trackColor={{false: Colors.darker, true: Colors.green}}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text style={styles.label}>Include Uppercase</Text>
                <Switch
                  value={upperCase}
                  onValueChange={setUpperCase}
                  trackColor={{false: Colors.darker, true: Colors.green}}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text style={styles.label}>Include Numbers</Text>
                <Switch
                  value={number}
                  onValueChange={setNumber}
                  trackColor={{false: Colors.darker, true: Colors.green}}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text style={styles.label}>Include Symbols</Text>
                <Switch
                  value={symbol}
                  onValueChange={setSymbol}
                  trackColor={{false: Colors.darker, true: Colors.green}}
                />
              </View>

              <View style={styles.switchContainer}>
                <Text style={styles.label}>Apply Boundary Conditions</Text>
                <Switch
                  value={boundary}
                  onValueChange={setBoundary}
                  trackColor={{false: Colors.darker, true: Colors.green}}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  onPress={handleSubmit as any}
                  title="Generate Password"
                  color={Colors.blue}
                  disabled={!isValid}
                />
              </View>

              {isPassGenerated && (
                <View style={styles.resultContainer}>
                  <Text style={styles.resultText}>Generated Password:</Text>
                  <Text selectable={true} style={styles.resultPassword}>
                    {password}
                  </Text>
                  <Button
                    onPress={resetPassword}
                    title="Reset"
                    color={Colors.red}
                  />
                </View>
              )}
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.lighter,
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
  },
  label: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.darker,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: Colors.black,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.light,
    borderRadius: 5,
  },
  resultText: {
    fontSize: 16,
    color: Colors.black,
  },
  resultPassword: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.blue,
    marginTop: 10,
  },
  error: {
    color: Colors.red,
    marginBottom: 10,
  },
});

export default App;
