import accountsModel from "~/server/models/accounts.model";

export default eventHandler(async (event) => {
  return accountsModel.find();
});
