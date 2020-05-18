import react from 'react';
import { render } from '@testing-library/react';
import VideoAssessment from '../components/Quiz/VideoAssessment';

test('renders VideoAssessment without crashing', () => {
    render(<VideoAssessment />)
});