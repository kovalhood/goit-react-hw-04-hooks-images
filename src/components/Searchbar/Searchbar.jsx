import { useState } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';

function Searchbar(props) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChange = event => {
        setSearchQuery(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (searchQuery.trim() === '') {
            //Setting searchQuery state '' in case query got spaces
            setSearchQuery('');

            return toast.info("Input your search query");
        }

        props.onSubmit(searchQuery);
        
        setSearchQuery('');
    }

    return <header className={s.searchbar}>
        <form className={s.form} onSubmit={handleSubmit}>
            <input
                className={s.input}
                type="text"
                autoComplete="off"
                name="searchQuery"
                placeholder="Search images and photos"
                value={searchQuery}
                onChange={handleSearchQueryChange}
            />
            
            <button type="submit" className={s.button}>
                <i className="fa fa-search"></i>
            </button>
        </form>
    </header>
}

export default Searchbar;