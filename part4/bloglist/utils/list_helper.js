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
    let max = 0;
    let count = 0;
    let author = '';
    let bestAuthor = '';
    blogs.forEach(blog => {
        count = 0;
        author = blog.author;
        blogs.forEach(b => {
            if (author === b.author) {
                count++;
            }
            if (count >= max) {
                max = count;
                bestAuthor = blog.author;
            }
        })
    })
    const result = {
        author: bestAuthor,
        blogs: max
    }
    return result;
}

const mostLikes = (blogs) => {
    let number = 0;
    let max = 0;
    let author = '';
    let bestAuthor = '';
    blogs.forEach(blog => {
        number = 0;
        author = blog.author;
        blogs.forEach(b => {
            if (author === b.author) {
                number = number + b.likes;
            }
            if (number >= max) {
                max = number;
                bestAuthor = blog.author;
            }
        })
    })
    const result = {
        author: bestAuthor,
        likes: max
    }
    console.log(result.likes)
    console.log(result.author)
    return result;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}