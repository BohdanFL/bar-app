import { useState, useCallback } from 'react';
import useBarStore from '../state';

const useBoundedIndex = (min = 0, initialMax = 0, initialIndex = 0) => {
    const [index, setIndex] = useState(initialIndex);
    const [max, setMax] = useState(initialMax);
    const { setGuestCurrentOrderIndex } = useBarStore();

    const next = useCallback(() => {
        setIndex((prev) => {
            const index = Math.min(prev + 1, max);
            setGuestCurrentOrderIndex(index);
            return index;
        });
    }, [max]);

    const prev = useCallback(() => {
        setIndex((prev) => {
            const index = Math.max(prev - 1, min);
            setGuestCurrentOrderIndex(index);
            return index;
        });
    }, [min]);

    return { index, setIndex, next, prev, setMax };
};

export default useBoundedIndex;
