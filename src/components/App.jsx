import {Component} from 'react'
import getImage from 'request-api/request-api';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchForm from './Form/SearchForm';
import Searchbar from './Searchbar/Searchbar';
import AppStyled from './App.styled';

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
      if (prevState.query !== this.state.query || 
        prevState.page !== this.state.page){

        return this.update();
      }
    }
    async update(){
      this.setState({loading:true});
      try {
      await getImage(this.state.query,this.state.page).then(res=>{
        if (!res.data.hits.length){
          return console.log(
            'There is no images with this request. Please, try again'
      );
      }
       this.setState(prevState => {
        return{
          gallery: [...prevState.gallery, ...res.data.hits],
            total: res.data.totalHits,
          };
       });
      }); 
      } catch (error){
        console.log('Error');
      } finally{
        this.setState({loading:false})
      } 
    }

    handleSubmit = query => {
      if (query.trim().length === 0) {
            return;
          }
        this.setState({
          gallery: [],
          page: 1,
          total: null,
          imageURL: null,
        });
    
        handleLoadMoreBtn = () => {
          this.setState(prevState => {
            return { page: prevState.page + 1 };
          })
            };
            
          
  // componentDidUpdate(_, prevState) {
  //   if (prevState.query !== this.state.query) {
  //     this.setState({ loading: false });
  //   }
  // }

  // handleSubmit = query => {
  //   if (query.trim().length === 0) {
  //     return;
  //   }

  //   this.setState({ query, loading: true });

  //   getImage(query, this.state.page).then(data =>
  //     this.setState({
  //       gallery: [...data.hits],
  //       total: data.totalHits,
  //     })
  //   );
  // };

  // handleLoadMoreBtn = async () => {
  //   await this.setState(prevState => {
  //     return { page: prevState.page + 1, loading: true };
  //   });
  //   getImage(this.state.query, this.state.page).then(data =>
  //     this.setState(prevState => {
  //       return { gallery: [...prevState.gallery, ...data.hits] };
  //     })
  //   );
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