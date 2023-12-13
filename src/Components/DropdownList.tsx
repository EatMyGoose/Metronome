type TValue = string;
type TDisplayedTitle = string;

export interface IDropDownList
{
    currentValue: TValue;
    onValueChanged: (newValue: TValue) => void
    options: [TValue, TDisplayedTitle][]
    className?: string
}

export function DropdownList(props: IDropDownList)
{
    function HandleOptionChanged(e: React.ChangeEvent<HTMLSelectElement>)
    {
        props.onValueChanged(e.target.value);
    }

    return (
        <div className={`form-group ${props.className || ""}`}>
            <select 
                className="form-select" 
                value={props.currentValue}
                onChange={HandleOptionChanged} 
            >
                {props.options.map(
                    (([value, title], idx) => <option key={idx} value={value}>{title}</option>)
                )}
            </select>
        </div>
    )
}