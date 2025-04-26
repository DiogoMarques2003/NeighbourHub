import { useCallback, useEffect, useRef, useState } from 'react';


const ScrollableList = ({ items, renderItem, setPageNumber, hasMore}) => {

    const observer = useRef();

    const lastElementRef = useCallback((node) => {
        if (!hasMore) return;
        
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        });
        
        if (node) observer.current.observe(node);
    }, [hasMore, setPageNumber]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
            {items.map((item, index) => (
                <div key={item?.id || index} ref={items.length === index + 1 ? lastElementRef : null}>

                    {renderItem(item)}
                </div>
            ))}
        </div>
    )
};

export default ScrollableList;