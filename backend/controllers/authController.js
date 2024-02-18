const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
    const {email} = req.body;
    const userExist = await User.findOne({email});
    if(userExist){
        return next(new ErrorResponse("E-mail already registred", 400));
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            succes: true,
            user
        })
    } catch (error) {
        next(error);
    }
}

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //validation
        if(!email){
            return next(new ErrorResponse("please add an email", 403));
        }
        if(!password){
            return next(new ErrorResponse("please add an password", 403));
        }

        //check user email
        const user = await User.findOne({email});
        if(!user){
            return next(new ErrorResponse("invalid credentials", 400));
        }
        //check user password
        const isMatched = await user.comparePassword(password);
        if(!isMatched){
            return next(new ErrorResponse("invalid password", 400));
        }

        sendTokenResponse(user, 200, res);

    } catch (error) {
        next(error);
    }
}

exports.auth = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
      if (!token) {
          return res.status(403).send({
              message: "No token provided!",
          });
      }
  
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
              return res.status(401).send({
                  message: "Unauthorized!",
              });
          }
          res.status(200).send(decoded);
          
          next();
      });
  }

const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res.status(codeStatus).json({
        success: true,
        accessToken: token,
    });
};

//highscore
exports.highscore = (req, res) => {
	let token = req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send({
			message: "No token provided!",
		});
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!",
			});
		}

		User.find({}, "score firstname lastname")
			.then((data) => {
				console.log(data);
				res.status(200).send(data);
			})
			.catch((err) => {
				res.status(500).send({ message: "Internal Error", err });
			});
	});
};

//user profile
exports.userProfile = async (req, res, next) => {

    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
        succes: true,
        user
    })
}