import Logo from './logo';
import SearchBar from './search-bar';

function Header() {
  return (
    <div className='flex justify-between px-10 py-5 text-black text-xl font-semibold bg-white'>
      <Logo />
      <SearchBar />
    </div>
  );
}

export default Header;
