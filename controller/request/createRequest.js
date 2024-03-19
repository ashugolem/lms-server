const Request = require('../../model/requestModel')

const createRequest = async (req, res) => {
    try {
        const { user, book, status, type  } = req.body // Destructuring
        const oldRequest = await Request.findOne(({user: user, book:book}));

        if(oldRequest){
            res.json({success: false, message: "You already have a request for this book"}).status(200);
        }
        else{
            await Request.create({
               user: user,
               book: book,
               status: status,
               type: type
            })
    
            res.json({ success: true}).status(200)
        }

    } catch (error) {
        res.json({ success: false, message: "Internal Server Error", error: error.message }).status(400)
    }
}

module.exports = createRequest;