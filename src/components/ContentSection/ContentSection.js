import './ContentSection.scss';

const ContentSection = ({ genres, header, choiceList, setGenreChoice, secondChoice, setSecondChoice }) => {
    const selectGenre = (genre) => {
        setGenreChoice(genre.id);

    }
    return <section className='content-section'>
        <article className='content-header'>
            <h3>{header}</h3>
        </article>
        <article className='content-box'>
            {genres.map(genre => {
                return <label key={genre.id}
                className='content-box__item'>
                    <input 
                        type="radio" 
                        name={choiceList}
                        value={genre.genre_name} 
                        onClick={() => selectGenre(genre)}
                    />{genre.genre_name}
                </label>
            })}
        </article>
    </section>
}

export default ContentSection;