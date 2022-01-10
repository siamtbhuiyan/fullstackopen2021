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

const mostBlogs = (blogs) => {
    let number = 0;
    let max = 0;
    let author = '';
    blogs.forEach(blog => {
        number = 0;
        max = 0;
        author = blog.author;
        blogs.forEach(b => {
            if (author === b.author) {
                number++;
            }
            if (number >= max) {
                max = number;
                author = blog.author;
            }
        })
        
    })
    const result = {
        author: author,
        blogs: max
    }
    return result;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}