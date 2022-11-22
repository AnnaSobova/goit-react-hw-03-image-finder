import {Component} from 'react'
import getImage from 'request-api/request-api';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchForm from './Form/SearchForm';
import Searchbar from './Searchbar/Searchbar';
import AppStyled from './Form/App.styled';

export class App extends Component {
  state = {
    gallery: [],
    page: 1,
    query: '',
    total: null,
    loading: false,
    imageURL: null,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.gallery !== this.state.gallery) {
      this.setState({ loading: false });
    }
  }

  handleSubmit = query => {
    if (query.trim().length === 0) {
      return;
    }

    this.setState({ query, loading: true });

    getImage(query, this.state.page).then(data =>
      this.setState({
        gallery: [...data.hits],
        total: data.totalHits,
      })
    );
  };

  handleLoadMoreBtn = async () => {
    await this.setState(prevState => {
      return { page: prevState.page + 1, loading: true };
    });
    getImage(this.state.query, this.state.page).then(data =>
      this.setState(prevState => {
        return { gallery: [...prevState.gallery, ...data.hits] };
      })
    );
  };

  onClickGalleryImage = imageURL => {
    this.setState({ imageURL });
  };

  render() {
    const { gallery, imageURL, total } = this.state;

    return (
      <AppStyled>
        <Searchbar>
          <SearchForm onSubmit={this.handleSubmit} />
        </Searchbar>
        {gallery.length > 0 && (
          <>
            <ImageGallery
              galleryList={gallery}
              onClick={this.onClickGalleryImage}
              imageURL={imageURL}
            />
            {total !== gallery.length && (
              <Button text="Load more" onClick={this.handleLoadMoreBtn} />
            )}
          </>
        )}
        {this.state.loading && <Loader />}
      </AppStyled>
    );
  }
}