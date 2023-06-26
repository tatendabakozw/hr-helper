import React, { useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  heading__title: string;
};

const CustomHeader = ({ heading__title }: Props) => {
  return (
    <SafeAreaView style={[tw`relative bg-slate-50 w-full mt-2`, styles.header]}>
      <ExpoStatusBar style="auto" />
      <View
        style={[tw` mx-4 flex-row items-center absolute`, styles.belowHeader]}
      >
        <View style={tw`h-12 w-12 rounded-full bg-slate-300`}>
          {/* add avatar here */}
        </View>
        <View style={tw`mx-1`} />
        <Text style={tw`flex-1`}>{heading__title}</Text>
        {/* <TouchableOpacity
          activeOpacity={0.7}
          style={tw`bg-white rounded-full p-4`}
        >
          <Ionicons name="search" size={24} color="#64748b" />
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    height: 110,
    paddingVertical: 20,
    overflow: "hidden",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  belowHeader: {
    top: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header__colorItem: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginRight: 10,
    flex: 1,
  },
  
  header__search: {
    backgroundColor: "#F9FAFB",
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 50,
    marginRight: 10,
    flex: 1,
  },
});
