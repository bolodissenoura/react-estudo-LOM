import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 9,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });

  }

  loadMorePosts = () => {

    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
      posts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      }) : posts;

    return (
      <section className='container'>
        <h1 className='text-header'>Hello ! <br /> This is a small application to study how the incas and astecas did in the past without React Hooks and stuffs like Axios to consume API.. Enjoy !</h1>
        {!!searchValue && (
          <>
            <h1 className='text-header search-h1'>Search value: {searchValue}</h1><br /><br />
          </>
        )}

        <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
        <br /><br /><br />

        <Posts posts={filteredPosts} />
        <div className="button-container">
          {!searchValue && (
            <>
              <Button
                text='Load more...'
                onClick={this.loadMorePosts}
                disabled={noMorePosts}
              />
            </>
          )}
        </div>

      </section>
    );
  }
}


export default Home;
