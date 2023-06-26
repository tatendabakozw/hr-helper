import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";
import DarkAvtivityComponent from "../components/home-components/DarkAvtivityComponent";
import LightActivityComponent from "../components/home-components/LightActivityComponent";
import EmployeeItem from "../components/employee-item/EmployeeItem";
import { useNavigation } from "@react-navigation/native";
import { Store } from "../context/Store";
import { apiUrl } from "../../utils/apiUrl";
import { useAuthFetch } from "../hooks/useAuthFetch";

type Props = {};

const Home = (props: Props) => {
  const navigation = useNavigation();

  const { state } = useContext(Store);
  const { user_info } = state; 
  const url = `${apiUrl}/company`

  const response = useAuthFetch(url, user_info.token)

  console.log('user info', response)
  

  return (
    <SafeAreaView style={[tw`bg-white h-full px-4`]}>
      <ExpoStatusBar style="auto" />
      <View style={[tw`flex-row items-center`, styles.header]}>
        <View style={tw`h-13 w-13 rounded-full bg-slate-300`}>
          {/* add avatar here */}
        </View>
        <View style={tw`mx-1`} />
        <View style={tw`flex flex-row items-center`}>
          <Text style={tw`mr-2 text-slate-600 text-lg`}>Hello</Text>
          <Text style={tw`text-slate-900 font-semibold text-lg`}>
            {user_info.name}
          </Text>
        </View>
      </View>
      <Text style={tw`text-slate-900 font-semibold text-xl pt-8 pb-4`}>
        Activity
      </Text>
      {/* Activity Containers */}
      <View style={tw`flex flex-row items-center`}>
        <DarkAvtivityComponent response={response} />
        <View style={tw`px-2`} />
        <LightActivityComponent />
      </View>

      {/* employees carousel heading*/}
      <TouchableOpacity
        // @ts-ignore
        onPress={() => navigation.navigate("AllEmployees")}
        style={tw`flex flex-row items-center  mt-8 mb-4`}
      >
        <Text style={tw`text-slate-900 font-semibold text-xl `}>Employees</Text>
        <View style={tw`flex-1`} />
        <Text style={tw`text-slate-900 text-lg`}>View All</Text>
        <Entypo name="chevron-right" size={16} color="black" />
      </TouchableOpacity>

      {/* employees carousel items */}
      <ScrollView horizontal contentContainerStyle={tw`pb-4`}>
        <TouchableOpacity
          activeOpacity={0.7}
          // @ts-ignore
          onPress={() => navigation.navigate("AddEmployee")}
          style={tw`flex flex-col pr-6`}
        >
          <View
            style={tw`h-15 w-15 bg-white flex items-center content-center justify-center border border-slate-900 rounded-full`}
          >
            <Entypo name="plus" size={24} color="black" />
          </View>
          <Text style={tw`text-center py-2 font-semibold text-slate-900`}>
            Add New
          </Text>
        </TouchableOpacity>
        {response?.data?.employees?.map((item:any, index:number) => (
          <EmployeeItem employee={item} key={index} />
        ))}
      </ScrollView>
      <View style={tw`flex-1`} />
    </SafeAreaView>
  );
};

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
});

export default Home;
