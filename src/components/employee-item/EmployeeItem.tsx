import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

type Props = {
  employee: any;
};

const EmployeeItem = (props: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      //   @ts-ignore
      onPress={() =>
        navigation.navigate("SingleEmployee", {
          _id: props.employee._id,
        })
      }
      style={tw`flex flex-col items-center pr-2`}
    >
      <View
        style={tw`h-15 w-15 bg-white flex overflow-hidden items-center content-center justify-center border border-slate-900 rounded-full`}
      >
        <Image
          style={{ flex: 1, width: "100%", height: undefined }}
          source={
            props.employee.photoURL
              ? { uri: props.employee.photoURL }
              : require("../../assets/placeholder1.png")
          }
        />
      </View>
      <Text style={tw`text-center py-2 font-semibold text-slate-900`}>
        {props.employee.first_name} {props.employee.last_name}
      </Text>
      <Text style={tw`text-center text-slate-500`}>
        {props.employee.job_title || "No Job Title"}
      </Text>
    </TouchableOpacity>
  );
};

export default EmployeeItem;

const styles = StyleSheet.create({});
