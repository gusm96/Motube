export const getSee = (req, res) => {
  res.render("watch", { pageName: "Videos" });
};
export const getupload = (req, res) => {
  res.send("upload videos");
};
export const getEditVideo = (req, res) => {
  res.send("edit Video");
};
export const getDelVideo = (req, res) => {
  res.send("delete vidoe");
};
