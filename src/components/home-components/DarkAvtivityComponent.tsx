import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";

type Props = {
  response?: any;
};

const DarkAvtivityComponent = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState("office");

  console.log(props?.response?.data?.office?.length);

  return (
    <View
      style={tw`rounded-lg flex flex-col bg-[#0F172A] border border-[#0F172A] p-2 flex-1`}
    >
      <View style={tw`flex flex-row items-center pb-1`}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setSelectedOption("office")}
          style={tw`border-2 ${
            selectedOption === "office"
              ? "border-white bg-[#86EFAC] "
              : "border-white bg-white "
          } mr-2 rounded-full h-4 w-4`}
        />
        <Text style={tw`text-white font-semibold text-lg`}>Office</Text>
      </View>
      <Text style={tw`text-white pr-2`}>
        {props?.response?.data?.office?.length} People
      </Text>
      <View style={tw`flex flex-row items-center pt-4 pb-1`}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setSelectedOption("remote")}
          style={tw`border-2 ${
            selectedOption === "remote"
              ? "border-white bg-[#86EFAC] "
              : "border-white bg-white "
          } mr-2 rounded-full h-4 w-4`}
        />
        <Text style={tw`text-white font-semibold text-lg`}>Remote</Text>
      </View>
      <Text style={tw`text-white`}>
        {props?.response?.data?.remote?.length} People
      </Text>
    </View>
  );
};

export default DarkAvtivityComponent;

const styles = StyleSheet.create({});
