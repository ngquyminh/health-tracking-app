const crypto = require("crypto");

const generateHashedPwd = (userName, password) => {
  const combinedUserNamePassword = `${userName}${password}`;
  const a = crypto
    .createHash("sha256")
    .update(combinedUserNamePassword)
    .digest("hex");
  console.log(a);
  return a;
};

module.exports = generateHashedPwd;
