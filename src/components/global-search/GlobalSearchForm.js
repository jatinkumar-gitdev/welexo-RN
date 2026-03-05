import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CustomPicker from "../common/CustomPicker";
import CustomInput from "../common/CustomInput";
import MultiSelectCountry from "../common/MultiSelectCountry";

export default function GlobalSearchForm() {
  const [formData, setFormData] = useState({
    country: [],
    shipmentType: "",
    timePeriod: "1 Month",
    reportingPeriod: "01/02/2026 - 27/02/2026",
    companyType: "",
    companyName: "",
    hscodeType: "",
    hscode: "",
    searchByText: "",
    productName: "",
    portType: "",
    portName: "",
  });

  const handleCountrySelect = (selectedCountries) => {
    setFormData((prev) => ({ ...prev, country: selectedCountries }));
  };

  const handlePickerSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isSilkrouteSelected = formData.country.includes("SILKROUTE");
  const hasSelectedCountries = formData.country.length > 0;

  return (
    <View className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      {/* Banner */}
      <View className="bg-blue-50 rounded-lg p-3 mb-6 items-center">
        <Text className="text-blue-600 font-semibold text-center text-sm">
          Unlock worldwide import-export insights with authentic trade
          intelligence.
        </Text>
      </View>

      {/* Form Fields */}
      <MultiSelectCountry
        label="Select Country"
        required
        value={formData.country}
        onSelect={handleCountrySelect}
      />

      <CustomPicker
        label="Shipment Type"
        placeholder="Select Type"
        required
        value={formData.shipmentType}
        options={["Exporter", "Importer"]}
        onSelect={(val) => handlePickerSelect("shipmentType", val)}
        disabled={!hasSelectedCountries || isSilkrouteSelected}
      />

      <CustomPicker
        label="Time Period"
        placeholder="1 Month"
        required
        value={formData.timePeriod}
      />

      <CustomInput
        label="Reporting Period"
        placeholder="01/02/2026 - 27/02/2026"
        required
        value={formData.reportingPeriod}
      />

      <CustomPicker
        label="Select Company Type"
        placeholder="Please Select"
        value={formData.companyType}
      />
      <CustomInput
        label="Select Company Name"
        placeholder="Please select company name"
        value={formData.companyName}
      />

      <CustomPicker
        label="Select Hscode Type"
        placeholder="Please Select"
        value={formData.hscodeType}
      />
      <CustomInput
        label="Search By HsCode"
        placeholder="Please select HS Code"
        value={formData.hscode}
      />

      <CustomPicker
        label="Select Search By Text/Contains/Exact"
        placeholder="Please Select"
        value={formData.searchByText}
      />
      <CustomInput
        label="Search By Product Name"
        placeholder="Please select Product Name"
        rightIcon="copy"
        value={formData.productName}
      />

      <CustomPicker
        label="Select Country/Port Type/Address"
        placeholder="Please Select"
        value={formData.portType}
      />
      <CustomInput
        label="Select Country/Port Name/Address"
        placeholder="Please select Country/Port/Address"
        value={formData.portName}
      />

      {/* Buttons */}
      <View className="flex-row justify-center mt-6 gap-4">
        <TouchableOpacity className="bg-blue-600 py-3 px-8 rounded-lg shadow-sm w-[45%] items-center justify-center">
          <Text className="text-white font-bold text-base">Search</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white border border-gray-300 py-3 px-8 rounded-lg w-[45%] items-center justify-center">
          <Text className="text-gray-700 font-medium text-base">Clear All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
