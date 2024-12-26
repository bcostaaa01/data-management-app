import supabase from "./config";
import { useRouter } from "vue-router";

const router = useRouter();
export const signUp = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    alert("Error signing up: " + error.message);
  } else {
    alert("Successfully signed up!");
  }
};

export const signIn = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: "http://localhost:5173/",
    },
  });

  if (error) {
    alert("Error signing in: " + error.message);
  } else {
    alert("Successfully signed in!");
    router.push("/");
  }
};
