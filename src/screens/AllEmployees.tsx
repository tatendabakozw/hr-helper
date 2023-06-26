import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import tw from "twrnc";
import EmployeeItem from "../components/employee-item/EmployeeItem";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const AllEmployees = (props: Props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[tw`bg-white h-full px-6`]}>
      <ExpoStatusBar style="auto" />
      <View
        style={[
          tw`flex-row w-full justify-between items-center`,
          styles.header,
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`flex-1`}
        >
          <Entypo name="chevron-left" size={24} color="#0f172a" />
        </TouchableOpacity>

        <View style={tw`flex flex-col flex-1`}>
          <Text style={tw`text-slate-900 text-xl font-semibold`}>
            All Employees
          </Text>
        </View>
        <View style={tw`flex-1`} />
      </View>
      <View>
        <TextInput
          style={tw`border border-slate-900 p-2 w-full rounded-xl`}
          placeholder="Search User"
        />
      </View>
      <ScrollView
        contentContainerStyle={tw`flex flex-row justify-between py-8 flex-wrap`}
      >
        {new Array(30).fill("a").map((item, index) => (
          <View key={index} style={tw`mb-6`}>
            <EmployeeItem />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllEmployees;

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
