import './styles.css'

export const TextInput = ({ searchValue, handleChange}) => {
    return (
        <input
            onChange={handleChange}
            value={searchValue}
            placeholder="Seach what you want"
            type="search"
        />
    );
}