export const Button = ({
    name = '',
    onDoubleClick = () => { },
    showIcon = false,
    onToggleIconClick = () => { },
    showOpenIcon = false
}) => {
    return (
        <button data-file-name={name} onDoubleClick={onDoubleClick}>
            {name}
            {
                showIcon && <span data-testid="toggle-icon" role='button' aria-label='toggle-button' onClick={onToggleIconClick}>{showOpenIcon ? '[-]' : '[+]'}</span>
            }
        </button>
    )
}

export default Button;