import './ContentSection.scss';

const ContentSection = ({ genres, header, choiceList, setGenreChoice }) => {
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
                            key={genre.id}
                            type="radio" 
                            name={choiceList}
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