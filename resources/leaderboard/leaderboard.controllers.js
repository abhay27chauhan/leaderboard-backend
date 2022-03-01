// const { setToRedis } = require("../../helpers/cached");
const { getData, updatePoints } = require("../../helpers/leaderboard");

const getDataPagewise = async (req, res) => {
  try {
    const pageNumber = req.query.pageNumber
      ? Number(req.query.pageNumber)
      : undefined;
    const currentUser = req.query.currentUser
      ? req.query.currentUser
      : undefined;

    const data = await getData(pageNumber, currentUser);
    const key = currentUser ? `${currentUser}_${pageNumber}` : pageNumber;
    // setToRedis(key, data)
    res.status(200).json({ success: true, ...data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

const updateUserPoints = async (req, res) => {
  try {
    const { userId, points } = req.body;
    await updatePoints(userId, points);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getDataPagewise,
  updateUserPoints,
};
