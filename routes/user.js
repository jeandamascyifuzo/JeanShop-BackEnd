const router = require("express").Router();
const res = require("express/lib/response");
const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

//============START:: UPDATE ===================//
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt
            (
                req.body.password,
                process.env.PASS_SEC
            ).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error)

    }
})
//============END:: UPDATE ===================//

//============START:: DELETE ===================//
router.delete("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("deleted successfully")
})
try {
    
} catch (error) {
    res.status(500).json(error);
    
}
//============END:: DELETE ===================//

//============START:: GET USER ===================//
router.get("/find/:id", verifyTokenAndAdmin, async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;
        res.status(200).json(others);
        
    } catch (error) {
        res.status(500).json(error);
        
    }
})
//============END:: GET USER ===================//

//============START:: GET ALL USER ===================//
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({_id: -1}).limit(1) : await User.find()
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json(error);
        
    }
})
//============END:: GET ALL USER ===================//

//============START:: GET USER STATS ===================//
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });
//============END:: GET USER STATS ===================//


module.exports = router