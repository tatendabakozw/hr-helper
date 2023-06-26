import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";

type Props = {};

const LightActivityComponent = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState("sick");
  return (
    <View style={tw`rounded-lg bg-white border border-[#0F172A] p-2 flex-1`}>
      <View style={tw`flex flex-row items-center pb-1`}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setSelectedOption("sick")}
          style={tw`border-2 ${
            selectedOption === "sick"
              ? "border-[#0F172A] bg-[#0F172A] "
              : "border-[#0F172A] bg-white "
          } mr-2 rounded-full h-4 w-4`}
        />
        <Text style={tw`text-[#0F172A] font-semibold text-lg`}>Sick</Text>
      </View>
      <Text style={tw`text-[#0F172A]`}>6 People</Text>

      <View style={tw`flex flex-row items-center pt-4 pb-1`}>
        <TouchableOpacity
          onPress={() => setSelectedOption("vacation")}
          style={tw`border-2 ${
            selectedOption === "vacation"
              ? "border-[#0F172A] bg-[#0F172A] "
              : "border-[#0F172A] bg-white "
          } mr-2 rounded-full h-4 w-4`}
        />
        <Text style={tw`text-[#0F172A] font-semibold text-lg`}>Vacation</Text>
      </View>
      <Text style={tw`text-[#0F172A]`}>23 People</Text>
    </View>
  );
};

export default LightActivityComponent;

const styles = StyleSheet.create({});
