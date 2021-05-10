export const getJoin = (req, res) => {
  res.render("join", { pageName: "Join" });
};
export const getLogin = (req, res) => {
  res.render("login", { pageName: "Login" });
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
