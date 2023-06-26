import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {
  type: string;
  message: string;
};

const Alert = (props: Props) => {
  return (
    <View
      style={tw`${
        props.type === "error"
          ? "bg-red-100 "
          : "bg-green-100 "
      }  w-full rounded-lg p-2 my-2`}
    >
      <Text
        style={tw`${
          props.type === "error" ? "text-red-600" : "text-green-600 "
        } text-center capitalize text-lg`}
      >
        {props.message}
      </Text>
    </View>
  );
};

export default Alert;

const styles = StyleSheet.create({});