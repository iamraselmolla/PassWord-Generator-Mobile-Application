/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as Yup from 'yup';
const passwordValidation = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'should be minimum of 4 characters')
    .max(16, 'shoud be maximum 16 characters')
    .required('Length is required field '),
});

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, useNumbers] = useState(false);
  const [symbol, useSymbol] = useState(false);
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
    return password;
  };
  const resetPassword = () => {
    setPassword('');
    setIsPassGenerated(false);
    setUpperCase(false);
    setLowerCase(false);
    useNumbers(false);
    useSymbol(false);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.bodyContainer]}>
      <ScrollView>
        <Text>Hello !</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    padding: 10,
  },
  sectionContainer: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 240,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
