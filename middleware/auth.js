module.exports = (req, res, next) => {
  const apiKey =
    req.headers["x-api-key"] ||
    req.query.apiKey ||
    req.body.apiKey;

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or Missing API Key",
    });
  }

  next();
};
