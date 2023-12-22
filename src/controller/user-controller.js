import userService from '../service/user-service.js';

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await userService.getUsers();
    res.status(200).json({
      data: allUsers,
    });
  } catch (e) {
    next(e);
  }
};

const getUsersById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await userService.getUsersById(userId);
    res.status(200).json({
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

const getMe = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await userService.getMe(userId);
    res.status(200).json({
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const request = req.body;
    request.userId = userId;

    const result = await userService.update(request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await userService.deleteUser(userId);
    res.status(200).json({
      data: 'user berhasil dihapus',
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.logout(req.user.userId);
    res.status(200).json({
      data: 'OK',
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  update,
  getUsersById,
  logout,
  getUsers,
  deleteUser,
  getMe,
};
