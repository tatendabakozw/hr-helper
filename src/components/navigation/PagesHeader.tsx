import { Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native'
import { Entypo } from "@expo/vector-icons";

type Props = {
    response:any
}

const PagesHeader = (props: Props) => {
    const navigation = useNavigation();
  return (
    <View style={[tw`flex-row items-center`, styles.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color="#0f172a" />
        </TouchableOpacity>
        <View
          style={tw`h-13 w-13 mx-2 overflow-hidden border border-slate-900 rounded-full bg-slate-300`}
        >
          <Image
            style={{ flex: 1, width: "100%", height: undefined }}
            source={
              props?.response?.data?.employee?.photoURL
                ? { uri: props?.response?.data?.employee?.photoURL }
                : require("../../assets/placeholder1.png")
            }
          />
        </View>
        <View style={tw`flex flex-col`}>
          <Text style={tw`text-slate-900 text-xl font-semibold`}>
            {props?.response?.data?.employee?.first_name}{" "}
            {props?.response?.data?.employee?.last_name}
          </Text>
          <Text style={tw`text-slate-500 text-lg`}>
            {props?.response?.data?.employee?.job_title || "No Job Title"}
          </Text>
        </View>
      </View>
  )
}

export default PagesHeader

const styles = StyleSheet.create({
    header: {
      height: 110,
      paddingVertical: 0,
      overflow: "hidden",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    belowHeader: {
      top: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });
  