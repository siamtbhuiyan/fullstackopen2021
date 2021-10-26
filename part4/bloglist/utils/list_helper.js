const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let t = 0;
    blogs.forEach(blog => {
        t = t + blog.likes;
    });
    return t;
}

module.exports = {
    dummy,
    totalLikes
}