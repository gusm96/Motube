import Comment from "../models/Comment";
import User from "../models/User";
import Video from "../models/Video";

export const getHome = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("global/home", { pageName: "Home", videos });
};
export const getWatch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");
  if (!video) {
    return res.render("global/404", { pageName: "Video not found" });
  } else {
    return res.render("videos/watch", { pageName: video.title, video });
  }
};

export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res
      .status(404)
      .render("global/404", { pageName: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "Not authorized");
    return res.status(403).redirect("/");
  }
  return res.render("videos/edit", { pageName: `Edit: ${video.title}`, video });
};

export const postEditVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res
      .status(404)
      .render("global/404", { pageName: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the the owner of the video.");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash("success", "Changes saved.");
  return res.redirect(`/video/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageName: "Upload Vidoe" });
};
export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;
  const isHeroku = process.env.NODE_ENV === "production";
  try {
    const newVideo = await Video.create({
      title,
      fileUrl: isHeroku ? video[0].location : video[0].path,
      thumbUrl: isHeroku ? thumb[0].location : thumb[0].path,
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
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
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res
      .status(404)
      .render("global/404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
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
    }).populate("owner");
  }
  return res.render("global/search", { pageName: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    params: { id },
    body: { text },
  } = req;
  const users = await User.findById(user._id);
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  await video.save();
  users.comments.push(comment._id);
  await users.save();
  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  const comment = await Comment.findById(id);
  const videoId = comment.video;
  const video = await Video.findById(videoId);
  const currentUser = await User.findById(user._id);
  if (!comment) {
    return res.sendStatus(404);
  } else {
    if (String(user._id) !== String(comment.owner)) {
      return res.sendStatus(400);
    } else {
      video.comments.remove(id);
      video.save();
      currentUser.comments.remove(id);
      currentUser.save();
      await Comment.findByIdAndDelete(id);
      return res.sendStatus(200);
    }
  }
};
