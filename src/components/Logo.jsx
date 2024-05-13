import { Link } from "react-router-dom";
import launchTabDark from '../assets/laun1.png';
import launchTabLight from  '../assets/laun.png';
import { useTheme } from '@mui/material/styles';

const Logo = () => {
  const theme = useTheme();
  const logoImage = theme.palette.mode === 'dark' ? launchTabLight : launchTabDark;

  return (
    <div className=''>
      <Link to='/'>
        <img
          src={logoImage}
          alt="Logo"
          className='w-16 h-auto' // Set default size here
        />
      </Link>
    </div>
  );
};

export default Logo;
