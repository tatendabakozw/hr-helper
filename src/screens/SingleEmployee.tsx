import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import tw from "twrnc";
import { apiUrl } from "../../utils/apiUrl";
import { useAuthFetch } from "../hooks/useAuthFetch";
import { Store } from "../context/Store";
import PagesHeader from "../components/navigation/PagesHeader";
import { currencyFormat } from "../helpers/currencyFormat";
import BlueButton from "../components/buttons/BlueButton";
import { useNavigation } from "@react-navigation/native";

type Props = {
  route: any;
};

const SingleEmployee = (props: Props) => {
  const { _id } = props.route.params;
  const { state } = useContext(Store);
  const { user_info } = state;
  const navigation = useNavigation();

  const tax = 256;

  const url = `${apiUrl}/employee/get/${_id}`;
  const response = useAuthFetch(url, user_info.token);

  return (
    <SafeAreaView style={[tw`bg-white h-full px-6`]}>
      <ExpoStatusBar style="auto" />
      <PagesHeader response={response} />
      <ScrollView contentContainerStyle={tw`py-4`}>
        <View
          style={tw`w-full flex flex-row items-center justify-between pb-8`}
        >
          <Text style={tw`text-lg text-slate-700`}>Email</Text>
          <Text style={tw`text-lg text-slate-700`}>
            {response?.data?.employee?.email}
          </Text>
        </View>
        <View
          style={tw`w-full flex flex-row items-center justify-between pb-8`}
        >
          <Text style={tw`text-lg text-slate-700`}>Phone</Text>
          <Text style={tw`text-lg text-slate-700`}>
            {response?.data?.employee?.phone}
          </Text>
        </View>
        <View
          style={tw`w-full flex flex-row items-center justify-between pb-8`}
        >
          <Text style={tw`text-lg text-slate-700`}>Gender</Text>
          <Text style={tw`text-lg text-slate-700 capitalize`}>
            {response?.data?.employee?.gender}
          </Text>
        </View>
        <View
          style={tw`border border-slate-900 bg-[#86EFAC] rounded-xl p-6 mb-8 flex flex-col`}
        >
          <Text style={tw`text-slate-900 font-semibold text-2xl pb-4`}>
            Salary
          </Text>
          <View
            style={tw`w-full flex flex-row items-center justify-between pb-4`}
          >
            <Text style={tw`text-lg text-slate-700`}>Next payment</Text>
            <Text style={tw`text-lg text-slate-900 font-semibold`}>
              15 Apr, 2023
            </Text>
          </View>
          <View style={tw`border-t w-full border-slate-900 pb-4`} />
          <View
            style={tw`w-full flex flex-row items-center justify-between pb-4`}
          >
            <Text style={tw`text-lg text-slate-700`}>Monthly Salary</Text>
            <Text style={tw`text-lg text-slate-900 font-semibold`}>
              {currencyFormat(parseInt(response?.data?.employee?.salary))}
            </Text>
          </View>
          <View
            style={tw`w-full flex flex-row items-center justify-between pb-4`}
          >
            <Text style={tw`text-lg text-slate-700`}>Total tax</Text>
            <Text style={tw`text-lg text-slate-900 font-semibold`}>
              {currencyFormat(tax)}
            </Text>
          </View>
          <View style={tw`border-t w-full border-slate-900 pb-4`} />
          <View
            style={tw`w-full flex flex-row items-center justify-between pb-8`}
          >
            <Text style={tw`text-lg text-slate-700`}>Total salary</Text>
            <Text style={tw`text-lg text-slate-900 font-semibold`}>
              {currencyFormat(parseInt(response?.data?.employee?.salary) - tax)}
            </Text>
          </View>
          <View style={tw`bg-white rounded-xl p-4 border border-[#0F172A]`}>
            <Text style={tw`text-center text-[#0F172A] font-semibold text-lg`}>
              Set up salary
            </Text>
          </View>
        </View>
        <BlueButton
          text="Edit Employee"
          loading={false}
          onClick={() =>
            // @ts-ignore
            // navigation.navigate("EditEmployee", {
            //   _id: _id,
            // })
            console.log('move to edit employee page')
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleEmployee;
