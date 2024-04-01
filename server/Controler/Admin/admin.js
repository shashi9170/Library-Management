const admin = require("../../models/admin");

const AdminRegisterdata = async (req, res) => {
  const {} = req.body;

  res.json({ message: "Successful" });
};

const GetAdminData = async (req, res) => {
  const id = req.params.id;

  const Admindata = await admin.findById({ _id: id });

  res.json({ user: Admindata });
};

module.exports = {GetAdminData, AdminRegisterdata};
