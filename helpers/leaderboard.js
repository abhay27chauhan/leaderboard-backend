const Leaderboard = require("../resources/leaderboard/leaderboard.model");
const User = require("../resources/user/user.model");

const getData = async (pageNumber = 1, currentUser, pageSize = 10) => {
  const skip = pageSize * (pageNumber - 1);
  const leaderboard = await Leaderboard.find()
    .sort({ points: -1 })
    .skip(skip)
    .limit(pageSize)
    .lean();

  let currentUserObject;
  if (currentUser) {
    const userDataPromise = User.findOne({ id: currentUser }).lean().exec();
    const pointsDataPromise = Leaderboard.findOne({ userId: currentUser })
      .lean()
      .exec();
    const [userData, pointsData] = await Promise.all([
      userDataPromise,
      pointsDataPromise,
    ]);
    const aheadOfCurrentUser = await Leaderboard.find({
      points: { $gt: pointsData.points },
    }).distinct("points");
    const rank = aheadOfCurrentUser.length + 1;
    currentUserObject = {
      rank,
      name: userData.name,
      points: pointsData.points,
    };
  }

  const userFetchPromise = leaderboard.map((entry) =>
    User.findOne({ id: entry.userId }).lean().exec()
  );
  const howManyAheadPromise = Leaderboard.find({
    points: { $gt: leaderboard[0].points },
  }).distinct("points");
  const response = await Promise.all([
    ...userFetchPromise,
    howManyAheadPromise,
  ]);

  const howManyAhead = response.splice(response.length - 1, 1);
  const users = response;

  const rankOfFirstUser = howManyAhead[0].length + 1;
  const refPoints = leaderboard[0].points;

  const data = leaderboard.map((entry, i) => {
    if (entry.points < refPoints) {
      rankOfFirstUser++;
      refPoints = entry.points;
    }
    if (entry.userId == users[i].id) {
      return {
        rank: rankOfFirstUser,
        name: users[i].name,
        points: entry.points,
      };
    }
    const user = users.find((user) => user.id == entry.userId);
    return {
      rank: rankOfFirstUser,
      name: user.name,
      points: entry.points,
    };
  });
  return {
    data,
    currentUserObject,
    pageNumber,
    pageSize,
    total: 1000000,
  };
};

const updatePoints = async (userId, points) => {
  await Leaderboard.findOneAndUpdate(
    { userId: userId },
    {
      $set: {
        points: points,
      },
    },
    { new: true, omitUndefined: true }
  );
};

module.exports = {
  getData,
  updatePoints,
};
