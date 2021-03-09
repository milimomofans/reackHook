module.exports = (req,res,next) => {
    if (req.method === 'POST' && req.path === '/login') {
        if (req.body.username === '元次二萌萌' && req.body.password === '123456789') {
            return res.status(200).json({
                user:{
                    name:'元次二萌萌',
                    token:'1234'
                }
            })
        } else {
            return res.status(400).json({
                message:'用户名或者密码错误'
            })
        }
    }

    next()
}