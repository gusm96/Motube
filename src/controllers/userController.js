import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getJoin = (req, res) => {
  return res.render("global/join", { pageName: "Join" });
};
export const postJoin = async (req, res) => {
  const pageName = "Join";
  const { name, username, password, password2, email, location } = req.body;
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (password !== password2) {
    return res.status(400).render("global/join", {
      pageName,
      errorMessage: "Password Confrimation does not match",
    });
  }
  if (exists) {
    return res.status(400).render("global/join", {
      pageName,
      errorMessage: "This username/email is already taken!",
    });
  }
  try {
    await User.create({
      name,
      username,
      password,
      email,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("global/join", {
      pageName,
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) => {
  res.render("global/login", { pageName: "Login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageName = "Login";
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.status(400).render("global/login", {
      pageName,
      errorMessage: "An account with this username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("global/login", {
      pageName,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  console.log("LOG USER IN! COMING SOON!");
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = `https://github.com/login/oauth/authorize`;
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      // set notification
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name,
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const getEditProfile = (req, res) => {
  res.render("users/edit-profile", { pageName: "Edit Profile" });
};
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email, username, location },
    session: {
      user: { _id, avatarUrl },
    },
    file,
  } = req;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect("/user/edit");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageName: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageName: "Change Password",
      errorMessage: "❌ The current password is incorrect",
    });
  }
  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("users/change-password", {
      pageName: "Change Password",
      errorMessage: "❌ The new password does not match Confirmation password",
    });
  }

  user.password = newPassword;
  await user.save();
  return res.redirect("/user/logout");
};

export const getProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");
  if (!user) {
    return res
      .status(404)
      .render("global/404", { pageName: "User not found." });
  }
  res.render("users/profile", { pageName: user.name, user });
};

export const getDelUser = (req, res) => {
  res.send("delete users profile");
};
export const getLogout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
