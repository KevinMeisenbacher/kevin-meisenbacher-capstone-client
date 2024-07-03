import './ContentSection.scss';

const ContentSection = ({ genres }) => {
    return <section className='content-section'>
        <article className='content-header'>
            <h3>What genres are you trying to get into?</h3>
        </article>
        <article className='content-box'>
            {genres.map(genre => {
                console.log(genre);
                return <label className='content-box__item'>
                    <input type="radio" value={genre} />{genre}
                </label>
            })}
        </article>
    </section>
}

export default ContentSection;