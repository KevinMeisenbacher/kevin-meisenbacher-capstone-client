import './HomePage.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [selected, setSelected] = useState(false);

    const handleChoice = (choice) => {
        setSelected(choice);
    }

    return <main className='form-start'>
    <article className='form-start__container'>
        <h2>Welcome to Music Buddy! What brings you here?</h2>
        <section className='choices'>
            <div 
            className={`choices__box${selected === 'a' ? ' choices__box--selected' : ''}`} 
            onClick={() => handleChoice('a')}selected={selected === 'a'}>
                <h3>Looking for new genres</h3>
            </div>
            <div 
            className={`choices__box${selected === 'b' ? ' choices__box--selected' : ''}`} 
            onClick={() => handleChoice('b')}selected={selected === 'b'}>
                <h3>Further exploring what I like</h3>
            </div>
        </section>
    </article>
    <Link to='/selection'>
        <button className={
            selected === false ? `hidden` : `butt-confirm`
        }>Confirm</button>
    </Link>
</main>
}

export default HomePage;