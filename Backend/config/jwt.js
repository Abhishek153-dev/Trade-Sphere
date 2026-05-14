function getJwtSecret() {
  return process.env.JWT_SECRET || "SECRET_KEY";
}

module.exports = { getJwtSecret };
