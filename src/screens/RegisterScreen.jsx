import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useContext, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { GreenButton } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../context/auth-context/AuthContext";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const RegisterScreen = ({ navigation }) => {
  const { login, authData } = useContext(AuthContext)
  const [secured, setSecured] = useState(true);
  const [securedConfirm, setSecuredConfirm] = useState(true);
  const [formData, setFormData] = useState({});

  const { email, password, confirmPassword } = formData;

  const handleInputChange = (name, value) => {
    setFormData({ 
      ...formData, 
      [name]: value 
    });
  };

  const isEmailValid = (email) => {
    return EMAIL_REGEX.test(email);
  };

  const isPasswordValid = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const isPasswordLengthValid = ( password, confirmPassword ) => {
    return password.length >= 8 && confirmPassword.length >= 8;
  }

  const isFormValid = (form) => {
    const { email, password, confirmPassword } = form;
    return email && password && confirmPassword;
  };

  const handleNext = () => {
    if (!isEmailValid(email)) {
      alert("Ingrese un correo electrónico válido");
      return;
    }

    if (!isPasswordValid(password, confirmPassword)) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if( !isPasswordLengthValid( password, confirmPassword ) ){
      alert('La contraseña debe contener como mínimo 8 caracteres');
      return;
    }

    if (!isFormValid(formData)) {
      alert("Por favor, complete todos los campos antes de continuar");
      return;
    }

    const { confirmPassword: passwordRepeated, ...rest } = formData;
    login(rest);

    navigation.navigate("Register2Screen");
  }

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          style={styles.arrow}
          onPress={() => navigation.goBack()}
        />
        <Image style={styles.logo} source={require("../../assets/logo.png")} />

        <Text style={styles.title}>Ingresá tus datos</Text>

        <View style={[styles.inputs]}>
          <TextInput
            style={[styles.emailInput, styles.textInput]}
            placeholder="Ingresa tu E-mail"
            placeholderTextColor="#979797"
            keyboardType="email-address"
            onChangeText={(e) => handleInputChange("email", e)}
            value={ email }
          />
          <View style={[styles.passwordInput, styles.textInput]}>
            <TextInput
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="#979797"
              secureTextEntry={secured}
              onChangeText={ (e) => handleInputChange("password", e)}
              value={ password }
            />

            <Ionicons
              style={styles.passwordInputIcon}
              name={secured ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="black"
              onPress={() => setSecured((prev) => !prev)}
            />
          </View>

          <View style={[styles.passwordInput, styles.textInput]}>
            <TextInput
              placeholder="Volvé a ingresar tu contraseña"
              placeholderTextColor="#979797"
              secureTextEntry={securedConfirm}
              onChangeText={ (e) => handleInputChange( 'confirmPassword', e ) }
              value={ confirmPassword }
            />
            <Ionicons
              style={styles.passwordInputIcon}
              name={securedConfirm ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="black"
              onPress={ () => setSecuredConfirm((prev) => !prev) }
            />
          </View>
          <Pressable
            style={styles.button}
            onPress={handleNext}
          >
            <GreenButton text={"Siguiente"} />
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  passwordInputIcon: {
    paddingTop: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  arrow: {
    alignSelf: "flex-start",
    marginTop: 38,
    marginLeft: 23,
  },
  logo: {
    marginTop: 38,
  },
  title: {
    marginTop: 36,
    fontWeight: "400",
    fontSize: 16,
  },
  inputs: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  textInput: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: -10,
    width: 328,
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingEnd: 16,
  },
  emailInput: {
    width: 326,
    height: 47,
    backgroundColor: "#D9D9D9",
    paddingLeft: 19,
    borderRadius: 5,
  },
  passwordInput: {
    marginTop: 30,
    backgroundColor: "#D9D9D9",
    paddingLeft: 19,
    borderRadius: 5,
  },
  button: {
    marginTop: 50,
    width: 326,
  },
});
