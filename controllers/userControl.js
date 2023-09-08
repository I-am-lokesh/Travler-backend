import { User } from "../models/user.js";
import { sendCookie } from "../utils/cookies.js";
import bcrypt from "bcrypt";
import { Destination } from "../models/destination.js";

//REGISTER START
export const register = async (req, res) => {
  const { name, email, password, DOB, gender, nationality } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    const HashedPassword = await bcrypt.hash(password, 10);

    const CreatedUser = await User.create({
      name,
      email,
      password: HashedPassword,
      DOB: DOB,
      gender: gender,
      nationality: nationality,
    });

    sendCookie(CreatedUser, res, "User Created Successfully", 201);
  } catch (error) {
    console.log(error);
  }
};
//REGISTER START

//LOGIN START

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  sendCookie(user, res, `welcome back ${user.name}`, 200);
};
 
//LOGIN END

//LOGOUT START

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("userToken", null, {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Your session has ended",
    });
};

//LOGOUT END

//LIKE DESTINATION START

export const likeOrUnlike = async (req, res) => {
  const { destination_id } = req.body;
  
  const destination = await Destination.findById(destination_id);
  
  if (!destination) {
    return res.status(404).json({
      success: false,
      message: "Destination not found",
    });
  }
  const user = await User.findById(req.user._id);
   
  if (user.likes.includes(destination_id)) {
    user.likes.pull(destination_id);
    destination.no_of_likes = destination.no_of_likes - 1;
    await user.save();
    await destination.save();
    return res.status(200).json({
      success: true,
      message: "Destination unliked successfully",
    });
  }

  user.likes.push(destination_id);
  destination.no_of_likes = destination.no_of_likes + 1;
  await user.save();
  await destination.save();

  res.status(200).json({
    success: true,
    message: "Destination liked successfully",
  });
};
//LIKE DESTINATION END

//GET USER DETAILS START

export const userDetails = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

//GET USER DETAILS END

//GET USER LIKES START

export const getLikes = (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user.likes,
  });
};

//GET USER LIKES END

//UPDATE USER DETAILS START

export const updateUser = async (req, res) => {
  const { name, email, gender, DOB, password } = req.body;

  try {
    const id = req.user._id;

    const user = await User.findById(id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (gender) {
      user.gender = gender;
    }
    if (DOB) {
      user.DOB = DOB;
    }
    if (password) {
      const HashedPassword = await bcrypt.hash(password, 10);
      user.password = HashedPassword;
    }

    await user.save();

    sendCookie(user, res, "User Updated Successfully", 200);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//UPDATE USER DETAILS END
