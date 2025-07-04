import { asyncHandler } from "../utils/asyncHandler.js";
import { userRegistrationValidator } from "../validators/index.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get the data
  const { username, email, password } = req.body;

  console.log(req.body);
  //validate the data
  userRegistrationValidator(req.body);

  //If user is successfully registered send a response to the user
  res
    .status(200)
    .json(new ApiResponse(200, username, "User Registered Successfully"));
});

const verifyUser = asyncHandler(async(req,res)=> {
    //get the data from req.params
    const {token} = req.params

    //validate the data
    userRegistrationValidator(req.params)

})

export { registerUser, verifyUser };
