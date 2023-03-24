import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import tw from "twrnc";

type Props = {
  picture: any;
  location: string;
  condition: string;
  temperature: string;
  heading: string
};

const WeatherComponent = (props: Props) => {
  return (
    <View style={tw`rounded-3xl bg-[#048BA8] p-8`}>
      <View style={tw`flex flex-col`}>
        <View style={tw`flex flex-row items-center justify-between`}>
          <View style={tw`flex flex-col pb-8`}>
            <Text style={tw`text-slate-200 pb-2`}>{props.heading}</Text>
            <Text style={tw`text-xl font-semibold text-white`}>
              {props.location}
            </Text>
          </View>
          <View>
            <Image source={props.picture} style={tw`h-20 w-20`} />
          </View>
        </View>
        <View style={tw`flex flex-row w-full justify-between`}>
          <Text style={tw`text-slate-300`}>{props.condition}</Text>
          <Text style={tw`text-slate-300`}>{props.temperature}&#8451;</Text>
        </View>
      </View>
    </View>
  );
};

export default WeatherComponent;

const styles = StyleSheet.create({});
