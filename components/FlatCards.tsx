import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const FlatCards = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={[styles.flatCard, styles.cardOne]}>
        <Text style={styles.cardText}>One</Text>
      </View>
      <View style={[styles.flatCard, styles.cardTwo]}>
        <Text style={styles.cardText}>Two</Text>
      </View>
      <View style={[styles.flatCard, styles.cardThree]}>
        <Text style={styles.cardText}>Three</Text>
      </View>
      <View style={[styles.flatCard, styles.cardFour]}>
        <Text style={styles.cardText}>Three</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  flatCard: {
    width: '10%',
    height: 100,
    borderRadius: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  cardOne: {
    backgroundColor: 'blue',
  },
  cardTwo: {
    backgroundColor: 'green',
  },
  cardThree: {
    backgroundColor: 'purple',
  },
  cardFour: {
    backgroundColor: 'red',
  },
  cardText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FlatCards;
