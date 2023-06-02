const success = (res, message) => {
    res.status(200).send(message);
}

const created = (res, message) => {
    res.status(201).send(message);
}

const requestError = (res, message) => {
    res.status(400).send(message);
}

const notFound = (res, message) => {
    res.status(404).send(message);
}

const serverError = (res, message) => {
    res.status(500).send(message);
}

module.exports = { success, created, requestError, notFound, serverError }
