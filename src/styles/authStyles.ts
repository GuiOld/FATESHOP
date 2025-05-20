import { StyleSheet } from "react-native";

export default StyleSheet.create({
    screen: {
        flex: 1
    },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#202135",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f1e8e6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    color: "#000",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#686fb4",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  link: {
    color: "#bdbdbd",
    textAlign: "right",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  registerText: {
    color: "#ffffff",
    textAlign: "center",
  },
  registerLink: {
    color: "#ffffff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});