import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';
import { RootState } from '../store';

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const isDarkMode = mode === 'dark';

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <FormGroup>
            <FormControlLabel
                control={<Switch checked={isDarkMode} onChange={handleToggle} />}
                label="Dark Mode"
            />
        </FormGroup>
    );
};

export default ThemeToggle;