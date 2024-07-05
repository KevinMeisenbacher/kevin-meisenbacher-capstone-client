import './ContentSection.scss';

const ContentSection = ({ genres, header, genreChoice, setGenreChoice }) => {
    const selectGenre = (genre) => {
        setGenreChoice(genre);
    }
    return <section className='content-section'>
        <article className='content-header'>
            <h3>{header}</h3>
        </article>
        <article className='content-box'>
            {genres.map(genre => {
                return <>
                    <label className='content-box__item'>
                        <input 
                            type="radio" 
                            name='genre-choice'
                            key={genre.id}
                            value={genre.genre_name} 
                            onClick={() => selectGenre(genre)}
                        />{genre.genre_name}
                    </label>
                </>
            })}
        </article>
    </section>
}

export default ContentSection;