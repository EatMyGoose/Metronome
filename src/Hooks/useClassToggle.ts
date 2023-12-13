import React from "react"

export function useClassToggle(
    element: HTMLElement,
    enabled: boolean,
    enabledClass: string)
{
    React.useLayoutEffect(
        () => {
            if(enabled)
            {
                element.classList.add(enabledClass);
            }
            else
            {
                element.classList.remove(enabledClass);
            }
        }
        , [element, enabled]
    );
}