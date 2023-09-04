import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { appStyles } from './styles';

const AlkoMetriAppi = () => {
  const [weight, setWeight] = useState('');
  const [bottles, setBottles] = useState('');
  const [gender, setGender] = useState('male');
  const [hours, setHours] = useState('');
  const [result, setResult] = useState(null);


  const calculateKalja = () => {
    const litres = parseFloat(bottles) * 0.33;
    const grams = litres * 8 * 4.5;
    const burning = parseFloat(weight) / 10;
    const gramsLeft = grams - burning * parseFloat(hours);

    let alcoholLevel = 0;
    if (gender === 'male') {
      alcoholLevel = gramsLeft / (parseFloat(weight) * 0.7);
    } else if (gender === 'female') {
      alcoholLevel = gramsLeft / (parseFloat(weight) * 0.6);
    }

    if (alcoholLevel < 0) {
      alcoholLevel = 0;
    }

    setResult(alcoholLevel.toFixed(2));
  };



  return (
    <ScrollView contentContainerStyle={appStyles.container}>
      <Text style={appStyles.heading}> Alkometri</Text>

      <View style={appStyles.inputContainer}>
        <Text style={appStyles.label}>Paino (kg)</Text>
        <TextInput
          style={appStyles.input}
          placeholder="Lisää painosi"
          keyboardType="numeric"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
      </View>

      <View style={appStyles.inputContainer}>
        <Text style={appStyles.label}>Pulloja juotu</Text>
        <TextInput
          style={appStyles.input}
          placeholder="Juotujen pullojen määrä"
          keyboardType="numeric"
          value={bottles}
          onChangeText={(text) => setBottles(text)}
        />
      </View>

      <View style={appStyles.inputContainer}>
        <Text style={appStyles.label}>Tunteja kulunut</Text>
        <TextInput
          style={appStyles.input}
          placeholder="Monta tuntia kulunut"
          keyboardType="numeric"
          value={hours}
          onChangeText={(text) => setHours(text)}
        />
      </View>

      <View style={appStyles.genderContainer}>
        <Text style={appStyles.genderText}>Sukupuoli:</Text>
        <TouchableOpacity onPress={() => setGender('male')}>
          <Text style={[appStyles.genderOption, gender === 'male' && { fontWeight: 'bold' }]}>Mies</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender('female')}>
          <Text style={[appStyles.genderOption, gender === 'female' && { fontWeight: 'bold' }]}>Nainen</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={calculateKalja} style={appStyles.button}>
        <Text style={appStyles.buttonText}>Laske</Text>
      </TouchableOpacity>

      {result !== null && (
        <Text style={appStyles.resultText}>     Alkoholin taso: {result}</Text>
      )}
    </ScrollView>
  );
};

export default AlkoMetriAppi;