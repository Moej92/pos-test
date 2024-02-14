const profile = (req, res) => {
    res.render("pug", { page: "/profile" })
}

module.exports = {
    profile
}