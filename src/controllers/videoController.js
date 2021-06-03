import User from "../models/User";
import Video from "../models/Video";

export const getHome = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  return res.render("global/home", { pageName: "Home", videos });
};
export const getWatch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");

  if (!video) {
    return res.render("global/404", { pageName: "Video not found" });
  } else {
    return res.render("videos/watch", { pageName: video.title, video });
  }
};

export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res
      .status(404)
      .render("global/404", { pageName: "Video not found" });
  }
  return res.render("videos/edit", { pageName: `Edit: ${video.title}`, video });
};

export const postEditVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res
      .status(404)
      .render("global/404", { pageName: "Video not found" });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/video/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageName: "Upload Vidoe" });
};
export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
      fileUrl,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("videos/upload", {
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

export const getSearch = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`^${keyword}`, "i"),
      },
    });
  }
  return res.render("global/search", { pageName: "Search", videos });
};
