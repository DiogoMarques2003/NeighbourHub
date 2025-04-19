import { useCallback, useEffect, useRef, useState } from 'react';


const ScrollableList = ({ items, renderItem, setPageNumber, hasMore}) => {

    const observer = useRef();

    const lastElementRef = useCallback((node) => {
        
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });
        
        if (node) observer.current.observe(node);
    }, [items]);





    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
            {items.map((item, index) => (
                <div key={item?.id || index} ref={items.length === index + 1 ? lastElementRef : null}>

                    {renderItem(item)}
                </div>
            ))}

            
            {/* <button 
                className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-10"
                onClick={() => onCreateCommonArea()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button> */}


        </div>
    )
};

export default ScrollableList;