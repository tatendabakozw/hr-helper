import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import tw from "twrnc";
import GreenButton from "../components/buttons/GreenButton";
import { useNavigation } from "@react-navigation/native";
import { getMessage } from "../helpers/getMessage";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { Store } from "../context/Store";
import Alert from "../components/alerts/Alerts";

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const { dispatch, state } = useContext(Store);
  const { user_info } = state;

  const login_user_Handler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${apiUrl}/auth/login`, {
        email: email.trim(),
        password: password.trim(),
      });
      setEmail("");
      setPassword("");
      setErr("");
      setMsg(getMessage(data));
      dispatch({ type: "USER_LOGIN", payload: data });
      dispatch({ type: "USER_SIGNED_IN", payload: true });
      navigation.reset({
        index: 0,
        // @ts-ignore
        routes: [{ name: "Home" }],
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setMsg("");
      setErr(getMessage(error));
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={[tw`bg-white flex flex-col h-full py-8`]}>
      <View style={styles.header} />
      <ExpoStatusBar />
      <KeyboardAvoidingView
        style={tw`px-4 flex-1 flex flex-col items-center w-full`}
      >
        <View style={tw`flex-1`} />
        <TextInput
          onChangeText={(text: string) => setEmail(text)}
          value={email}
          style={tw`p-2 rounded-lg border border-slate-500 my-2 w-full`}
          placeholder="email@email.com"
        />
        <TextInput
          onChangeText={(text: string) => setPassword(text)}
          value={password}
          style={tw`p-2 rounded-lg border border-slate-500 my-2 w-full`}
          placeholder="password"
        />
        {err ? <Alert message={err} type="error" /> : null}
        {msg ? <Alert message={msg} type="success" /> : null}
        <GreenButton
          loading={loading}
          text="Login"
          // @ts-ignore
          onClick={login_user_Handler}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

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
