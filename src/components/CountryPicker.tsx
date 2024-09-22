import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { CustomBottomSheet } from "./CustomBottomSheet";
import { CountryData } from "../utils/CountryData";

interface CountryPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (country: ReturnType<typeof CountryData.getAll>[0]) => void;
}

export const CountryPicker: React.FC<CountryPickerProps> = ({
  isOpen,
  onClose,
  onSelectCountry,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const allCountries = CountryData.getAll();

  const filteredCountries = allCountries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery)
  );

  const renderItem = useCallback(
    ({ item }: { item: ReturnType<typeof CountryData.getAll>[0] }) => (
      <TouchableOpacity
        style={styles.countryItem}
        onPress={() => onSelectCountry(item)}
      >
        <Text style={styles.countryCode}>{item.code}</Text>
        <Text style={styles.countryName}>{item.name}</Text>
        <Text style={styles.dialCode}>{item.dialCode}</Text>
      </TouchableOpacity>
    ),
    [onSelectCountry]
  );

  return (
    <CustomBottomSheet isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Select a country</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search country or dial code"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={filteredCountries}
          renderItem={renderItem}
          keyExtractor={(item) => item.code}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          windowSize={10}
        />
      </View>
    </CustomBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
  },
  dialCode: {
    fontSize: 16,
    color: "#666",
  },
});
