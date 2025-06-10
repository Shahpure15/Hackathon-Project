import React, { useState, useRef, useEffect } from 'react';
import JobCard from './Jobcard';
import '../styles/jobswiper.css';

const JobSwiper = ({ jobs, onSwipeLeft, onSwipeRight }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragPosition, setDragPosition] = useState(null);
  const [bgColor, setBgColor] = useState('#f8f9fa');
  const cardRef = useRef();

  const handleDragStart = (e) => {
    const startX = e.clientX || e.touches[0].clientX;
    const startY = e.clientY || e.touches[0].clientY;
    
    const handleDragMove = (e) => {
      const currentX = (e.clientX || e.touches[0].clientX) - startX;
      const currentY = (e.clientY || e.touches[0].clientY) - startY;
      setDragPosition({ x: currentX, y: currentY });
      
      // Change background color based on direction
      if (currentX > 50) {
        setBgColor('#e6f7ee'); // Light green for right swipe
      } else if (currentX < -50) {
        setBgColor('#ffebee'); // Light red for left swipe
      } else {
        setBgColor('#f8f9fa');
      }
    };

    const handleDragEnd = (e) => {
      const endX = (e.clientX || e.changedTouches[0].clientX) - startX;
      
      if (endX > 120) {
        // Swiped right
        onSwipeRight(jobs[currentIndex]);
        animateSwipe('right');
      } else if (endX < -120) {
        // Swiped left
        onSwipeLeft(jobs[currentIndex]);
        animateSwipe('left');
      } else {
        // Return to center
        setDragPosition(null);
        setBgColor('#f8f9fa');
      }
      
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    document.addEventListener('touchend', handleDragEnd);
  };

  const animateSwipe = (direction) => {
    setDragPosition({
      x: direction === 'right' ? 500 : -500,
      y: 0
    });
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setDragPosition(null);
      setBgColor('#f8f9fa');
    }, 300);
  };

  const handleButtonSwipe = (direction) => {
    if (direction === 'right') {
      onSwipeRight(jobs[currentIndex]);
    } else {
      onSwipeLeft(jobs[currentIndex]);
    }
    animateSwipe(direction);
  };

  return (
    <div className="job-swiper-container" style={{ backgroundColor: bgColor }}>
      {currentIndex < jobs.length ? (
        <>
          <div 
            className="job-card-wrapper"
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            ref={cardRef}
          >
            <JobCard 
              job={jobs[currentIndex]} 
              dragPosition={dragPosition}
            />
          </div>
          
          <div className="swipe-buttons">
            <button 
              className="reject-button"
              onClick={() => handleButtonSwipe('left')}
            >
              ✖ Reject
            </button>
            <button 
              className="accept-button"
              onClick={() => handleButtonSwipe('right')}
            >
              ✓ Accept
            </button>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <h2>No more jobs to show</h2>
          <p>Check back later for new opportunities!</p>
        </div>
      )}
    </div>
  );
};

export default JobSwiper;