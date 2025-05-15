import {View, Image, StyleSheet, Text} from "react-native";
import logo_snout from "../assets/logo_snout.png";

export default function PantallaDeCarga() {

    return (
        <View style={[styles.container]}>
            <Image source={logo_snout} style={{ width: 370, height: 370 }} />
        </View> 
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#43281C",
    alignItems: "center",
    justifyContent: "center",
  },
});