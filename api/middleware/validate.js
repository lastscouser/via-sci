export const validate = (schema) => (req, res, next) => {
  const data = req.method === "GET" ? req.params : req.body;
  const { error } = schema.validate(data);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
