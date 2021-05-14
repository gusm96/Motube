import Video from "../models/Video";

export const getHome = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageName: "Home", videos });
};
export const getWatch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageName: "Video not found" });
  } else {
    return res.render("watch", { pageName: video.title, video });
  }
};

export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageName: "Video not found" });
  }
  return res.render("edit", { pageName: `Edit: ${video.title}`, video });
};

export const postEditVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageName: "Video not found" });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/video/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", { pageName: "Upload Vidoe" });
};
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageName: "Uplaod Video",
      errorMessage: error._message,
    });
  }
};

export const delVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};
