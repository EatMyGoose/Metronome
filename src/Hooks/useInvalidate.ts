import React from "react"

export function useInvalidate()
{
    const [idx, setIdx] = React.useState<number>(0);

    return {
        id: idx,
        invalidate: () => setIdx(i => i + 1)
    };
}