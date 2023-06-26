import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {
    onClick: () => void;
    text: string;
    loading: boolean;
}

const BlueButton = (props: Props) => {
  return (
    <TouchableOpacity
    activeOpacity={0.7}
    // @ts-ignore
    onPress={props.loading ? () => console.log("loading...") : props.onClick}
    style={tw`bg-[#0F172A] text-black border border-black rounded-lg p-4 w-full`}
  >
    <Text style={tw`w-full text-white text-center font-semibold`}>
      {props.loading ? "loading..." : props.text}
    </Text>
  </TouchableOpacity>
  )
}

export default BlueButton

const styles = StyleSheet.create({})