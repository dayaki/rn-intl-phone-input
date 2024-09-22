import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { CountryPicker } from "./CountryPicker";
import { CountryData } from "../utils/CountryData";
import { formatPhoneNumber, validatePhoneNumber } from "../utils/phoneUtils";

interface IntlPhoneInputProps {
  onChangePhoneNumber: (phoneNumber: string, isValid: boolean) => void;
  containerStyle?: object;
  inputStyle?: object;
  countryPickerStyle?: object;
}

export const IntlPhoneInput: React.FC<IntlPhoneInputProps> = ({
  onChangePhoneNumber,
  containerStyle,
  inputStyle,
  countryPickerStyle,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(
    CountryData.getAll()[0]
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handlePhoneNumberChange = (text: string) => {
    let numericValue = text.replace(/\D/g, "");
    if (numericValue.startsWith("0")) {
      numericValue = numericValue.slice(1);
    }
    const formattedNumber = formatPhoneNumber(
      numericValue,
      selectedCountry.format
    );
    setPhoneNumber(formattedNumber);
  };

  const handlePhoneNumberBlur = () => {
    const validationResult = validatePhoneNumber(
      phoneNumber,
      selectedCountry.format
    );
    setIsValid(validationResult);
    onChangePhoneNumber(phoneNumber, validationResult);
  };

  const handleCountryChange = useCallback(
    (country: typeof selectedCountry) => {
      setSelectedCountry(country);
      setIsBottomSheetOpen(false);
      const numericValue = phoneNumber.replace(/\D/g, "");
      const formattedNumber = formatPhoneNumber(numericValue, country.format);
      setPhoneNumber(formattedNumber);
    },
    [phoneNumber]
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={[styles.countrySelector, countryPickerStyle]}
          onPress={() => setIsBottomSheetOpen(true)}
        >
          <Text style={styles.countryCode}>{selectedCountry.code}</Text>
          <Text style={styles.dialCode}>{selectedCountry.dialCode}</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.phoneInput, inputStyle]}
          placeholder={selectedCountry.format.replace(/#/g, "0")}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          onBlur={handlePhoneNumberBlur}
        />
      </View>
      <CountryPicker
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        onSelectCountry={handleCountryChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  countryCode: {
    fontSize: 16,
    marginRight: 5,
  },
  dialCode: {
    fontSize: 16,
  },
  phoneInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
});
