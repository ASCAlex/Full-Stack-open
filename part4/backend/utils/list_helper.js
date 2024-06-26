const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikedBlog = blogs.reduce((prev, current) => {
        return (prev && prev.likes > current.likes) ? prev : current
    }, { likes: -1 })

    return blogs.length === 0
        ? 0
        : {
            title: mostLikedBlog.title,
            author: mostLikedBlog.author,
            likes: mostLikedBlog.likes
        }
}

const mostBlogs = (blogs) => {
    let authors = {}

    blogs.forEach(blog => {
        if (blog.author in authors) {
            authors[blog.author]++
        } else {
            authors[blog.author] = 1
        }
    })

    let maxAuthor
    let maxAuthorBlogs = -1

    for (const author in authors) {
        if (authors[author] > maxAuthorBlogs) {
            maxAuthor = author
            maxAuthorBlogs = authors[author]
        }
    }

    return blogs.length === 0 ? 0 : {
        author: maxAuthor,
        blogs: maxAuthorBlogs
    }
}

const mostLikes = (blogs) => {
    let authors = {}

    blogs.forEach(blog => {
        if (blog.author in authors) {
            authors[blog.author] += blog.likes
        } else {
            authors[blog.author] = blog.likes
        }
    })

    let maxAuthor
    let maxAuthorLikes = -1

    for (const author in authors) {
        if (authors[author] > maxAuthorLikes) {
            maxAuthor = author
            maxAuthorLikes = authors[author]
        }
    }

    return blogs.length === 0 ? 0 : {
        author: maxAuthor,
        likes: maxAuthorLikes
    }
}

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }
]

const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, listWithOneBlog, blogs
}