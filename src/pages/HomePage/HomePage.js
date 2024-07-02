import FormStart from '../../components/FormStart/FormStart';
import './HomePage.scss';
import { useState } from 'react';

const HomePage = () => {
    const [selected, setSelected] = useState(false);

    return<>
        <FormStart 
            selected={selected}
            setSelected={setSelected}
        />
    </>
}

export default HomePage;