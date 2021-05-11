import video from "../models/Video";

export const getHome = (req, res) => {
  return res.render("home", { pageName: "Home" });
};
export const getWatch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageName: "Watching" });
};
export const getEditVideo = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageName: "Editing" });
};
export const postEditVideo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/video/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageName: "Upload Vidoe" });
};
export const postUpload = (req, res) => {
  const { title } = req.body;
  return res.redirect("/");
};
