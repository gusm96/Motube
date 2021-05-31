//Global Router
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const SEARCH = "/search";

//Users Router
const PROFILE_USER = "/:id([0-9a-f]{24})";
const EDIT_USER = "/edit";
const DELETE_USER = "/delete";
const LOGOUT = "/logout";
// User Edit 과 Delete 는 Login 했을 때만 가능하도록.

//Videos Router
const UPLOAD_VIDEO = "/upload";
const WATCH_VIDEO = "/:id([0-9a-f]{24})";
const EDIT_VIDEO = "/edit";
const DELETE_VIDEO = "/:id([0-9a-f]{24})/delete";
const COMMENT = "/comment";
const DELETE_COMMENT = "/comment/delete";

const routes = {
  //global
  home: HOME,
  join: JOIN,
  login: LOGIN,
  search: SEARCH,
  //user
  userProfile: PROFILE_USER,
  editUser: EDIT_USER,
  deleteUser: DELETE_USER,
  logout: LOGOUT,
  //video
  watchVideo: WATCH_VIDEO,
  uploadVideo: UPLOAD_VIDEO,
  editVideo: EDIT_VIDEO,
  deleteVideo: DELETE_VIDEO,
  comment: COMMENT,
  deleteComment: DELETE_COMMENT,
};

export default routes;
