import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useMediaPredicate } from 'react-media-hook';
import './css/main.css';
function Banner() {
  //   const isDesktopOrLaptop = useMediaQuery({
  //     query: '(min-width: 1224px)',
  //   });
  //   const isMobile = useMediaQuery({ query: '(max-width: 425px)' });
  const isDesktopOrLaptop = useMediaPredicate('(min-width: 1224px)');
  const isMobile = useMediaPredicate('(max-width: 425px)');
  return (
    <>
      {isDesktopOrLaptop && (
        <svg className='something' width={'1000px'} height={'200px'}>
          <text x='50%' y='50%' className='logo__text'>
            Hello, it's CrazzyAmy.
          </text>
        </svg>
      )}
      {isMobile && (
        <>
          <svg className='something' width={'400px'} height={'200px'}>
            <text x='50%' y='50%' className='logo__text'>
              Hello,
            </text>
          </svg>
          <svg className='something' width={'400px'} height={'200px'}>
            <text x='50%' y='50%' className='logo__text'>
              it's
            </text>
          </svg>
          <svg className='something' width={'400px'} height={'200px'}>
            <text x='50%' y='50%' className='logo__text'>
              CrazzyAmy.
            </text>
          </svg>
        </>
      )}
    </>
  );
}
export default Banner;
