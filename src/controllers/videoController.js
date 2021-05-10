let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "5 minutes ago",
    views: 902,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "5 minutes ago",
    views: 92,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "5 minutes ago",
    views: 92,
    id: 3,
  },
];
export const getHome = (req, res) => {
  return res.render("home", { pageName: "Home", videos });
};
export const getWatch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageName: `Watching ${video.title}`, video });
};
export const getEditVideo = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageName: `Editing ${video.title}`, video });
};
export const postEditVideo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/video/${id}`);
};
