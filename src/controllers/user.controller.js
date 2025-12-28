import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const regsiterUser = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, username, password } = req.body;

    console.log("Received data:", { fullName, email, username });

    if ([fullName, email, username, password].some(
      (field) => !field || field.trim() === ""
    )) {
      throw new ApiError(400, "All fields compulsory");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
      throw new ApiError(409, "User already exists");
    }

    // Avatar path
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    console.log("Avatar local path:", avatarLocalPath);
    console.log("Cover image local path:", coverImageLocalPath);

    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file required");
    }

    let avatar, coverImage;
    try {
      avatar = await uploadOnCloudinary(avatarLocalPath);
      console.log("Avatar upload result:", avatar);
    } catch (err) {
      console.error("Cloudinary avatar upload error:", err);
      throw new ApiError(500, "Avatar upload failed");
    }

    if (!avatar) {
      throw new ApiError(500, "Avatar upload failed");
    }

    // Cover image is optional
    if (coverImageLocalPath) {
      try {
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
        console.log("Cover image upload result:", coverImage);
      } catch (err) {
        console.error("Cloudinary cover image upload error:", err);
      }
    }

    const user = await User.create({
      fullName,
      email,
      username: username.toLowerCase(),
      password,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered Successfully")
    );

  } catch (err) {
    console.error("Registration error:", err);
    throw err; // Let asyncHandler handle the response
  }
});

export { regsiterUser };
