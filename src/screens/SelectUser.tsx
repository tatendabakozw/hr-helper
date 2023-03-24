import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import SvgUri from "react-native-svg-uri";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const SelectUser = (props: Props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[tw`bg-[#048BA8] h-full py-8`]}>
      <View style={styles.header} />
      <ExpoStatusBar />
      <View style={tw`relative flex flex-1 flex-col items-center px-4`}>
        <View style={tw`h-80 flex-1`}>
          <SvgUri
            width="300"
            height="200"
            source={require("../assets/intro_pic.svg")}
          />
        </View>
        <View style={tw`flex p-8 bg-white rounded-2xl w-full`}>
          <Text style={tw`text-xl font-semibold text-center pb-8`}>
            What type of user are you?
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            // @ts-ignore
            onPress={() => navigation.navigate("Home")}
            style={tw`bg-[#048BA8] text-white rounded-full p-4 my-2`}
          >
            <Text style={tw`w-full text-white text-center font-semibold`}>
              Farmer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            // @ts-ignore
            onPress={() => navigation.navigate("Home")}
            style={tw`bg-[#048BA8] text-white rounded-full p-4 my-2`}
          >
            <Text style={tw`w-full text-white text-center font-semibold`}>
              Tourist
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            // @ts-ignore
            onPress={() => navigation.navigate("Home")}
            style={tw`bg-[#048BA8] text-white rounded-full p-4 my-2`}
          >
            <Text style={tw`w-full text-white text-center font-semibold`}>
              General User
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectUser;

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
