function toUnixPath(path) {
    return path.replaceAll('\\', '/');
}

module.exports = {
    toUnixPath,
}