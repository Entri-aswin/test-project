export const genericErrorHandle = async (error, req, res) => {
  let status = error.status || 400;

  res.status(status).json({
    message: error.message,
  });
};
