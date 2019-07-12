const isEmpty = (value) => value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)

const tryCatch = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next)
}


module.exports = {
    isEmpty,
    tryCatch
}