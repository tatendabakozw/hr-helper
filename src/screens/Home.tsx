import { Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import GeneralLayout from "../layouts/GeneralLayout";
import WeatherComponent from "../components/weather-component/WeatherComponent";
import { data } from "../../utils/data";

type Props = {};

const Home = (props: Props) => {
  const conditions = [
    {
      picture: data.icons.rainy,
      condition: "Rainy",
      location: "Harare",
      heading: "Zimbabwe",
      temperature: "20",
    },
    {
      picture: data.icons.cloudy,
      condition: "Cloudy",
      location: "Bulawayo",
      heading: "Zimbabwe",
      temperature: "15",
    },
    {
      picture: data.icons.cloudy,
      condition: "Cloudy",
      location: "Bulawayo",
      heading: "Zimbabwe",
      temperature: "15",
    },
  ];

  return (
    <GeneralLayout header_title={"Hello User, Discover the weather"}>
      <View style={tw`py-8`}>
        <WeatherComponent
          picture={data.icons.sunny}
          condition={"Sunny"}
          temperature={"20"}
          location="Chinhoyi"
          heading="Current Location"
        />
      </View>
      <Text style={tw`flex-1 text-2xl text-slate-500`}>Around the country</Text>
      {conditions.map((item, index) => (
        <View key={index} style={tw`py-2 flex`}>
          <WeatherComponent
            picture={item.picture}
            condition={item.condition}
            temperature={item.temperature}
            location={item.location}
            heading={item.heading}
          />
        </View>
      ))}
    </GeneralLayout>
  );
};

export default Home;
