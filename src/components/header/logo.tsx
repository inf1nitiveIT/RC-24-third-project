import { Link } from 'react-router-dom';


function Logo() {
  return(
    <Link to={'/'}>
      <p className='text-black font-bold text-2xl hover:text-blue-500 transition'>D. Weather</p>
    </Link>
  );
}

export default Logo;
