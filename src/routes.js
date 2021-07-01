// Global Router
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const SEARCH = "/search";

// Users Router
const PROFILE_USER = "/:id([0-9a-f]{24})";
const EDIT_USER = "/edit";
const CHANGE_PASSWORD = "/change-password";
const DELETE_USER = "/delete";
const LOGOUT = "/logout";
const GITHUB_START = "/github/start";
const GITHUB_FINISH = "/github/finish";
// User Edit 과 Delete 는 Login 했을 때만 가능하도록.

// Videos Router
const UPLOAD_VIDEO = "/upload";
const WATCH_VIDEO = "/:id([0-9a-f]{24})";
const EDIT_VIDEO = "/:id([0-9a-f]{24})/edit";
const DELETE_VIDEO = "/:id([0-9a-f]{24})/delete";
const DELETE_COMMENT = "/comment/delete";

// API Router
const VIEWS = "/video/:id([0-9a-f]{24})/views";
const COMMENT = "/video/:id([0-9a-f]{24})/comment";
const DELETECM = "/video/:id([0-9a-f]{24})/comment/:id([0-9a-f]{24})/delete";
const routes = {
  // global
  home: HOME,
  join: JOIN,
  login: LOGIN,
  search: SEARCH,
  // user
  userProfile: PROFILE_USER,
  editUser: EDIT_USER,
  changePassword: CHANGE_PASSWORD,
  deleteUser: DELETE_USER,
  logout: LOGOUT,
  githubStart: GITHUB_START,
  githubFinish: GITHUB_FINISH,
  // video
  watchVideo: WATCH_VIDEO,
  uploadVideo: UPLOAD_VIDEO,
  editVideo: EDIT_VIDEO,
  deleteVideo: DELETE_VIDEO,
  comment: COMMENT,
  deleteComment: DELETE_COMMENT,
  // api
  views: VIEWS,
  comments: COMMENT,
  deleteCm: DELETECM,
};

export default routes;
