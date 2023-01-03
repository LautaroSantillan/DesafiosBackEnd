const logger = require("../utils/logger")

const getProductsTest = async (req,res) =>{
    try {
        logger.info('GET /productos-test')
        res.render('productos-test')
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        logger.error(error)
    }
}

module.exports = getProductsTest