import { Link } from 'react-router-dom';
import ContentSection from '../../components/ContentSection/ContentSection';
import './SelectionPage.scss';

const SelectionPage = ({ selected }) => {
    const genres = [
        'classical',
        'country',
        'blues',
        'metal',
        'jazz',
        'rock',
        'funk',
        'punk',
        'pop',
        'rap',
        'edm'
    ]
    return <main>
        <div className='content'>
            {/* TODO: Make the second section only
            show up when the "looking for new genres"
            box is clicked, give it a different header,
            and give it a different link */}
            <ContentSection genres={genres} />
            <ContentSection genres={genres} />
        </div>
        <Link to='/results'>
            <button className='butt-next'>next</button>
        </Link>
    </main>
}

export default SelectionPage;