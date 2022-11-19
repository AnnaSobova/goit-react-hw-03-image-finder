import ImageGalleryStyled from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGallertItem';

const ImageGallery = ({galleryList, onClick, imageURL})=> (
    <>
    <ImageGalleryStyled>
        <ImageGalleryItem galleryList ={galleryList} onClick={onClick} imageUrl={imageURL}/>
    </ImageGalleryStyled>
    </>
);
export default ImageGallery ;