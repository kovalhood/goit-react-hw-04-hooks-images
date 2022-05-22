import { useState, useEffect } from 'react';
import Container from 'components/Container';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { fetchImages } from 'services/images-api';
import s from './ImageGallery.module.css';
import { toast } from 'react-toastify';

function ImageGallery({searchQuery, onModalOpen}) {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [totalHits, setTotalHits] = useState(1);
    const [status, setStatus] = useState('idle');
    // eslint-disable-next-line no-unused-vars
    const [imagesPerPage, setImagesPerPage] = useState(12);

    const handleLoadMore = () => {
        setPage(prevState => prevState + 1);
    }

    useEffect(() => {
        if (searchQuery === '') {
            return;
        }
        
        if (query !== searchQuery && page > 1) {
            setImages([]);
            setPage(1);
            setTotalHits(1);
            return;
        }

        setStatus('pending');

        fetchImages(searchQuery, page)
            .then(data => {
                if (data.totalHits > 0) {
                    setTotalHits(data.totalHits);
                    if (page === 1) {
                        setImages(data.hits);
                        setStatus('resolved');
                        return toast.success(`Hooray! We found ${data.totalHits} images of ${searchQuery}.`);
                    }

                    if (page > 1) {
                        setImages(prevState => [...prevState, ...data.hits]);
                        setStatus('resolved');
                    }
                    
                    if (Math.ceil(totalHits / imagesPerPage) === page) {
                        toast.info("We're sorry, but you've reached the end of search results.");
                    }
                }
                
                else {
                    setImages([]);
                    setPage(1);
                    setTotalHits(1);
                    setStatus('rejected');
                    return toast.error("Sorry, there are no images matching your search query. Please try again.");
                }
            });
        
        setQuery(searchQuery);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, page])
        
    if (status === 'pending') {
        return <Container>
            <ul className={s.gallery}>
                <ImageGalleryItem data={images} openModal={onModalOpen} />
            </ul>
            <Loader/>
        </Container>
    }

    if (images.length === totalHits || images.length > totalHits) {
        return <Container>
            <ul className={s.gallery}>
                <ImageGalleryItem data={images} openModal={onModalOpen} />
            </ul>
        </Container>
    }

    if (status === 'resolved') {
        return <Container>
            <ul className={s.gallery}>
                <ImageGalleryItem data={images} openModal={onModalOpen} />
            </ul>
            <Button text={'Load more'} buttonClick={handleLoadMore}/>
        </Container>
    }
}

export default ImageGallery;