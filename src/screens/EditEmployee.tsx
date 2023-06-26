import {
    Image,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import { StatusBar as ExpoStatusBar } from "expo-status-bar";
  import { Entypo, Ionicons } from "@expo/vector-icons";
  import React, { useContext, useState } from "react";
  import tw from "twrnc";
  import { ScrollView, ActivityIndicator } from "react-native";
  import * as ImagePicker from "expo-image-picker";
  import { useNavigation } from "@react-navigation/native";
  import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  import { firebaseApp } from "../config/firebase-config";
  import { getRandomString } from "../helpers/getRandomString";
  import { getMessage } from "../helpers/getMessage";
  import axios from "axios";
  import { apiUrl } from "../../utils/apiUrl";
  import BlueButton from "../components/buttons/BlueButton";
  import Alert from "../components/alerts/Alerts";
  import { Store } from "../context/Store";

type Props = {}

const EditEmployee = (props: Props) => {
    const navigation = useNavigation();
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [work_type, setWorkType] = useState("");
    const [national_id, setNationalId] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState("");
    const [job_title, setJobTitle] = useState("");
    const [picture_loading, setPictureLoading] = useState(false);
    const [picture_url, setPictureUrl] = useState("");
  
    //for profile picture
    const [profile__preview, setProfilePreview] = useState<any>();
    const [new_bio_picture, setNewBioPicture] = useState<any>(null);
    const [edit_profile, setEditProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [msg, setMsg] = useState("");
  
    const storage = getStorage(firebaseApp);
  
    const { state } = useContext(Store);
    const { user_info } = state;
  
    const uploadPicture = async () => {
      setPictureLoading(true);
      try {
        const sotrageRef = ref(
          storage,
          `listings/${getRandomString(9)}-${Date.now()}`
        );
        const uploadTask = uploadBytesResumable(sotrageRef, new_bio_picture);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog: any = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            // setProgress(prog);
          },
          (error) => {
            setPictureLoading(false);
            console.log(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
              setPictureUrl(downloadURLs);
              setPictureLoading(false);
              console.log("File available at", downloadURLs);
            });
          }
        );
      } catch (error) {
        setPictureLoading(false);
        console.log("could not upload picture: --- ", error);
      }
    };
  
    console.log(picture_url);
  
    const add_Picture = async () => {
      setEditProfile(true);
      let result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 0.7,
      });
  
      if (!result.cancelled) {
        const blob: Blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function () {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", result.uri, true);
          xhr.send(null);
        });
        setNewBioPicture(blob);
        // Implement a new Blob promise with XMLHTTPRequest
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsDataURL(blob);
        fileReaderInstance.onload = () => {
          const base64data = fileReaderInstance.result;
          // console.log(base64data);
          setProfilePreview(base64data);
        };
      }
    };
  
    const save_user_Handler = async () => {
      try {
        setLoading(true);
        console.log(first_name);
        console.log(last_name);
        console.log(email);
        console.log(phone);
        console.log(salary);
        console.log(gender);
        console.log(national_id);
        console.log(work_type);
        console.log(picture_url);
        console.log(job_title);
        const { data } = await axios.post(
          `${apiUrl}/employee/create`,
          {
            first_name,
            last_name,
            email,
            phone,
            salary,
            gender,
            national_id,
            work_type,
            photoURL: picture_url,
            job_title,
          },
          {
            headers: {
              Authorization: user_info.token,
            },
          }
        );
        setLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setSalary("");
        setGender("");
        setNationalId("");
        setWorkType("");
        setPictureUrl("");
        setJobTitle("");
        setErr("");
        setMsg(getMessage(data));
      } catch (error: any) {
        setLoading(false);
        setMsg("");
        setErr(getMessage(error));
        console.log(getMessage(error));
      }
    };
  
    return (
      <SafeAreaView style={tw`bg-white h-full w-full px-6`}>
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
            <Text style={tw`text-slate-900 text-xl text-center font-semibold`}>
              Add Employee
            </Text>
          </View>
          <View style={tw`flex-1`} />
        </View>
  
        <ScrollView
          contentContainerStyle={tw`flex flex-col py-8 w-full items-center`}
        >
          {picture_loading ? (
            <View>
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            <>
              {edit_profile ? (
                <TouchableOpacity onPress={add_Picture} activeOpacity={0.8}>
                  <View
                    style={[
                      tw`border-2 border-white`,
                      { height: 100, width: 100, borderRadius: 50 },
                    ]}
                  >
                    <Image
                      source={
                        profile__preview
                          ? { uri: profile__preview }
                          : require("../assets/placeholder1.png")
                      }
                      style={[
                        tw`rounded-full bg-white rounded-full`,
                        { height: 100, width: 100, borderRadius: 50 },
                      ]}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={tw`w-1/3`}>
                  <View style={[tw`relative`, { width: 110 }]}>
                    <View
                      style={[
                        tw`border-2 border-white`,
                        { height: 100, width: 100, borderRadius: 50 },
                      ]}
                    >
                      <Image
                        source={require("../assets/placeholder1.png")}
                        style={[
                          tw`rounded-full`,
                          { height: 100, width: 100, borderRadius: 400 },
                        ]}
                        resizeMode="contain"
                      />
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={add_Picture}
                      style={[
                        tw`absolute bottom-0 right-0 z-40 bg-gray-300 border-2 border-white p-2`,
                        { borderRadius: 50 },
                      ]}
                    >
                      <Ionicons name="camera" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {edit_profile && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={uploadPicture}
                  style={tw`bg-[#0F172A] rounded-xl p-2 border border-[#0F172A] mt-4`}
                >
                  <Text style={tw`text-center text-white font-semibold `}>
                    Save Picture
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
          <View style={tw`py-8 flex-1 h-full w-full flex flex-col`}>
            <View style={tw`flex flex-col pb-4`}>
              <Text style={tw`text-slate-700 pb-2`}>First name</Text>
              <TextInput
                onChangeText={(text) => setFirstName(text)}
                value={first_name}
                style={tw`flex py-2 px-3 w-full border border-slate-700 rounded-lg`}
                placeholder="first name"
              />
            </View>
            <View style={tw`flex flex-col pb-4`}>
              <Text style={tw`text-slate-700 pb-2`}>Last name</Text>
              <TextInput
                onChangeText={(text) => setLastName(text)}
                value={last_name}
                style={tw`flex py-2 px-3 w-full border border-slate-700 rounded-lg`}
                placeholder="last name"
              />
            </View>
            <View style={tw`flex flex-col pb-4`}>
              <Text style={tw`text-slate-700 pb-2`}>Gender</Text>
              <View style={tw`flex flex-row items-center`}>
                <GenderItem
                  onPress={() => setGender("male")}
                  styles={gender === "male" ? "bg-green-300" : ""}
                  gender="male"
                />
                <View style={tw`px-2`} />
                <GenderItem
                  styles={gender === "female" ? "bg-green-300 " : ""}
                  onPress={() => setGender("female")}
                  gender="female"
                />
              </View>
            </View>
            <View style={tw`flex flex-col pb-4`}>
              <Text style={tw`text-slate-700 pb-2`}>National ID</Text>
              <TextInput
                onChangeText={(text) => setNationalId(text)}
                value={national_id}
                style={tw`flex py-2 px-3 w-full border border-slate-700 rounded-lg`}
                placeholder="National ID"
              />
            </View>
            <View style={tw`flex flex-col pb-4`}>
              <Text style={tw`text-slate-700 pb-2`}>Phone Number</Text>
              <TextInput
                onChangeText={(text) => setPhone(text)}
                value={phone}
                style={tw`flex py-2 px-3 w-full border border-slate-700 rounded-lg`}
                placeholder="phone number"
              />
            </View>
            <View style={tw`flex flex-col pb-4`}>
              <Text style={tw`text-slate-700 pb-2`}>Work Type</Text>
              <View style={tw`flex flex-row items-center`}>
                <GenderItem
                  onPress={() => setWorkType("remote")}
                  styles={work_type === "remote" ? "bg-green-300" : ""}
                  gender="remote"
                />
                <View style={tw`px-2`} />
                <GenderItem
                  styles={work_type === "office" ? "bg-green-300 " : ""}
                  onPress={() => setWorkType("office")}
                  gender="office"
                />
              </View>
            </View>
            <View style={tw`flex flex-col pb-4`}>
              <Text style={tw`text-slate-700 pb-2`}>Email</Text>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                value={email}
                style={tw`flex py-2 px-3 w-full border border-slate-700 rounded-lg`}
                placeholder="email"
              />
            </View>
            <View style={tw`flex flex-col pb-4`}>
              <Text style={tw`text-slate-700 pb-2`}>Salary</Text>
              <TextInput
                onChangeText={(text) => setSalary(text)}
                value={salary}
                style={tw`flex py-2 px-3 w-full border border-slate-700 rounded-lg`}
                placeholder="salary"
              />
            </View>
            <View style={tw`flex flex-col pb-4`}>
              <Text style={tw`text-slate-700 pb-2`}>Job Title</Text>
              <TextInput
                onChangeText={(text) => setJobTitle(text)}
                value={job_title}
                style={tw`flex py-2 px-3 w-full border border-slate-700 rounded-lg`}
                placeholder="job title"
              />
            </View>
            {err ? <Alert message={err} type="error" /> : null}
            {msg ? <Alert message={msg} type="success" /> : null}
            <BlueButton
              text="Save Details"
              onClick={save_user_Handler}
              loading={loading}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}

interface GenderItemProps {
    gender: string;
    onPress: () => void;
    styles: any;
  }
  
  const GenderItem = (props: GenderItemProps) => {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        activeOpacity={0.7}
        style={tw` flex flex-row items-center p-2 rounded-lg border flex-1 border-slate-700`}
      >
        <View
          style={tw`${props.styles} h-4 w-4 border border-slate-700 rounded-full `}
        />
        <Text style={tw`capitalize text-lg text-slate-500 ml-2`}>
          {props.gender}
        </Text>
      </TouchableOpacity>
    );
  };
  
  
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

export default EditEmployee