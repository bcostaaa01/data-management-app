import supabase from "./config";

export const signUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
      emailRedirectTo: "http://localhost:5173/",
    },
  });

  return error;
};

export const signIn = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: "http://localhost:5173/",
    },
  });

  return error;
};

export const signOut = async (router: any) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return error;
  } else {
    window.location.reload();
    router.push("/oauth");
  }
};

export const checkAuth = async (router: any) => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data) {
    router.push("/oauth");
    return false;
  }
  return true;
};
