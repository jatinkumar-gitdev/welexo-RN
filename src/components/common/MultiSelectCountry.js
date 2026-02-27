import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import countriesData from "../../constants/countries.json";

const MultiSelectCountry = ({ label, required, value = [], onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Helper to check if a country is selected
  const isSelected = (code) => value.includes(code);

  const allCountriesFlat = useMemo(() => {
    return countriesData.continents.reduce(
      (acc, c) => [...acc, ...c.countries],
      [],
    );
  }, []);

  const allTradeModesFlat = useMemo(() => {
    return countriesData.tradeModes || [];
  }, []);

  // Helper to get country object from code
  const getCountryByCode = (code) => {
    return (
      allCountriesFlat.find((c) => c.code === code) ||
      allTradeModesFlat.find((t) => t.code === code)
    );
  };

  // Toggle individual selection
  const toggleSelection = (code) => {
    const isTradeMode = allTradeModesFlat.some((t) => t.code === code);
    let newValue;
    if (value.includes(code)) {
      newValue = value.filter((c) => c !== code);
    } else {
      if (isTradeMode) {
        // If selecting a trade mode (Silkroute), clear all countries
        newValue = [code];
      } else {
        // If selecting a country, remove any trade modes (Silkroute)
        const tradeModeCodes = allTradeModesFlat.map((t) => t.code);
        newValue = [...value.filter((c) => !tradeModeCodes.includes(c)), code];
      }
    }
    onSelect(newValue);
  };

  // Select All logic
  const allCountryCodes = useMemo(() => {
    return allCountriesFlat.map((country) => country.code);
  }, [allCountriesFlat]);

  const isAllSelected =
    allCountryCodes.length > 0 &&
    allCountryCodes.every((code) => value.includes(code));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      onSelect([]);
    } else {
      // Selecting all countries removes any trade modes (Silkroute)
      onSelect([...allCountryCodes]);
    }
  };

  // Continent selection logic
  const toggleContinent = (continentName) => {
    const continent = countriesData.continents.find(
      (c) => c.name === continentName,
    );
    const continentCodes = continent.countries.map((c) => c.code);
    const allContinentSelected = continentCodes.every((code) =>
      value.includes(code),
    );

    let newValue;
    if (allContinentSelected) {
      newValue = value.filter((code) => !continentCodes.includes(code));
    } else {
      // Selecting continent countries removes any trade modes (Silkroute)
      const tradeModeCodes = allTradeModesFlat.map((t) => t.code);
      newValue = [
        ...new Set([
          ...value.filter((c) => !tradeModeCodes.includes(c)),
          ...continentCodes,
        ]),
      ];
    }
    onSelect(newValue);
  };

  const isContinentSelected = (continentName) => {
    const continent = countriesData.continents.find(
      (c) => c.name === continentName,
    );
    if (!continent) return false;
    const continentCodes = continent.countries.map((c) => c.code);
    return (
      continentCodes.length > 0 &&
      continentCodes.every((code) => value.includes(code))
    );
  };

  // Filtered data
  const filteredData = useMemo(() => {
    if (!searchQuery) return countriesData;

    const lowerQuery = searchQuery.toLowerCase();
    const filteredContinents = countriesData.continents
      .map((c) => ({
        ...c,
        countries: c.countries.filter((country) =>
          country.name.toLowerCase().includes(lowerQuery),
        ),
      }))
      .filter((c) => c.countries.length > 0);

    const filteredTradeModes = (countriesData.tradeModes || []).filter((t) =>
      t.name.toLowerCase().includes(lowerQuery),
    );

    return {
      continents: filteredContinents,
      tradeModes: filteredTradeModes,
    };
  }, [searchQuery]);

  return (
    <View className="mb-4">
      <View className="flex-row items-center mb-2">
        <Text className="text-gray-700 text-sm font-semibold">
          {label} {required && <Text className="text-red-500">*</Text>}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 min-h-[50px] justify-center"
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-1 flex-row flex-wrap gap-2">
            {value.length === 0 ? (
              <Text className="text-gray-400">Please Select</Text>
            ) : (
              value.map((code) => {
                const item = getCountryByCode(code);
                if (!item) return null;
                return (
                  <View
                    key={code}
                    className="bg-blue-50 flex-row items-center px-2 py-1 rounded-lg border border-blue-100"
                  >
                    <Text className="text-blue-700 text-xs mr-1 font-medium">
                      {item.flag} {item.name}
                    </Text>
                    <TouchableOpacity onPress={() => toggleSelection(code)}>
                      <Ionicons name="close-circle" size={14} color="#3B82F6" />
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
          </View>
          <Ionicons
            name="chevron-down"
            size={20}
            color="#9CA3AF"
            className="ml-2"
          />
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
              <Text className="text-lg font-bold text-gray-800">
                Select Countries
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="p-1"
              >
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* Search */}
            <View className="p-4 pt-4">
              <View className="bg-gray-100 flex-row items-center px-4 py-2 rounded-xl">
                <Ionicons name="search" size={20} color="#9CA3AF" />
                <TextInput
                  className="flex-1 ml-2 text-gray-900 h-10"
                  placeholder="Search country..."
                  placeholderTextColor="#9CA3AF"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              className="px-4 pb-4"
            >
              {/* Select All */}
              {!searchQuery && (
                <TouchableOpacity
                  onPress={toggleSelectAll}
                  className="flex-row items-center mb-6 py-3 border-b border-gray-100"
                >
                  <Ionicons
                    name={isAllSelected ? "checkbox" : "square-outline"}
                    size={24}
                    color={isAllSelected ? "#2563EB" : "#9CA3AF"}
                  />
                  <Text
                    className={`ml-3 text-base font-bold ${isAllSelected ? "text-blue-600" : "text-gray-500"}`}
                  >
                    Select All Countries
                  </Text>
                </TouchableOpacity>
              )}

              {/* Continents */}
              {filteredData.continents.map((continent) => (
                <View key={continent.name} className="mb-6">
                  <TouchableOpacity
                    onPress={() => toggleContinent(continent.name)}
                    className="flex-row items-center mb-3 bg-gray-50/50 p-2 rounded-lg"
                  >
                    <Ionicons
                      name={
                        isContinentSelected(continent.name)
                          ? "checkbox"
                          : "square-outline"
                      }
                      size={22}
                      color={
                        isContinentSelected(continent.name)
                          ? "#2563EB"
                          : "#9CA3AF"
                      }
                    />
                    <Text className="ml-3 text-base font-bold text-gray-800">
                      {continent.name}
                    </Text>
                    <Text className="ml-auto text-xs text-gray-400 font-medium">
                      {continent.countries.length} found
                    </Text>
                  </TouchableOpacity>

                  <View className="ml-4 gap-4">
                    {continent.countries.map((country) => (
                      <TouchableOpacity
                        key={country.code}
                        activeOpacity={0.6}
                        onPress={() => toggleSelection(country.code)}
                        className="flex-row items-center py-1"
                      >
                        <Ionicons
                          name={
                            isSelected(country.code)
                              ? "checkbox"
                              : "square-outline"
                          }
                          size={20}
                          color={
                            isSelected(country.code) ? "#2563EB" : "#9CA3AF"
                          }
                        />
                        <Text className="ml-3 text-gray-700 text-sm font-medium">
                          {country.flag} {country.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}

              {/* Trade Mode */}
              {filteredData.tradeModes &&
                filteredData.tradeModes.length > 0 && (
                  <View className="mb-6 mt-2">
                    <Text className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                      Trade Mode
                    </Text>
                    {filteredData.tradeModes.map((mode) => (
                      <TouchableOpacity
                        key={mode.code}
                        activeOpacity={0.7}
                        onPress={() => toggleSelection(mode.code)}
                        className={`flex-row items-center p-4 rounded-2xl mb-2 ${isSelected(mode.code) ? "bg-blue-600" : "bg-gray-50 border border-gray-100"}`}
                      >
                        <Text
                          className={`text-sm font-bold ${isSelected(mode.code) ? "text-white" : "text-gray-700"}`}
                        >
                          {mode.flag} {mode.name}
                        </Text>
                        {isSelected(mode.code) && (
                          <View className="ml-auto">
                            <Ionicons
                              name="checkmark-circle"
                              size={20}
                              color="#FFFFFF"
                            />
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
            </ScrollView>

            <View className="p-4 border-t border-gray-100">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-blue-600 py-4 rounded-2xl items-center shadow-sm"
              >
                <Text className="text-white font-bold text-lg">
                  Apply Selection ({value.length})
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
});

export default MultiSelectCountry;
