export const Button = ({
    name = '',
    onDblClick = () => { },
    showIcon = false,
    onToggleIconClick = () => { },
    showOpenIcon = false
}) => {
    return (
        <button data-file-name={name} onDoubleClick={onDblClick} title={name}>
            <span data-file-name={name} className="name" role="button" aria-label={name} onDoubleClick={onDblClick}>{name}</span>
            {
                showIcon && <span className='toggle-icon' data-testid="toggle-icon" role='button' aria-label='toggle-button' onClick={onToggleIconClick}>{showOpenIcon ? '[-]' : '[+]'}</span>
            }
        </button>
    )
}

export default Button;