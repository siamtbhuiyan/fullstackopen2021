const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listHelper.blogs)
    expect(result).toBe(36)
  })
});

describe('favorite blog', () => {
  test('of one blog is that blog', () => {
    const result = listHelper.favoriteBlog(listHelper.listWithOneBlog)
    expect(result.likes).toEqual(5)
  })
  test('of many blogs is the one with the most likes', () => {
    const result = listHelper.favoriteBlog(listHelper.blogs)
    expect(result.likes).toEqual(12)
  })
})

describe('most blogs', () => {
  test('in a list of blogs', () => {
    const result = listHelper.mostBlogs(listHelper.blogs);
    expect(result.blogs).toBe(3);
    expect(result.author).toBe('Robert C. Martin')
  })
  test('when the list has only one blog', () => {
    const result = listHelper.mostBlogs(listHelper.listWithOneBlog)
    expect(result.blogs).toBe(1);
    expect(result.author).toBe('Edsger W. Dijkstra');

  })
})
describe('most likes', () => {
  test('in a list of blogs', () => {
    const result = listHelper.mostLikes(listHelper.blogs);
    expect(result.likes).toBe(17);
    expect(result.author).toBe('Edsger W. Dijkstra')
  })
  test('when the list has only one blog', () => {
    const result = listHelper.mostLikes(listHelper.listWithOneBlog)
    expect(result.likes).toBe(5);
    expect(result.author).toBe('Edsger W. Dijkstra');
  })
})