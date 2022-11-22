import ImageGalleryStyled from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({galleryList, onClick, imageURL})=> (
    <>
    <ImageGalleryStyled>
        <ImageGalleryItem galleryList ={galleryList} onClick={onClick} imageUrl={imageURL}/>
    </ImageGalleryStyled>
    </>
);
export default ImageGallery ;