import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  return res.render("join", { pageName: "Join" });
};
export const postJoin = async (req, res) => {
  const pageName = "Join";
  const { name, username, password, password2, email, location } = req.body;
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (password !== password2) {
    return res.status(400).render("join", {
      pageName,
      errorMessage: "Password Confrimation does not match",
    });
  }
  if (exists) {
    return res.status(400).render("join", {
      pageName,
      errorMessage: "This username/email is already taken!",
    });
  }
  try {
    await User.create({
      name,
      username,
      password,
      email,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageName,
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) => {
  res.render("login", { pageName: "Login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageName = "Login";
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageName,
      errorMessage: "An account with this username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageName,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  console.log("LOG USER IN! COMING SOON!");
  return res.redirect("/");
};

export const getProfile = (req, res) => {
  res.send("User Profile");
};
export const getEditUser = (req, res) => {
  res.send("edit profile");
};
export const getDelUser = (req, res) => {
  res.send("delete users profile");
};
export const getLogout = (req, res) => {
  res.send("Log Out");
};
