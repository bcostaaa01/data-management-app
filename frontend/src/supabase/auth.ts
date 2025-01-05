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
    router.push("/");
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert("Error signing out: " + error.message);
  } else {
    window.location.reload();
    router.push("/signin");    
  }
};

export const checkAuth = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    router.push("/signin");
  }
  return data;
};
