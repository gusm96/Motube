export const getHome = (req, res) => {
  const videos = [
    {
      title: "First Video",
      rating: 5,
      comments: 2,
      createdAt: "5 minutes ago",
      views: 92,
      id: 1,
    },
    {
      title: "Second Video",
      rating: 5,
      comments: 2,
      createdAt: "5 minutes ago",
      views: 92,
      id: 1,
    },
    {
      title: "Third Video",
      rating: 5,
      comments: 2,
      createdAt: "5 minutes ago",
      views: 92,
      id: 1,
    },
  ];
  return res.render("home", { pageName: "Home", videos });
};
export const getJoin = (req, res) => {
  res.render("join", { pageName: "Join" });
};
export const getLogin = (req, res) => {
  res.render("login", { pageName: "Login" });
};
export const getSearch = (req, res) => {
  res.send("Search anything else!");
};
