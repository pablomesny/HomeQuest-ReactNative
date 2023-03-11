import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

export const Loader = () => {
  return (
    <View style={ styles.container }>
        <Text style={styles.text}>¡Estamos confirmando tus datos!</Text>
          <LottieView
            source={require("../../assets/homeQuest-loader.json")}
            style={styles.animation}
            autoPlay
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24
  },
  animation: {
    marginTop: 15,
    width: 100,
    height: 100
  }
});
