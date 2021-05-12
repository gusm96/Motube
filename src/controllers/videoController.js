import Video from "../models/Video";

export const getHome = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageName: "Home", videos });
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
export const postUpload = async (req, res) => {
  const { title, description, hashtag } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtag: hashtag.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageName: "Uplaod Video",
      errorMessage: error._message,
    });
  }
};
