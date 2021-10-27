const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let total = 0;
    blogs.forEach(blog => {
        total = total + blog.likes;
    });
    return total;
}

const favoriteBlog = (blogs) => {
    let favorite = 0;
    let result = {};
    blogs.forEach(blog => {
        if (blog.likes >= favorite) {
            favorite = blog.likes;
            result = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
    })
    return result;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}