const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }
]
  
  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

const dummy = (blogs) => {
    console.log(typeof blogs)
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
    return result;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    blogs,
    listWithOneBlog
}