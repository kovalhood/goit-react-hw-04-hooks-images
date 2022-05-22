import { useState } from 'react';
import Wrapper from "components/Wrapper";
import Section from "components/Section";
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import ScrollToTop from 'react-scroll-up';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './services/styles'

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [src, setSrc] = useState('');
    const [alt, setAlt] = useState('');

    // Catching search query from search bar input field
    const handleSubmit = searchQueryValue => {
        if (searchQuery === searchQueryValue) {
            return toast.info("Input new search query.");
        }

        setSearchQuery(searchQueryValue);
    }

    // Logic for modal window open|close
    const toggleModal = data => {
        setShowModal(prevState => !prevState);

        if (showModal === false) {
            const { largeImageURL, tags } = data;
            
            setSrc(largeImageURL);
            setAlt(tags);
        }
    }

    return (
        <Wrapper>
            <Searchbar onSubmit={handleSubmit} />

            <Section>
                <ImageGallery searchQuery={searchQuery} onModalOpen={toggleModal}/>
            </Section>
            
            {showModal && <Modal onModalClose={toggleModal}>
                <img src={src} alt={alt} style={ styles.modalImage} />
            </Modal>}
            
            {/* Notifications */}
            <ToastContainer autoClose={3000} theme="colored" />

            {/* Scroll to top button */}
            <ScrollToTop showUnder={100} style={styles.upButton}>
                <i className="fa fa-arrow-up" aria-hidden="true"></i>
            </ScrollToTop>
        </Wrapper>
    )
}

export default App;